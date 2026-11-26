import { useLayoutEffect, useRef, useState } from "react"
import { GREETINGS, GREETING_ROWS } from "./glyphs"
import { blank, blit, dotoText, dotoWidth, fromRows, hjoin, LAMP, DOTO_CAP_ROWS, type Bitmap } from "./bitmap"
import { LedModule } from "./LedModule"
import "./board.css"

type BoardProps = {
  name: string
  role: string
  /** "Andhra Pradesh, India": the board shows the part before the first comma. */
  place: string
  available: boolean
  className?: string
}

const PAD = 1 // empty LED rows above and below content in every module
const EDGE_PX = 14 // left/right inset, kept equal across modules with different pitches
const CYCLE_MS = 4000
const WIPE_MS = 300
const BOOT_MS = 900
const BOOT_BAND = 8 // columns of "warming up" noise at the boot frontier
const BOOT_KEY = "board-booted"
const STATUS_GAP = 3 // empty LEDs between the lamp and "Available"
const NAME_MAX_PITCH = 10 // px per LED for the name on wide screens
const NAME_MIN_ONE_LINE_PITCH = 6 // below this, the name breaks onto two lines
const NAME_MAX_PITCH_STACKED = 7
const NAME_LINE_GAP = 2 // empty LED rows between stacked name lines
const GREETING_BITMAPS = GREETINGS.map((g) => fromRows(g.rows))
const GREETING_MAX_W = Math.max(...GREETING_BITMAPS.map((b) => b.w))
const TELUGU = Math.max(0, GREETINGS.findIndex((g) => g.lang === "te"))
// English → Hindi → Telugu, three times round, ending on Telugu.
const AUTO_STEPS = GREETINGS.length * 3 - 1
// Baseline of the Latin greeting inside its 16-row bitmap (bottom lit row), used to sit the clock on it.
const GREETING_BASELINE_ROW = 13

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
})

function istTime(withSeconds: boolean) {
  const t = timeFormat.format(new Date())
  return withSeconds ? t : t.slice(0, 5)
}

