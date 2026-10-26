/**
 * One shared, smoothed pointer for every cursor effect (the same idea 3D sites use:
 * raw mouse -> eased value -> everything reads the eased value, so motion has weight).
 *
 * sx, sy  eased position in px (viewport)
 * vx, vy  eased velocity in px/frame
 * nx, ny  eased position normalised to -1..1 across the window
 */
export const pointer = {
  x: -9999,
  y: -9999,
  sx: -9999,
  sy: -9999,
  vx: 0,
  vy: 0,
  nx: 0,
  ny: 0,
  active: false,
}

let started = false

export function startPointer() {
  if (started || typeof window === 'undefined') return
  started = true

  window.addEventListener(
    'pointermove',
    (e) => {
      if (!pointer.active) {
        pointer.sx = e.clientX
        pointer.sy = e.clientY
      }
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    },
    { passive: true },
  )
  document.addEventListener('pointerleave', () => {
    pointer.active = false
  })

  const tick = () => {
    requestAnimationFrame(tick)
    if (!pointer.active) {
      pointer.vx *= 0.9
      pointer.vy *= 0.9
      pointer.nx *= 0.95
      pointer.ny *= 0.95
      return
    }
    const px = pointer.sx
    const py = pointer.sy
    pointer.sx += (pointer.x - pointer.sx) * 0.2
    pointer.sy += (pointer.y - pointer.sy) * 0.2
    pointer.vx = pointer.vx * 0.8 + (pointer.sx - px) * 0.2
    pointer.vy = pointer.vy * 0.8 + (pointer.sy - py) * 0.2
    pointer.nx += ((pointer.x / window.innerWidth - 0.5) * 2 - pointer.nx) * 0.07
    pointer.ny += ((pointer.y / window.innerHeight - 0.5) * 2 - pointer.ny) * 0.07
  }
  tick()
}
