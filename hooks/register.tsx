import type { Register } from 'claude-code'

// ---- scene constants -------------------------------------------------------

const KEY = 'xmas'
const ROWS = 9
const TICK_MS = 250
const DEFAULT = 0x01000000

const ORANGE = 0xd97757
const RED = 0xd63031
const WHITE = 0xf5f7fa
const GREEN = 0x2e8b57
const TRUNK = 0x8b5a2b
const GOLD = 0xffd54a
const SNOW = 0xe6eef7
const FLAKE_DIM = 0x9fb4c8
const ORNAMENTS = [0xff4d4d, 0xffd54a, 0x4da6ff, 0xff7ae6, 0xffffff, 0xff9f1a]

type Flake = { x: number; y: number; speed: number; drift: number; ch: number; color: number }

// ---- a tiny PRNG (no Math.random needed) ------------------------------------

let seed = 0x2512
const rand = (): number => {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 0x100000000
}

const FLAKE_CHARS = ['*', '·', '.', '+', '*'].map(c => c.codePointAt(0) ?? 42)

const newFlake = (cols: number, y: number): Flake => ({
  x: rand() * cols,
  y,
  speed: 0.15 + rand() * 0.3,
  drift: rand() * Math.PI * 2,
  ch: FLAKE_CHARS[Math.floor(rand() * FLAKE_CHARS.length)] ?? 42,
  color: rand() < 0.5 ? WHITE : FLAKE_DIM,
})

// ---- base64 of the cell buffer -----------------------------------------------

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

const toBase64 = (bytes: Uint8Array): string => {
  let out = ''
  let i = 0
  for (; i + 2 < bytes.length; i += 3) {
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8) | bytes[i + 2]!
    out += B64[(n >> 18) & 63]! + B64[(n >> 12) & 63]! + B64[(n >> 6) & 63]! + B64[n & 63]!
  }
  const rest = bytes.length - i
  if (rest === 1) {
    const n = bytes[i]! << 16
    out += B64[(n >> 18) & 63]! + B64[(n >> 12) & 63]! + '=='
  } else if (rest === 2) {
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8)
    out += B64[(n >> 18) & 63]! + B64[(n >> 12) & 63]! + B64[(n >> 6) & 63]! + '='
  }
  return out
}

// ---- the scene ---------------------------------------------------------------

class Scene {
  cols = 0
  frame = 0
  flakes: Flake[] = []
  private grid = new Uint32Array(0)

  resize(cols: number): void {
    if (cols === this.cols) return
    this.cols = cols
    this.grid = new Uint32Array(cols * ROWS * 3)
    const count = Math.max(6, Math.round((cols * (ROWS - 1)) / 14))
    this.flakes = Array.from({ length: count }, () => newFlake(cols, rand() * (ROWS - 1)))
  }

  step(): void {
    this.frame += 1
    for (const f of this.flakes) {
      f.y += f.speed
      f.drift += 0.25
      f.x += Math.sin(f.drift) * 0.3
      if (f.x < 0) f.x += this.cols
      if (f.x >= this.cols) f.x -= this.cols
      if (f.y >= ROWS - 1) Object.assign(f, newFlake(this.cols, 0))
    }
  }

  private put(x: number, y: number, ch: string | number, fg: number, bg = DEFAULT): void {
    if (x < 0 || y < 0 || x >= this.cols || y >= ROWS) return
    const i = (y * this.cols + x) * 3
    this.grid[i] = typeof ch === 'number' ? ch : (ch.codePointAt(0) ?? 32)
    this.grid[i + 1] = fg
    this.grid[i + 2] = bg
  }

  private text(x: number, y: number, s: string, fg: number | ((i: number) => number)): void {
    let i = 0
    for (const ch of s) {
      if (ch !== ' ') this.put(x + i, y, ch, typeof fg === 'number' ? fg : fg(i))
      i += 1
    }
  }

  private clawd(x: number): void {
    const f = this.frame
    const blink = f % 24 === 0 || f % 24 === 1
    const wave = Math.floor(f / 4) % 2 === 0

    // Santa hat: red cone, drooping tip, white pom-pom and fur brim.
    this.text(x + 3, 2, '▄▄▄▄', RED)
    this.text(x + 2, 3, '█████▀', RED)
    this.put(x + 8, 3, '●', WHITE)
    this.text(x + 1, 4, '███████', WHITE)

    // Clawd himself.
    this.text(x + 1, 5, blink ? '▐█████▌' : '▐▛███▜▌', ORANGE)
    this.text(x, 6, wave ? '▝▜█████▛▘' : '▗▜█████▛▖', ORANGE)
    this.text(x + 2, 7, '▘▘ ▝▝', ORANGE)
  }

