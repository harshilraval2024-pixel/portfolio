import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Check, Play, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState, type PointerEvent } from 'react'

type Tok = readonly [text: string, cls?: string]
type Line = readonly Tok[]

const kw = 'text-violet-600 dark:text-violet-400'
const id = 'text-emerald-600 dark:text-emerald-400'
const str = 'text-amber-700 dark:text-amber-400'
const key = 'text-zinc-500'
const pun = 'text-zinc-800 dark:text-zinc-200'

const files: {
  name: string
  code: Line[]
  run: string[]
  summary: string
}[] = [
  {
    name: 'profile.tsx',
    code: [
      [['const ', kw], ['developer', id], [' = {', pun]],
      [['  name', key], [': ', pun], ["'Harshil Raval'", str], [',', pun]],
      [['  role', key], [': ', pun], ["'Full-stack · frontend-first'", str], [',', pun]],
      [['  focus', key], [': ', pun], ["['scheduler', 'invoicing', 'realtime']", str], [',', pun]],
      [['  openToWork', key], [': ', pun], ['true', kw], [',', pun]],
      [['}', pun]],
    ],
    run: ['> developer.build()', '✓ scheduler  ✓ invoicing  ✓ realtime', 'ready · open to opportunities'],
    summary: 'profile',
  },
  {
    name: 'stack.ts',
    code: [
      [['export const ', kw], ['stack', id], [' = {', pun]],
      [['  frontend', key], [': ', pun], ["['React', 'TypeScript', 'MobX']", str], [',', pun]],
      [['  forms', key], [': ', pun], ["['Formik', 'Yup']", str], [',', pun]],
      [['  realtime', key], [': ', pun], ["['Ably', 'Socket.io']", str], [',', pun]],
      [['  backend', key], [': ', pun], ["['Node.js', 'Express', 'MySQL']", str], [',', pun]],
      [['}', pun]],
    ],
    run: ['> npm run build', '✓ 4 groups · 10 tools', 'build succeeded · 0 errors'],
    summary: 'stack',
  },
  {
    name: 'now.ts',
    code: [
      [['export const ', kw], ['now', id], [' = {', pun]],
      [['  at', key], [': ', pun], ["'20x · Benagon Technologies'", str], [',', pun]],
      [['  since', key], [': ', pun], ["'Nov 2023'", str], [',', pun]],
      [['  building', key], [': ', pun], ["['Scheduler', 'Timesheets',", str]],
      [['    ', pun], ["'Invoicing', 'Reports']", str], [',', pun]],
      [['}', pun]],
    ],
    run: ['> git log --author=harshil', '✓ 2,000+ commits', 'actively shipping'],
    summary: 'now',
  },
]

const cells = [
  { label: 'Stack', value: 'React · TS · MobX' },
  { label: 'Focus', value: 'Scheduling · Real-time' },
  { label: 'Experience', value: '4+ years shipping' },
] as const

