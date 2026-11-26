import type { Bitmap } from "./bitmap"

// One LED module: a fixed-pitch grid of dots drawn on three stacked canvases.
//   unlit: the dark dots, drawn once per resize
//   glint: slightly brighter unlit dots, revealed around the pointer with a CSS mask
//   lit:   the lit dots, redrawn on every content change, glow added with a CSS filter

export const LED_COLORS = {
  lit: "#5EEA8C",
  unlit: "#1C221D",
  glint: "#3E5546",
}

const DOT_RATIO = 0.42 // dot radius as a fraction of the pitch

export class LedModule {
  readonly root: HTMLElement
  private unlit: HTMLCanvasElement
  private glint: HTMLCanvasElement
  private lit: HTMLCanvasElement
  pitch = 4
  cols = 0
  rows = 0

  constructor(root: HTMLElement) {
    this.root = root
    root.style.position = "relative"
    const make = (className: string) => {
      const canvas = document.createElement("canvas")
      canvas.className = className
      canvas.setAttribute("aria-hidden", "true")
      root.appendChild(canvas)
      return canvas
    }
    this.unlit = make("led-layer")
    this.glint = make("led-layer led-glint")
    this.lit = make("led-layer led-lit")
  }

  /** Sets the grid size and redraws the static layers. */
  configure(pitch: number, cols: number, rows: number) {
    const changed = pitch !== this.pitch || cols !== this.cols || rows !== this.rows
    this.pitch = pitch
    this.cols = cols
    this.rows = rows
    if (!changed && this.unlit.width) return
    const width = cols * pitch
    const height = rows * pitch
    this.root.style.width = `${width}px`
    this.root.style.height = `${height}px`
    for (const canvas of [this.unlit, this.glint, this.lit]) this.size(canvas, width, height)
    this.fill(this.unlit, LED_COLORS.unlit)
    // The glint layer is only needed once a mouse moves over the board (see ensureGlint).
    this.glintReady = false
  }

  /** Paints the glint layer on first use, so phones and keyboard users never pay for it. */
  ensureGlint() {
    if (this.glintReady) return
    this.glintReady = true
    this.fill(this.glint, LED_COLORS.glint)
  }

  private glintReady = false

  /**
   * Draws lit dots. `cell` decides each dot; defaults to reading `bitmap`.
   * The glow is baked in with one canvas shadow pass (a CSS filter would re-run on every
   * repaint). Animation frames pass `glow = false`: cheaper, and LEDs warming up don't bloom yet.
   */
  draw(bitmap: Bitmap | null, cell?: (x: number, y: number) => boolean, glow = true) {
    this.paint(this.lit, bitmap, cell, glow)
  }

  private paint(canvas: HTMLCanvasElement, bitmap: Bitmap | null, cell: ((x: number, y: number) => boolean) | undefined, glow: boolean) {
    const ctx = canvas.getContext("2d")!
    const dpr = this.dpr()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = LED_COLORS.lit
    ctx.shadowColor = glow ? "rgb(94 234 140 / 0.55)" : "transparent"
    ctx.shadowBlur = glow ? Math.max(3, this.pitch * 0.9) * dpr : 0
    const p = this.pitch * dpr
    const r = p * DOT_RATIO
    ctx.beginPath()
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const on = cell ? cell(x, y) : !!bitmap && x < bitmap.w && y < bitmap.h && bitmap.data[y * bitmap.w + x] === 1
        if (!on) continue
        const cx = (x + 0.5) * p
        const cy = (y + 0.5) * p
        ctx.moveTo(cx + r, cy)
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
      }
    }
    ctx.fill()
  }

  /**
   * Boot frame without re-testing every LED: the finished, glowing content is painted once
   * into an off-screen canvas, then each frame copies the lit-up columns from it and adds a
   * few "warming up" dots in the band at the boot front.
   */
  reveal(final: Bitmap, front: number, band: number, warming: (x: number, y: number) => boolean) {
    const cache = (this.cache ??= document.createElement("canvas"))
    if (this.revealFor !== final || cache.width !== this.lit.width || cache.height !== this.lit.height) {
      this.revealFor = final
      cache.width = this.lit.width
      cache.height = this.lit.height
      this.paint(cache, final, undefined, true)
    }
    const ctx = this.lit.getContext("2d")!
    const dpr = this.dpr()
    const p = this.pitch * dpr
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.shadowBlur = 0
    ctx.shadowColor = "transparent"
    ctx.clearRect(0, 0, this.lit.width, this.lit.height)
    const doneCols = Math.max(0, Math.floor(front - band))
    const doneW = Math.min(this.lit.width, Math.round(doneCols * p))
    if (doneW > 0) ctx.drawImage(cache, 0, 0, doneW, this.lit.height, 0, 0, doneW, this.lit.height)
    // Warming band: only the handful of columns at the front.
    ctx.fillStyle = LED_COLORS.lit
    const r = p * DOT_RATIO
    ctx.beginPath()
    for (let x = doneCols; x < Math.min(this.cols, Math.ceil(front)); x++) {
      for (let y = 0; y < this.rows; y++) {
        if (!warming(x, y)) continue
        const cx = (x + 0.5) * p
        const cy = (y + 0.5) * p
        ctx.moveTo(cx + r, cy)
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
      }
    }
    ctx.fill()
  }

  private cache: HTMLCanvasElement | null = null
  private revealFor: Bitmap | null = null

  private dpr() {
    return Math.min(window.devicePixelRatio || 1, 3)
  }

  private size(canvas: HTMLCanvasElement, width: number, height: number) {
    const dpr = this.dpr()
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }

  /** Fills every LED position with `color`: one row of dots is drawn, then copied down. */
  private fill(canvas: HTMLCanvasElement, color: string) {
    const ctx = canvas.getContext("2d")!
    const p = this.pitch * this.dpr()
    const r = p * DOT_RATIO
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (!this.cols || !this.rows) return

    const row = document.createElement("canvas")
    row.width = canvas.width
    row.height = Math.ceil(p)
    const rctx = row.getContext("2d")!
    rctx.fillStyle = color
    rctx.beginPath()
    for (let x = 0; x < this.cols; x++) {
      const cx = (x + 0.5) * p
      rctx.moveTo(cx + r, p / 2)
      rctx.arc(cx, p / 2, r, 0, Math.PI * 2)
    }
    rctx.fill()
    for (let y = 0; y < this.rows; y++) ctx.drawImage(row, 0, Math.round(y * p))
  }
}