  private tree(cx: number): void {
    const f = this.frame
    const star = Math.floor(f / 3) % 2 === 0
    this.put(cx, 1, star ? '★' : '✦', GOLD)

    const ornament = (k: number): number => ORNAMENTS[(k + Math.floor(f / 3)) % ORNAMENTS.length]!
    let k = 0
    for (let i = 1; i <= 5; i++) {
      const y = 1 + i
      this.put(cx - i, y, '▄', GREEN)
      this.put(cx + i, y, '▄', GREEN)
      for (let dx = -i + 1; dx <= i - 1; dx++) {
        const isBauble = (dx + i * 2 + 30) % 3 === 0
        if (isBauble) {
          this.put(cx + dx, y, '●', ornament(k++), GREEN)
        } else {
          this.put(cx + dx, y, '█', GREEN)
        }
      }
    }
    this.text(cx - 1, 7, '▐█▌', TRUNK)

    // Presents under the tree.
    this.text(cx - 5, 7, '▄▄', RED)
    this.text(cx + 4, 7, '▄▄', 0x4da6ff)
  }

  draw(): string {
    const { cols } = this
    for (let i = 0; i < this.grid.length; i += 3) {
      this.grid[i] = 32
      this.grid[i + 1] = DEFAULT
      this.grid[i + 2] = DEFAULT
    }

    for (const fl of this.flakes) this.put(Math.floor(fl.x), Math.floor(fl.y), fl.ch, fl.color)

    // Snowy ground.
    for (let x = 0; x < cols; x++) this.put(x, ROWS - 1, '▄', SNOW)

    const clawdX = 2
    this.clawd(clawdX)

    const treeCx = Math.max(clawdX + 18, cols - 9)
    this.tree(treeCx)

    // Greeting between the two, when there's room.
    const left = clawdX + 11
    const right = treeCx - 7
    const greeting = 'Merry Christmas!'
    const sub = '& a happy new year'
    if (right - left >= greeting.length) {
      const mid = Math.floor((left + right) / 2)
      const flip = Math.floor(this.frame / 4) % 2
      this.text(mid - Math.floor(greeting.length / 2), 3, greeting, i => ((i + flip) % 2 === 0 ? RED : GREEN))
      if (right - left >= sub.length) this.text(mid - Math.floor(sub.length / 2), 5, sub, GOLD)
    }

    return toBase64(new Uint8Array(this.grid.buffer))
  }
}

// ---- spinner / turn words ---------------------------------------------------

const SPINNER_WORDS = [
  'Jingling',
  'Decking the halls',
  'Wrapping presents',
  'Sleigh-riding',
  'Roasting chestnuts',
  'Trimming the tree',
  'Checking the list twice',
  'Baking cookies',
  'Hanging stockings',
  'Building a snowman',
]
const DONE_WORDS = ['Gift-wrapped', 'Sleigh-delivered', 'Jingled', 'Decorated', 'Snowed']

const pick = (list: readonly string[], key: string): string => {
  let h = 0
  for (const ch of key) h = (h * 31 + (ch.codePointAt(0) ?? 0)) >>> 0
  return list[h % list.length]!
}

// ---- hooks -------------------------------------------------------------------

export const register: Register = on => {
  const scene = new Scene()
  let site: string | null = null

  on('session.start', ($, e, next) => {
    $.clock.every(TICK_MS, () => {
      if (site === null || scene.cols === 0) return
      scene.step()
      const requestId = site
      void $.ui.blit({ requestId, key: KEY, cells: scene.draw() }).then(r => {
        if (r.deny !== undefined && site === requestId) site = null
      })
    })

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, ($, e, next) => {
    if (e.surface !== 'terminal' || e.props.hasSurvey || e.props.isCollapsed) {
      site = null
      return next(e)
    }

    const cols = Math.max(24, Math.min(512, e.props.bodyColumns))
    scene.resize(cols)
    site = e.requestId

    const { Raster } = $.ui.resolve(e)

    return <Raster key={KEY} columns={cols} rows={ROWS} cells={scene.draw()} />
  })

  on('ui.render', { component: 'Spinner' }, ($, e, next) =>
    next({ ...e, props: { ...e.props, word: pick(SPINNER_WORDS, e.props.word) } }),
  )

  on('ui.render', { component: 'TurnDuration' }, ($, e, next) =>
    next({ ...e, props: { ...e.props, word: pick(DONE_WORDS, e.props.word + e.props.durationMs) } }),
  )
}
