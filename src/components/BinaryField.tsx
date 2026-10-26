import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { pointer, startPointer } from '../lib/pointer'

const CELL = 24
const REACH = 190
const CLEAR = 200

const FONTS = Array.from({ length: 40 }, (_, s) => `${s}px ui-monospace, "JetBrains Mono", Consolas, monospace`)

/**
 * A field of 0s and 1s that behaves like a surface in 3D space:
 *  - every digit sits on one of three depth layers and shifts with the eased cursor (parallax)
 *  - the cursor pushes digits away like a bulge and its speed leaves a wake that springs back
 *  - digits under the cursor swell toward the viewer and take an iridescent colour
 *  - over hero text the field parts so the text stays readable
 */
export function BinaryField() {
  const ref = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return
    startPointer()

    const dark = theme === 'dark'
    const base = dark ? '56,189,248' : '99,102,241'
    const ambient = dark ? 0.5 : 0.32
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let bits = new Uint8Array(0)
    let depth = new Float32Array(0)
    let ox = new Float32Array(0)
    let oy = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let heat = new Float32Array(0)
    let raf = 0
    let visible = true
    let lastFlip = 0
    let read = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = host.clientWidth
      h = host.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / CELL) + 2
      rows = Math.ceil(h / CELL) + 2
      const n = cols * rows
      bits = Uint8Array.from({ length: n }, () => (Math.random() < 0.5 ? 0 : 1))
      depth = Float32Array.from({ length: n }, () => [0.25, 0.6, 1][(Math.random() * 3) | 0])
      ox = new Float32Array(n)
      oy = new Float32Array(n)
      vx = new Float32Array(n)
      vy = new Float32Array(n)
      heat = new Float32Array(n)
      if (reduce) draw(0)
    }

    const draw = (t: number) => {
      const rect = host.getBoundingClientRect()
      const px = pointer.sx - rect.left
      const py = pointer.sy - rect.top
      const live = pointer.active && !reduce
      const reading = live && !!(document.elementFromPoint(pointer.x, pointer.y) as Element | null)?.closest?.('[data-read]')
      read += ((reading ? 1 : 0) - read) * 0.16

      ctx.clearRect(0, 0, w, h)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const cx = w * 0.62
      const cy = h * 0.5
      const rx = w * 0.62
      const ry = h * 0.62
      const speed = Math.min(Math.hypot(pointer.vx, pointer.vy), 40)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const z = depth[i]
          // parallax: nearer layers travel further with the eased cursor
          const hx = c * CELL - CELL + (reduce ? 0 : pointer.nx * -14 * z)
          const hy = r * CELL - CELL + (reduce ? 0 : pointer.ny * -10 * z)

          const dx = hx + ox[i] - px
          const dy = hy + oy[i] - py
          const d = Math.sqrt(dx * dx + dy * dy)
          const near = live && d < REACH ? 1 - d / REACH : 0

          if (near > 0) {
            // radial bulge + drag along the cursor's motion
            const push = near * near * 5.5
            vx[i] += (dx / (d + 1)) * push + pointer.vx * near * 0.22
            vy[i] += (dy / (d + 1)) * push + pointer.vy * near * 0.22
            heat[i] = Math.max(heat[i], near)
            if (read < 0.5 && Math.random() < near * 0.12) bits[i] ^= 1
          }
          // spring back to the home position
          vx[i] += -ox[i] * 0.07
          vy[i] += -oy[i] * 0.07
          vx[i] *= 0.84
          vy[i] *= 0.84
          ox[i] += vx[i]
          oy[i] += vy[i]
          heat[i] *= 0.94

          const x = hx + ox[i] + CELL / 2
          const y = hy + oy[i] + CELL / 2
          const ex = (x - cx) / rx
          const ey = (y - cy) / ry
          let f = 1 - (ex * ex + ey * ey)
          f = f > 0 ? f : 0
          if (!reduce && f > 0) f = Math.min(1, f + 0.12 * f * Math.sin(t / 900 + c * 0.35 + r * 0.25))

          const g = heat[i]
          if (f < 0.04 && g < 0.03) continue

          // "pop toward the camera": size grows with proximity and with cursor speed
          const clear = d < CLEAR ? (1 - d / CLEAR) * read : 0
          const size = (5 + 10 * Math.pow(f, 1.3) + (12 + speed * 0.12) * g * g) * (1 - 0.5 * clear) * (0.85 + z * 0.15)
          const alpha = Math.min(1, 0.08 + f * ambient + g * 0.95) * (1 - 0.95 * clear)

          ctx.font = FONTS[Math.min(39, Math.round(size))]
          if (g > 0.18) {
            // iridescent wake: hue follows the angle around the cursor and slowly cycles
            const hue = (Math.atan2(dy, dx) * 57.3 + t * 0.05 + 200) % 360
            ctx.fillStyle = `hsla(${hue.toFixed(0)},${dark ? 85 : 80}%,${dark ? 72 : 55}%,${alpha.toFixed(3)})`
          } else {
            ctx.fillStyle = `rgba(${base},${alpha.toFixed(3)})`
          }
          ctx.fillText(bits[i] ? '1' : '0', x, y)
        }
      }
    }

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      if (t - lastFlip > 140) {
        lastFlip = t
        for (let k = 0; k < bits.length * 0.02; k++) bits[(Math.random() * bits.length) | 0] ^= 1
      }
      draw(t)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(host)
    if (!reduce) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [theme])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}