export function ProfileCard() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState(0)
  const [minimized, setMinimized] = useState(false)
  const [output, setOutput] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const autoRan = useRef(false)

  // 3D tilt + glare following the pointer
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 160, damping: 18 })
  const sy = useSpring(my, { stiffness: 160, damping: 18 })
  const rotY = useTransform(sx, [0, 1], [-7, 7])
  const rotX = useTransform(sy, [0, 1], [6, -6])
  const glare = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(360px circle at ${x * 100}%  ${y * 100}%, rgba(255,255,255,0.16), transparent 60%)`,
  )

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clear, [])

  const run = (index = tab) => {
    clear()
    setMinimized(false)
    setOutput([])
    setRunning(true)
    const lines = files[index].run
    lines.forEach((l, i) => {
      timers.current.push(setTimeout(() => setOutput((o) => [...o, l]), 350 + i * 520))
    })
    timers.current.push(setTimeout(() => setRunning(false), 350 + lines.length * 520))
  }

  const select = (i: number) => {
    clear()
    setTab(i)
    setOutput([])
    setRunning(false)
    setMinimized(false)
  }

  // Run once, shortly after the card first appears
  useEffect(() => {
    if (autoRan.current) return
    autoRan.current = true
    const t = setTimeout(() => run(0), 1500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const file = files[tab]

  return (
    <div style={{ perspective: 1100 }} className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/10 via-transparent to-emerald-500/10 blur-2xl dark:from-violet-500/15 dark:to-emerald-500/10" />
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 shadow-xl shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-black/40"
      >
        {!reduce && (
          <motion.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0 z-20" />
        )}

        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
          <button
            type="button"
            aria-label="Reset to profile.tsx"
            onClick={() => select(0)}
            className="group/dot h-3 w-3 rounded-full bg-red-400/90 transition-transform hover:scale-125"
            title="Reset"
          />
          <button
            type="button"
            aria-label={minimized ? 'Restore editor' : 'Minimize editor'}
            aria-pressed={minimized}
            onClick={() => setMinimized((m) => !m)}
            className="h-3 w-3 rounded-full bg-amber-400/90 transition-transform hover:scale-125"
            title={minimized ? 'Restore' : 'Minimize'}
          />
          <button
            type="button"
            aria-label="Run code"
            onClick={() => run()}
            className="h-3 w-3 rounded-full bg-emerald-400/90 transition-transform hover:scale-125"
            title="Run"
          />
          <div role="tablist" aria-label="Files" className="ml-2 flex min-w-0 gap-1 overflow-x-auto">
            {files.map((f, i) => (
              <button
                key={f.name}
                role="tab"
                aria-selected={tab === i}
                type="button"
                onClick={() => select(i)}
                className={`relative whitespace-nowrap rounded-md px-2 py-1 font-mono-strict text-[10px] transition-colors ${
                  tab === i
                    ? 'text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                {tab === i && (
                  <motion.span
                    layoutId="profile-tab"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-md bg-zinc-100 dark:bg-zinc-800"
                  />
                )}
                <span className="relative">{f.name}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => run()}
            disabled={running}
            className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 font-mono-strict text-[10px] font-semibold uppercase tracking-wider text-emerald-700 transition-colors hover:bg-emerald-500/20 disabled:opacity-60 dark:text-emerald-400"
          >
            {running ? <RotateCcw className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
            Run
          </button>
        </div>

        <AnimatePresence initial={false}>
          {!minimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 p-5 sm:p-6">
                <pre className="min-h-[7.5rem] font-mono-strict text-[11px] leading-relaxed text-zinc-600 sm:text-xs dark:text-zinc-400">
                  <AnimatePresence mode="wait">
                    <motion.div key={file.name} initial="hide" animate="show" className="space-y-0">
                      {file.code.map((line, li) => (
                        <motion.div
                          key={li}
                          variants={{
                            hide: { opacity: 0, x: -10 },
                            show: { opacity: 1, x: 0 },
                          }}
                          transition={{ delay: reduce ? 0 : li * 0.07, duration: 0.25 }}
                          className="whitespace-pre"
                        >
                          <span className="mr-3 select-none text-zinc-300 dark:text-zinc-700">{li + 1}</span>
                          {line.map(([t, c], ti) => (
                            <span key={ti} className={c}>
                              {t}
                            </span>
                          ))}
                          {li === file.code.length - 1 && !reduce && (
                            <span className="ml-0.5 inline-block h-[1em] w-[6px] translate-y-[2px] animate-pulse bg-emerald-500" />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </pre>

                {/* terminal output */}
                <div
                  aria-live="polite"
                  className="min-h-[4.6rem] rounded-xl border border-zinc-100 bg-zinc-50/80 p-3 font-mono-strict text-[11px] leading-relaxed dark:border-zinc-800 dark:bg-zinc-950/60"
                >
                  {output.length === 0 && (
                    <p className="text-zinc-400 dark:text-zinc-600">Press Run to execute {file.name}</p>
                  )}
                  {output.map((l, i) => (
                    <motion.p
                      key={l}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={
                        l.startsWith('>')
                          ? 'text-zinc-500'
                          : l.startsWith('✓')
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'font-semibold text-violet-700 dark:text-violet-300'
                      }
                    >
                      {i === output.length - 1 && !l.startsWith('>') && !l.startsWith('✓') && (
                        <Check className="mr-1 inline h-3 w-3" />
                      )}
                      {l}
                    </motion.p>
                  ))}
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  {cells.map((cell, i) => (
                    <motion.div
                      key={cell.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-3 transition-colors hover:border-violet-300/60 dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-violet-500/40"
                    >
                      <p className="font-mono-strict text-[10px] uppercase tracking-wider text-zinc-500">{cell.label}</p>
                      <p className="mt-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200">{cell.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
