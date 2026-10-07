import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, GripVertical, RotateCcw } from 'lucide-react'
import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { SectionHeading } from './SectionHeading'

type ShiftType = 'day' | 'night' | 'sleepover'
type Shift = { id: string; staff: number; day: number; type: ShiftType }

const staff = ['Aisha', 'Ben', 'Chloe'] as const
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const

const meta: Record<ShiftType, { label: string; time: string; cls: string }> = {
  day: {
    label: 'Day',
    time: '07:00–19:00',
    cls: 'from-violet-500 to-indigo-500',
  },
  night: {
    label: 'Night',
    time: '19:00–07:00',
    cls: 'from-slate-600 to-slate-800',
  },
  sleepover: {
    label: 'Sleepover',
    time: '22:00–07:00',
    cls: 'from-emerald-500 to-teal-600',
  },
}

const initial: Shift[] = [
  { id: 's1', staff: 0, day: 0, type: 'day' },
  { id: 's2', staff: 0, day: 1, type: 'day' },
  { id: 's3', staff: 0, day: 2, type: 'night' },
  { id: 's4', staff: 1, day: 0, type: 'night' },
  { id: 's5', staff: 1, day: 1, type: 'sleepover' },
  { id: 's6', staff: 1, day: 3, type: 'day' },
  { id: 's7', staff: 1, day: 4, type: 'day' },
  { id: 's8', staff: 2, day: 1, type: 'day' },
  { id: 's9', staff: 2, day: 2, type: 'day' },
  { id: 's10', staff: 2, day: 4, type: 'night' },
]

/** A late shift followed by a day shift the next morning leaves under 11h rest. */
function restConflicts(shifts: Shift[]): Set<string> {
  const flagged = new Set<string>()
  for (const s of shifts) {
    if (s.type === 'day') continue
    const next = shifts.find(
      (o) => o.staff === s.staff && o.day === s.day + 1 && o.type === 'day',
    )
    if (next) {
      flagged.add(s.id)
      flagged.add(next.id)
    }
  }
  return flagged
}

function cellAt(x: number, y: number): { staff: number; day: number } | null {
  const el = document
    .elementsFromPoint(x, y)
    .find((e) => (e as HTMLElement).dataset?.cell)
  if (!el) return null
  const [s, d] = (el as HTMLElement).dataset.cell!.split('-').map(Number)
  return { staff: s, day: d }
}

