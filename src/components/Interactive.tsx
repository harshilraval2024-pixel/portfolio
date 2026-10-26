import { useEffect, useRef, type ReactNode } from 'react'
import { pointer, startPointer } from '../lib/pointer'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Flashlight reading lens: text dims while hovered and a lit copy is revealed under the eased cursor. */
export function FlashText({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const raf = useRef(0)

  const stop = () => cancelAnimationFrame(raf.current)
  const start = () => {
    startPointer()
    stop()
    const el = ref.current
    if (!el || reducedMotion()) return
    const loop = () => {
      raf.current = requestAnimationFrame(loop)
      const r = el.getBoundingClientRect()
      el.style.setProperty('--fx', `${pointer.sx - r.left}px`)
      el.style.setProperty('--fy', `${pointer.sy - r.top}px`)
    }
    loop()
  }
  useEffect(() => stop, [])

  return (
    <span ref={ref} data-read className={`flash ${className}`} onPointerEnter={start} onPointerLeave={stop}>
      <span className="flash-base">{children}</span>
      <span aria-hidden className="flash-lit">
        {children}
      </span>
    </span>
  )
}

/** Pulls its child toward the cursor when it gets close, springs back when it leaves. */
export function Magnetic({ children, strength = 0.35, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    startPointer()
    let raf = 0
    let x = 0
    let y = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2 - x
      const cy = r.top + r.height / 2 - y
      const dx = pointer.sx - cx
      const dy = pointer.sy - cy
      const reach = Math.max(r.width, r.height) * 0.9
      const near = pointer.active && Math.hypot(dx, dy) < reach
      x += ((near ? dx * strength : 0) - x) * 0.18
      y += ((near ? dy * strength : 0) - y) * 0.18
      el.style.transform = Math.abs(x) + Math.abs(y) < 0.05 ? '' : `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [strength])

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  )
}

/** Depth layer: shifts against the eased cursor so layers read as sitting at different distances. */
export function Parallax({ depth, children, className = '' }: { depth: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    startPointer()
    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      el.style.transform = `translate3d(${(pointer.nx * depth).toFixed(2)}px,${(pointer.ny * depth * 0.7).toFixed(2)}px,0)`
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [depth])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** Ring that trails the real cursor with inertia and changes size over text and links. */
export function CursorRing() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    startPointer()
    let raf = 0
    let size = 30
    let lastTarget: Element | null = null
    let ticks = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!pointer.active) {
        el.style.opacity = '0'
        return
      }
      if (ticks++ % 3 === 0) lastTarget = document.elementFromPoint(pointer.x, pointer.y)
      const onLink = !!lastTarget?.closest?.('a,button,[role=tab],input')
      const onText = !onLink && !!lastTarget?.closest?.('[data-read]')
      const target = onLink ? 56 : onText ? 84 : 30
      size += (target - size) * 0.15
      const stretch = Math.min(Math.hypot(pointer.vx, pointer.vy) * 0.03, 0.35)
      const angle = Math.atan2(pointer.vy, pointer.vx)
      el.style.opacity = '1'
      el.style.width = el.style.height = `${size.toFixed(1)}px`
      el.style.transform = `translate3d(${(pointer.sx - size / 2).toFixed(1)}px,${(pointer.sy - size / 2).toFixed(1)}px,0) rotate(${angle}rad) scale(${(1 + stretch).toFixed(3)},${(1 - stretch * 0.6).toFixed(3)})`
      el.dataset.mode = onLink ? 'link' : onText ? 'text' : 'idle'
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <div ref={ref} aria-hidden className="cursor-ring pointer-events-none fixed left-0 top-0 z-[60] rounded-full opacity-0" />
}
