import { useEffect, useRef } from 'react'
import { pointer, startPointer } from '../lib/pointer'

const REACH = 140
const TILT = 34

/**
 * Per-letter 3D text. Letters near the eased cursor lift toward the viewer (translateZ),
 * turn to face the cursor (rotateX / rotateY) and cast a depth shadow, then settle back
 * with the same easing. `gradient` keeps one continuous gradient across the letters.
 */
export function TiltText({ text, gradient = false, className = '' }: { text: string; gradient?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    startPointer()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const letters = Array.from(root.querySelectorAll<HTMLElement>('[data-l]'))
    const state = letters.map(() => ({ p: 0, rx: 0, ry: 0 }))
    const shadow = document.documentElement.classList.contains('dark') ? '196,181,253' : '124,58,237'
    let raf = 0
    let visible = true

    const paintGradient = () => {
      if (!gradient) return
      const rr = root.getBoundingClientRect()
      letters.forEach((el) => {
        el.style.transform = 'none'
        const left = el.getBoundingClientRect().left - rr.left
        el.style.backgroundSize = `${rr.width}px 100%`
        el.style.backgroundPosition = `${-left}px 0`
      })
    }
    paintGradient()
    const ro = new ResizeObserver(paintGradient)
    ro.observe(root)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(root)

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible || reduce) return
      letters.forEach((el, i) => {
        const s = state[i]
        let target = 0
        let rxT = 0
        let ryT = 0
        if (pointer.active) {
          const r = el.getBoundingClientRect()
          const dx = pointer.sx - (r.left + r.width / 2)
          const dy = pointer.sy - (r.top + r.height / 2)
          const t = Math.max(0, 1 - Math.hypot(dx, dy * 1.15) / REACH)
          target = t * t * (3 - 2 * t)
          rxT = -Math.max(-1, Math.min(1, dy / REACH)) * TILT * target
          ryT = Math.max(-1, Math.min(1, dx / REACH)) * TILT * target
        }
        s.p += (target - s.p) * 0.14
        s.rx += (rxT - s.rx) * 0.14
        s.ry += (ryT - s.ry) * 0.14
        if (s.p < 0.002 && target === 0) {
          if (el.style.transform) {
            el.style.transform = ''
            el.style.filter = ''
          }
          return
        }
        el.style.transform = `perspective(520px) translate3d(0,${(-s.p * 5).toFixed(2)}px,${(s.p * 52).toFixed(1)}px) rotateX(${s.rx.toFixed(1)}deg) rotateY(${s.ry.toFixed(1)}deg)`
        el.style.filter = `drop-shadow(0 ${(s.p * 12).toFixed(1)}px ${(s.p * 14).toFixed(1)}px rgba(${shadow},${(s.p * 0.4).toFixed(2)}))`
      })
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [gradient, text])

  const words = text.split(' ')
  return (
    <span ref={ref} data-read aria-label={text} className={className}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, ci) => (
            <span key={ci} data-l className={gradient ? 'letter-gradient inline-block' : 'inline-block'}>
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