// Cheap deterministic noise for the boot shimmer.
function noise(x: number, y: number, frame: number) {
  let h = (x * 374761393 + y * 668265263 + frame * 2246822519) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

type CLayout = "one-row" | "no-place" | "two-rows"

export default function Board({ name, role, place, available, className = "" }: BoardProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const aRef = useRef<HTMLDivElement>(null)
  const bRef = useRef<HTMLDivElement>(null)
  const cRef = useRef<HTMLDivElement>(null)
  const greetButtonRef = useRef<HTMLButtonElement>(null)
  const advanceRef = useRef<() => void>(() => {})
  const [caption, setCaption] = useState<string | null>(null)

  const placeShort = place.split(",")[0].trim()

  // Layout effect: the panels get their final size before the first paint, so the board
  // never pushes the page down (no layout shift), even though lighting waits for the font.
  useLayoutEffect(() => {
    const frame = frameRef.current!
    const stack = stackRef.current!
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const modA = new LedModule(aRef.current!)
    const modB = new LedModule(bRef.current!)
    const modC = new LedModule(cRef.current!)

    let ready = false
    let destroyed = false
    let greeting = reduceMotion ? TELUGU : 0
    let previous = greeting
    let steps = 0
    let autoCycle = !reduceMotion
    let paused = false
    let wipeStart = -1
    let bootStart = -1
    let raf = 0
    let cycleTimer = 0
    let clockTimer = 0
    let captionTimer = 0
    let showSeconds = true
    let cLayout: CLayout = "one-row"
    let padA = 4
    let padB = 2
    let padC = 4
    let nameLines: string[] = [name]

    // ---------- composition ----------
    const composeA = (index: number | null): Bitmap => {
      const bmp = blank(modA.cols, modA.rows)
      if (index !== null) blit(bmp, GREETING_BITMAPS[index], padA, PAD)
      const clock = dotoText(istTime(showSeconds))
      blit(bmp, clock, modA.cols - padA - clock.w, PAD + GREETING_BASELINE_ROW - (DOTO_CAP_ROWS - 1))
      return bmp
    }

    const composeB = (): Bitmap => {
      const bmp = blank(modB.cols, modB.rows)
      nameLines.forEach((line, i) => blit(bmp, dotoText(line), padB, PAD + i * (DOTO_CAP_ROWS + NAME_LINE_GAP)))
      return bmp
    }

    const statusBitmap = () => hjoin([LAMP, dotoText("Available")], STATUS_GAP)

    const composeC = (): Bitmap => {
      const bmp = blank(modC.cols, modC.rows)
      const roleBmp = dotoText(role)
      const status = available ? statusBitmap() : null
      blit(bmp, roleBmp, padC, PAD)
      if (cLayout === "two-rows") {
        if (status) blit(bmp, status, padC, PAD + DOTO_CAP_ROWS + 3)
        return bmp
      }
      if (status) blit(bmp, status, modC.cols - padC - status.w, PAD)
      if (cLayout === "one-row") {
        const placeBmp = dotoText(placeShort)
        const left = padC + roleBmp.w
        const right = modC.cols - padC - (status ? status.w : 0)
        blit(bmp, placeBmp, Math.round(left + (right - left - placeBmp.w) / 2), PAD)
      }
      return bmp
    }

    // ---------- layout ----------
    const layout = () => {
      const avail = stack.clientWidth
      if (!avail) return
      // Widths only: Doto is a fixed grid, so sizing never waits for the font.
      const nameW = dotoWidth(name)
      const roleW = dotoWidth(role)
      const statusW = available ? LAMP.w + STATUS_GAP + dotoWidth("Available") : 0

      // Name module: the biggest LEDs on the board. If one line would make the name
      // too small (phones), break it onto one line per word so it stays dominant.
      const fit = (cols: number, max: number) => Math.max(2.5, Math.min(max, Math.floor((avail / (cols + 4)) * 2) / 2))
      let pitchB = fit(nameW, NAME_MAX_PITCH)
      nameLines = [name]
      const words = name.split(/\s+/).filter(Boolean)
      if (pitchB < NAME_MIN_ONE_LINE_PITCH && words.length > 1) {
        nameLines = words
        pitchB = fit(Math.max(...words.map((w) => dotoWidth(w))), NAME_MAX_PITCH_STACKED)
      }
      padB = Math.max(1, Math.round(EDGE_PX / pitchB))
      const nameRows = nameLines.length * DOTO_CAP_ROWS + (nameLines.length - 1) * NAME_LINE_GAP + PAD * 2
      modB.configure(pitchB, Math.floor(avail / pitchB), nameRows)

      // Small modules share one pitch, up to 3px per LED.
      const pitchS = Math.max(1.5, Math.min(3, Math.floor((avail / (roleW + 10)) * 4) / 4))
      const colsS = Math.floor(avail / pitchS)
      padA = padC = Math.max(2, Math.round(EDGE_PX / pitchS))

      const secondsW = dotoWidth("00:00:00")
      showSeconds = padA * 2 + GREETING_MAX_W + 8 + secondsW <= colsS
      modA.configure(pitchS, colsS, GREETING_ROWS + PAD * 2)

      const gap = 8
      const placeW = dotoWidth(placeShort)
      if (padC * 2 + roleW + placeW + statusW + gap * 2 <= colsS) cLayout = "one-row"
      else if (padC * 2 + roleW + statusW + gap <= colsS) cLayout = "no-place"
      else cLayout = "two-rows"
      const rowsC = cLayout === "two-rows" && available ? DOTO_CAP_ROWS * 2 + 3 + PAD * 2 : DOTO_CAP_ROWS + PAD * 2
      modC.configure(pitchS, colsS, rowsC)

      // The greeting button covers the greeting area of module A.
      const button = greetButtonRef.current
      if (button) {
        button.style.left = `${modA.root.offsetLeft}px`
        button.style.top = `${modA.root.offsetTop}px`
        button.style.width = `${(padA * 2 + GREETING_MAX_W) * pitchS}px`
        button.style.height = `${modA.rows * pitchS}px`
      }
    }

    // ---------- drawing ----------
    const drawStatic = () => {
      modA.draw(composeA(greeting))
      modB.draw(composeB())
      modC.draw(composeC())
    }

    const tick = (now: number) => {
      raf = 0
      if (destroyed) return
      let again = false

      if (bootStart >= 0) {
        const t = Math.min(1, (now - bootStart) / BOOT_MS)
        const shimmer = Math.floor(now / 45)
        for (const [mod, bmp] of [
          [modA, composeA(greeting)],
          [modB, composeB()],
          [modC, composeC()],
        ] as const) {
          const front = t * (mod.cols + BOOT_BAND)
          mod.draw(null, (x, y) => {
            if (x < front - BOOT_BAND) return bmp.data[y * bmp.w + x] === 1
            if (x < front) return y >= PAD && y < mod.rows - PAD && noise(x, y, shimmer) < 0.28
            return false
          })
        }
        if (t < 1) again = true
        else {
          bootStart = -1
          drawStatic()
        }
      } else if (wipeStart >= 0) {
        const t = Math.min(1, (now - wipeStart) / WIPE_MS)
        const region = padA + GREETING_MAX_W + 1
        const from = composeA(previous)
        const to = composeA(greeting)
        const clockOnly = composeA(null)
        const phaseIn = t >= 0.5
        // Columns switch off left to right, then the new text switches on left to right.
        const k = Math.floor((phaseIn ? (t - 0.5) * 2 : t * 2) * region)
        modA.draw(null, (x, y) => {
          const i = y * to.w + x
          if (x >= region) return clockOnly.data[i] === 1
          if (!phaseIn) return x < k ? false : from.data[i] === 1
          return x < k ? to.data[i] === 1 : false
        })
        if (t < 1) again = true
        else {
          wipeStart = -1
          modA.draw(composeA(greeting))
        }
      }

      if (again) raf = requestAnimationFrame(tick)
    }

    const animate = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    // ---------- greeting cycle ----------
    const schedule = () => {
      window.clearTimeout(cycleTimer)
      if (!autoCycle || paused || document.hidden) return
      cycleTimer = window.setTimeout(() => {
        steps++
        if (steps >= AUTO_STEPS) autoCycle = false
        advance(false)
      }, CYCLE_MS)
    }

    const advance = (manual: boolean) => {
      if (!ready) return
      previous = greeting
      greeting = (greeting + 1) % GREETINGS.length
      if (manual) {
        autoCycle = false
        window.clearTimeout(cycleTimer)
        setCaption(GREETINGS[greeting].label)
        window.clearTimeout(captionTimer)
        captionTimer = window.setTimeout(() => setCaption(null), 2000)
      }
      if (reduceMotion || bootStart >= 0) {
        modA.draw(composeA(greeting))
      } else {
        wipeStart = performance.now()
        animate()
      }
      schedule()
    }
    advanceRef.current = () => advance(true)

    // ---------- events ----------
    const onEnter = () => {
      paused = true
      window.clearTimeout(cycleTimer)
    }
    const onLeave = () => {
      paused = false
      schedule()
    }
    const onVisibility = () => (document.hidden ? window.clearTimeout(cycleTimer) : schedule())

    const glintTargets = [modA, modB, modC]
    const onPointerMove = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType !== "mouse") return
      frame.classList.add("is-glinting")
      for (const mod of glintTargets) {
        const rect = mod.root.getBoundingClientRect()
        mod.root.style.setProperty("--gx", `${event.clientX - rect.left}px`)
        mod.root.style.setProperty("--gy", `${event.clientY - rect.top}px`)
      }
    }
    const onPointerLeave = () => frame.classList.remove("is-glinting")

    frame.addEventListener("pointerenter", onEnter)
    frame.addEventListener("pointerleave", onLeave)
    frame.addEventListener("focusin", onEnter)
    frame.addEventListener("focusout", onLeave)
    frame.addEventListener("pointermove", onPointerMove)
    frame.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", onVisibility)

    const resizeObserver = new ResizeObserver(() => {
      layout()
      if (ready && bootStart < 0 && wipeStart < 0) drawStatic()
    })
    resizeObserver.observe(stack)
    layout() // size the panels now; they light up once Doto has loaded

    // ---------- start ----------
    document.fonts.load("900 100px Doto").finally(() => {
      if (destroyed) return
      ready = true
      let booted = false
      try {
        booted = sessionStorage.getItem(BOOT_KEY) === "1"
        sessionStorage.setItem(BOOT_KEY, "1")
      } catch {
        // Storage unavailable: boot every time, which is harmless.
      }
      if (!reduceMotion && !booted) {
        bootStart = performance.now()
        animate()
      } else {
        drawStatic()
      }
      clockTimer = window.setInterval(() => {
        if (bootStart < 0 && wipeStart < 0) modA.draw(composeA(greeting))
      }, 1000)
      schedule()
    })

    return () => {
      destroyed = true
      cancelAnimationFrame(raf)
      window.clearTimeout(cycleTimer)
      window.clearTimeout(captionTimer)
      window.clearInterval(clockTimer)
      resizeObserver.disconnect()
      frame.removeEventListener("pointerenter", onEnter)
      frame.removeEventListener("pointerleave", onLeave)
      frame.removeEventListener("focusin", onEnter)
      frame.removeEventListener("focusout", onLeave)
      frame.removeEventListener("pointermove", onPointerMove)
      frame.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      for (const mod of [modA, modB, modC]) mod.root.replaceChildren()
    }
  }, [name, role, placeShort, available])

  return (
    <div className={className}>
      <div ref={frameRef} className="board-frame relative rounded-md p-3 sm:p-4">
        {/* Real text for screen readers and search; the canvases are decoration. */}
        <div className="sr-only">
          <p lang="te">నమస్కారం</p>
          <h1>{name}</h1>
          <p>
            {role}, {place}.{available ? " Available for work." : ""}
          </p>
        </div>

        <div ref={stackRef} className="relative flex flex-col gap-2.5" aria-hidden="true">
          <div ref={aRef} className="led-module" />
          <div ref={bRef} className="led-module" />
          <div ref={cRef} className="led-module" />
        </div>

        <button
          ref={greetButtonRef}
          type="button"
          onClick={() => advanceRef.current()}
          className="board-greeting-button absolute cursor-pointer rounded-sm"
          aria-label="Show the greeting in the next language"
          style={{ left: 0, top: 0, width: 0, height: 0 }}
        />
      </div>

      <p className="board-caption mt-2 h-5 text-sm text-muted" aria-live="polite">
        {caption && (
          <>
            <span className="sr-only">Greeting shown in </span>
            {caption}
          </>
        )}
      </p>
    </div>
  )
}
