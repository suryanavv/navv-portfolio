// Tiny 1-bit bitmaps for the LED board. One cell = one LED.

export type Bitmap = { w: number; h: number; data: Uint8Array }

export function blank(w: number, h: number): Bitmap {
  return { w, h, data: new Uint8Array(Math.max(0, w * h)) }
}

export function fromRows(rows: readonly string[]): Bitmap {
  const h = rows.length
  const w = rows.reduce((max, row) => Math.max(max, row.length), 0)
  const bmp = blank(w, h)
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) if (row[x] === "#") bmp.data[y * w + x] = 1
  })
  return bmp
}

/** Copies the lit cells of `src` onto `dst` with its top-left at (x, y). Clips at the edges. */
export function blit(dst: Bitmap, src: Bitmap, x: number, y: number) {
  for (let sy = 0; sy < src.h; sy++) {
    const dy = y + sy
    if (dy < 0 || dy >= dst.h) continue
    for (let sx = 0; sx < src.w; sx++) {
      const dx = x + sx
      if (dx < 0 || dx >= dst.w) continue
      if (src.data[sy * src.w + sx]) dst.data[dy * dst.w + dx] = 1
    }
  }
}

/** Side-by-side join with `gap` empty columns between parts; parts are bottom-aligned. */
export function hjoin(parts: Bitmap[], gap: number): Bitmap {
  const h = parts.reduce((max, p) => Math.max(max, p.h), 0)
  const w = parts.reduce((sum, p) => sum + p.w, 0) + gap * Math.max(0, parts.length - 1)
  const out = blank(w, h)
  let x = 0
  for (const part of parts) {
    blit(out, part, x, h - part.h)
    x += part.w + gap
  }
  return out
}

// The "on" lamp: a round LED cluster, the same height as capitals.
export const LAMP = fromRows([
  "..###..",
  ".#####.",
  "#######",
  "#######",
  "#######",
  ".#####.",
  "..###..",
])

// Doto is drawn on a strict grid: at font-size F the dot pitch is F/10,
// every character advances 6 dots, and capitals are 7 dots tall on the baseline.
const DOTO_PITCH = 10
const DOTO_SIZE = DOTO_PITCH * 10
const CAP_ROWS = 7
const ADVANCE = 6

let scratch: CanvasRenderingContext2D | null = null
const cache = new Map<string, Bitmap>()

/** Rasterises upper-case text in Doto 900 to a 7-row bitmap by sampling each dot's centre. */
export function dotoText(text: string): Bitmap {
  const key = text.toUpperCase()
  const cached = cache.get(key)
  if (cached) return cached

  const cols = Math.max(0, key.length * ADVANCE - 1)
  const out = blank(cols, CAP_ROWS)
  if (!cols) return out

  if (!scratch) {
    const canvas = document.createElement("canvas")
    scratch = canvas.getContext("2d", { willReadFrequently: true })
  }
  const ctx = scratch!
  const width = key.length * ADVANCE * DOTO_PITCH + DOTO_PITCH
  const height = CAP_ROWS * DOTO_PITCH + DOTO_PITCH * 2
  ctx.canvas.width = width
  ctx.canvas.height = height
  ctx.clearRect(0, 0, width, height)
  ctx.font = `900 ${DOTO_SIZE}px Doto`
  ctx.fillStyle = "#000"
  ctx.textBaseline = "alphabetic"
  const baseline = CAP_ROWS * DOTO_PITCH + DOTO_PITCH
  ctx.fillText(key, 0, baseline)

  const pixels = ctx.getImageData(0, 0, width, height).data
  const top = baseline - CAP_ROWS * DOTO_PITCH
  for (let y = 0; y < CAP_ROWS; y++) {
    const py = top + y * DOTO_PITCH + DOTO_PITCH / 2
    for (let x = 0; x < cols; x++) {
      const px = x * DOTO_PITCH + DOTO_PITCH / 2
      if (pixels[(py * width + px) * 4 + 3] > 128) out.data[y * cols + x] = 1
    }
  }
  cache.set(key, out)
  return out
}

export const DOTO_CAP_ROWS = CAP_ROWS

/** Width in LEDs of `text` set in Doto. Doto is a fixed grid, so this needs no font and no canvas. */
export function dotoWidth(text: string): number {
  return Math.max(0, text.length * ADVANCE - 1)
}