export function ShiftPlayground() {
  const [shifts, setShifts] = useState<Shift[]>(initial)
  const [dragId, setDragId] = useState<string | null>(null)
  const [hover, setHover] = useState<{ staff: number; day: number; ok: boolean } | null>(null)
  const [toast, setToast] = useState<{ kind: 'warn' | 'error' | 'ok'; text: string } | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [moves, setMoves] = useState(0)

  const conflicts = useMemo(() => restConflicts(shifts), [shifts])
  const conflictCount = conflicts.size / 2

  const say = useCallback((kind: 'warn' | 'error' | 'ok', text: string) => {
    setToast({ kind, text })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const occupied = useCallback(
    (staffIdx: number, day: number, ignoreId: string) =>
      shifts.some((s) => s.staff === staffIdx && s.day === day && s.id !== ignoreId),
    [shifts],
  )

  const moveShift = useCallback(
    (id: string, staffIdx: number, day: number) => {
      const cur = shifts.find((s) => s.id === id)
      if (!cur || (cur.staff === staffIdx && cur.day === day)) return
      if (occupied(staffIdx, day, id)) {
        say('error', `${staff[staffIdx]} is already booked on ${days[day]}.`)
        return
      }
      const next = shifts.map((s) => (s.id === id ? { ...s, staff: staffIdx, day } : s))
      setShifts(next)
      setMoves((m) => m + 1)
      if (restConflicts(next).has(id)) {
        say('warn', `Rest gap under 11h for ${staff[staffIdx]} — flagged for review.`)
      } else {
        say('ok', `${meta[cur.type].label} shift moved to ${staff[staffIdx]}, ${days[day]}.`)
      }
    },
    [shifts, occupied, say],
  )

  const onDrag = (id: string, point: { x: number; y: number }) => {
    const c = cellAt(point.x - window.scrollX, point.y - window.scrollY)
    if (!c) return setHover(null)
    const ok = !occupied(c.staff, c.day, id)
    setHover((h) => (h && h.staff === c.staff && h.day === c.day && h.ok === ok ? h : { ...c, ok }))
  }

  const onDragEnd = (id: string, point: { x: number; y: number }) => {
    setDragId(null)
    setHover(null)
    const c = cellAt(point.x - window.scrollX, point.y - window.scrollY)
    if (c) moveShift(id, c.staff, c.day)
  }

  const onKey = (e: KeyboardEvent, s: Shift) => {
    const d = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[
      e.key as 'ArrowLeft'
    ]
    if (!d) return
    e.preventDefault()
    const ns = s.staff + d[0]
    const nd = s.day + d[1]
    if (ns < 0 || ns >= staff.length || nd < 0 || nd >= days.length) return
    moveShift(s.id, ns, nd)
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>(`[data-shift="${s.id}"]`)?.focus(),
    )
  }

  const reset = () => {
    setShifts(initial)
    setMoves(0)
    setToast(null)
  }

  return (
    <section
      id="demo"
      className="border-b border-zinc-200/60 py-20 dark:border-zinc-800/60 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          kicker="Interactive demo"
          title="Try the kind of UI I build"
          subtitle="A simplified take on the drag-and-drop shift scheduler I work on at 20x. Drag a shift to another slot, or focus one and use the arrow keys. Double-booking is blocked and short rest gaps get flagged."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-3xl border border-zinc-200/90 bg-white/80 p-4 shadow-xl shadow-zinc-900/5 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <div className="flex flex-wrap items-center gap-2 font-mono-strict text-[11px]">
              <span className="rounded-full bg-zinc-100 px-3 py-1 font-semibold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                Week view
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold uppercase tracking-wider transition-colors ${
                  conflictCount > 0
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                    : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                }`}
              >
                {conflictCount > 0 ? (
                  <AlertTriangle className="h-3 w-3" />
                ) : (
                  <CheckCircle2 className="h-3 w-3" />
                )}
                {conflictCount} {conflictCount === 1 ? 'conflict' : 'conflicts'}
              </span>
              <span className="text-zinc-500">{moves} moves</span>
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 font-mono-strict text-[11px] font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:border-violet-400/50 hover:text-violet-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-violet-300"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          <div className="overflow-x-auto pb-1">
            <div
              className="grid min-w-[560px] gap-1.5"
              style={{ gridTemplateColumns: `72px repeat(${days.length}, minmax(0, 1fr))` }}
            >
              <div />
              {days.map((d) => (
                <div
                  key={d}
                  className="py-1 text-center font-mono-strict text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
                >
                  {d}
                </div>
              ))}
              {staff.map((name, si) => (
                <FragmentRow key={name}>
                  <div className="flex items-center font-mono-strict text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {name}
                  </div>
                  {days.map((_, di) => {
                    const here = shifts.find((s) => s.staff === si && s.day === di)
                    const isHover = hover?.staff === si && hover?.day === di
                    return (
                      <div
                        key={di}
                        data-cell={`${si}-${di}`}
                        className={`relative h-[68px] rounded-xl border border-dashed transition-colors ${
                          isHover
                            ? hover.ok
                              ? 'border-emerald-500 bg-emerald-500/10'
                              : 'border-rose-500 bg-rose-500/10'
                            : 'border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-950/40'
                        }`}
                      >
                        {here && (
                          <ShiftCard
                            shift={here}
                            flagged={conflicts.has(here.id)}
                            dragging={dragId === here.id}
                            onDragStart={() => setDragId(here.id)}
                            onDrag={(p) => onDrag(here.id, p)}
                            onDragEnd={(p) => onDragEnd(here.id, p)}
                            onKeyDown={(e) => onKey(e, here)}
                          />
                        )}
                      </div>
                    )
                  })}
                </FragmentRow>
              ))}
            </div>
          </div>

          <div className="mt-4 flex min-h-[40px] flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3 font-mono-strict text-[10px] uppercase tracking-wider text-zinc-500">
              {(Object.keys(meta) as ShiftType[]).map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-sm bg-gradient-to-br ${meta[k].cls}`} />
                  {meta[k].label}
                </span>
              ))}
            </div>
            <div aria-live="polite" className="min-h-[28px]">
              <AnimatePresence mode="wait">
                {toast && (
                  <motion.p
                    key={toast.text}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      toast.kind === 'error'
                        ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                        : toast.kind === 'warn'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                          : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                    }`}
                  >
                    {toast.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FragmentRow({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

type CardProps = {
  shift: Shift
  flagged: boolean
  dragging: boolean
  onDragStart: () => void
  onDrag: (p: { x: number; y: number }) => void
  onDragEnd: (p: { x: number; y: number }) => void
  onKeyDown: (e: KeyboardEvent) => void
}

function ShiftCard({ shift, flagged, dragging, onDragStart, onDrag, onDragEnd, onKeyDown }: CardProps) {
  const m = meta[shift.type]
  return (
    <motion.div
      data-shift={shift.id}
      tabIndex={0}
      role="button"
      aria-label={`${m.label} shift ${m.time}${flagged ? ', rest gap conflict' : ''}. Arrow keys move it.`}
      drag
      dragSnapToOrigin
      dragMomentum={false}
      dragElastic={0.12}
      whileDrag={{ scale: 1.06, rotate: -2, boxShadow: '0 18px 40px rgba(0,0,0,0.28)' }}
      whileHover={{ scale: 1.03 }}
      onDragStart={onDragStart}
      onDrag={(_, info) => onDrag(info.point)}
      onDragEnd={(_, info) => onDragEnd(info.point)}
      onKeyDown={onKeyDown}
      className={`absolute inset-1 flex cursor-grab touch-none select-none flex-col justify-center rounded-lg bg-gradient-to-br px-2 text-white outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-violet-500 active:cursor-grabbing dark:ring-offset-zinc-900 ${m.cls} ${
        dragging ? 'z-50' : 'z-10'
      } ${flagged ? 'ring-2 ring-amber-400' : ''}`}
    >
      <span className="flex items-center gap-1 text-[11px] font-semibold leading-tight">
        <GripVertical className="h-3 w-3 shrink-0 opacity-70" />
        {m.label}
        {flagged && <AlertTriangle className="ml-auto h-3 w-3 text-amber-300" />}
      </span>
      <span className="pl-4 font-mono-strict text-[9px] opacity-80">{m.time}</span>
    </motion.div>
  )
}
