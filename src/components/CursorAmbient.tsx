import { useEffect, useRef } from 'react'

const LERP_POS = 0.085
const LERP_TILT = 0.06

const MAX_PARALLAX = 18
const MAX_TILT = 6

export function CursorAmbient() {
  const gridRef = useRef<HTMLDivElement>(null)
  const sheenRef = useRef<HTMLDivElement>(null)
  const targetPx = useRef({ x: 0, y: 0 })
  const smoothPx = useRef({ x: 0, y: 0 })
  const targetTilt = useRef({ x: 0, y: 0 })
  const smoothTilt = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const grid = gridRef.current
    const sheen = sheenRef.current
    if (!grid || !sheen) return

    const init = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const cx = w / 2
      const cy = h / 2
      targetPx.current = { x: cx, y: cy }
      smoothPx.current = { x: cx, y: cy }
      targetTilt.current = { x: 0, y: 0 }
      smoothTilt.current = { x: 0, y: 0 }
      sheen.style.setProperty('--cx', `${cx}px`)
      sheen.style.setProperty('--cy', `${cy}px`)
      sheen.style.setProperty('--tilt-x', '0')
      sheen.style.setProperty('--tilt-y', '0')
      grid.style.transform = 'translate3d(0px, 0px, 0) scale(1.08)'
    }

    init()

    if (reduced) {
      return
    }

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      targetPx.current.x = e.clientX
      targetPx.current.y = e.clientY
      const nx = (e.clientX / w - 0.5) * 2
      const ny = (e.clientY / h - 0.5) * 2
      targetTilt.current.x = nx * MAX_TILT
      targetTilt.current.y = ny * MAX_TILT
    }

    const onLeave = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      targetPx.current.x = w / 2
      targetPx.current.y = h / 2
      targetTilt.current.x = 0
      targetTilt.current.y = 0
    }

    const tick = () => {
      const tp = targetPx.current
      const sp = smoothPx.current
      sp.x += (tp.x - sp.x) * LERP_POS
      sp.y += (tp.y - sp.y) * LERP_POS

      const tt = targetTilt.current
      const st = smoothTilt.current
      st.x += (tt.x - st.x) * LERP_TILT
      st.y += (tt.y - st.y) * LERP_TILT

      const w = window.innerWidth
      const h = window.innerHeight
      const nx = sp.x / w - 0.5
      const ny = sp.y / h - 0.5
      const gx = -nx * MAX_PARALLAX * 2
      const gy = -ny * MAX_PARALLAX * 2

      grid.style.transform = `translate3d(${gx}px, ${gy}px, 0) scale(1.08)`
      sheen.style.setProperty('--cx', `${sp.x}px`)
      sheen.style.setProperty('--cy', `${sp.y}px`)
      sheen.style.setProperty('--tilt-x', String(st.x))
      sheen.style.setProperty('--tilt-y', String(st.y))

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    window.addEventListener('resize', init, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('resize', init)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div
          ref={gridRef}
          className="absolute inset-[-40px] bg-grid-pattern opacity-100 will-change-transform dark:opacity-80"
        />
      </div>
      <div
        ref={sheenRef}
        className="pointer-events-none fixed inset-0 z-[1] cursor-sheen"
        aria-hidden
      />
    </>
  )
}
