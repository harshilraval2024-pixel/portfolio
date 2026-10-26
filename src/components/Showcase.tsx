import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'

interface Work {
  id: string
  name: string
  tagline: string
  meta: string
  tags: string[]
  points: string[]
  url?: string
  host: string
  desktop: string
  mobile: string
  /** stage background */
  bg: string
  /** glow blob + dot colour */
  accent: string
}

const works: Work[] = [
  {
    id: 'tatsat',
    name: 'Tatsat NRGS',
    tagline: 'Power your future with solar.',
    meta: 'India · Client website · Design & development',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Admin panel'],
    points: [
      'Savings calculator and quote flow backed by a pricing engine.',
      'Staff admin at /manage to update content without code.',
      'Next.js on Vercel, FastAPI and Postgres on Render.',
    ],
    url: 'https://tatsat.vercel.app',
    host: 'tatsat.vercel.app',
    desktop: '/projects/tatsat-desktop.png',
    mobile: '/projects/tatsat-mobile.png',
    bg: 'linear-gradient(135deg,#7c2d12 0%,#c2410c 45%,#f59e0b 120%)',
    accent: '#fbbf24',
  },
  {
    id: 'satva',
    name: 'Satva Children Hospital',
    tagline: 'Where little hearts find big care.',
    meta: 'India · Client website · Design & development',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'WhatsApp booking'],
    points: [
      'One-tap WhatsApp appointment booking built for parents on phones.',
      'Custom admin: doctors, services, FAQs, testimonials and blog.',
      'SEO ready with sitemap, robots and schema markup.',
    ],
    host: 'satva-children-hospital',
    desktop: '/projects/satva-desktop.png',
    mobile: '/projects/satva-mobile.png',
    bg: 'linear-gradient(135deg,#0c4a6e 0%,#0e7490 50%,#10b981 130%)',
    accent: '#5eead4',
  },
]

const AUTO_MS = 7000

export function Showcase() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const w = works[i]

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setI((n) => (n + 1) % works.length), AUTO_MS)
    return () => clearTimeout(t)
  }, [i, paused])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })
  const lapX = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const lapY = useTransform(sy, [-0.5, 0.5], [-10, 10])
  const lapRY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const lapRX = useTransform(sy, [-0.5, 0.5], [5, -5])
  const phoneX = useTransform(sx, [-0.5, 0.5], [26, -26])
  const phoneY = useTransform(sy, [-0.5, 0.5], [18, -18])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
    setPaused(false)
  }

  return (
    <div
      className="relative overflow-hidden rounded-3xl text-white shadow-2xl shadow-zinc-900/25 ring-1 ring-black/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {/* background crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={w.id + 'bg'}
          className="absolute inset-0"
          style={{ background: w.bg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full blur-3xl"
        animate={{ backgroundColor: w.accent, opacity: [0.35, 0.55, 0.35] }}
        transition={{ opacity: { duration: 6, repeat: Infinity }, backgroundColor: { duration: 0.8 } }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={w.id + 'num'}
          aria-hidden
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute -right-4 -top-10 select-none text-[16rem] font-bold leading-none tracking-tighter"
        >
          {String(i + 1).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>

      <div className="relative z-10 px-6 pt-8 sm:px-10 sm:pt-10">
        <p className="font-mono-strict text-[11px] uppercase tracking-[0.25em] text-white/70">
          Selected client work / {String(works.length).padStart(2, '0')}
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Websites, out in the world.</h3>
      </div>

      <div className="relative z-10 grid items-center gap-10 px-6 pb-8 pt-8 sm:px-10 lg:grid-cols-[5fr_7fr] lg:gap-6">
        {/* copy */}
        <AnimatePresence mode="wait">
          <motion.div
            key={w.id + 'copy'}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-mono-strict text-[10px] uppercase tracking-[0.2em] text-white/70">{w.meta}</p>
            <h4 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">{w.name}</h4>
            <p className="mt-3 text-lg text-white/85 sm:text-xl">{w.tagline}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {w.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs backdrop-blur-sm">
                  {t}
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-2.5">
              {w.points.map((p, k) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + k * 0.08 }}
                  className="flex gap-2.5 text-sm text-white/85"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: w.accent }} />
                  {p}
                </motion.li>
              ))}
            </ul>

            {w.url ? (
              <a href={w.url} target="_blank" rel="noopener noreferrer" className="group mt-7 inline-flex items-center gap-3 text-sm font-medium">
                Explore the project
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-zinc-900 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            ) : (
              <p className="mt-7 font-mono-strict text-[10px] uppercase tracking-[0.2em] text-white/60">Private deployment</p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* device stage */}
        <div className="relative [perspective:1200px]">
          <div className="relative rounded-3xl border border-white/25 bg-white/10 p-4 pb-16 backdrop-blur-md sm:p-8 sm:pb-20 lg:min-h-[26rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={w.id + 'stage'}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.55 }}
              >
                <motion.div
                  style={{ x: lapX, y: lapY, rotateX: lapRX, rotateY: lapRY, transformStyle: 'preserve-3d' }}
                  className="overflow-hidden rounded-xl border border-white/40 bg-white shadow-2xl shadow-black/40"
                >
                  <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-100 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-rose-400" />
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-center font-mono-strict text-[10px] text-zinc-500">
                      {w.host}
                    </span>
                  </div>
                  <img src={w.desktop} alt={`${w.name} website on desktop`} loading="lazy" className="aspect-[1440/820] w-full object-cover object-top" />
                </motion.div>

                <motion.div
                  style={{ x: phoneX, y: phoneY }}
                  className="absolute -bottom-6 right-3 w-[28%] min-w-[96px] max-w-[170px] sm:right-8 sm:-bottom-8"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0], rotate: [3, 1, 3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="overflow-hidden rounded-[1.4rem] border-[5px] border-zinc-900 bg-zinc-900 shadow-2xl shadow-black/50"
                  >
                    <div className="mx-auto mb-0.5 h-1 w-8 rounded-full bg-zinc-700" />
                    <img src={w.mobile} alt={`${w.name} website on mobile`} loading="lazy" className="aspect-[469/920] w-full rounded-[1rem] object-cover object-top" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* switcher */}
      <div className="relative z-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/20 bg-black/15 px-6 py-4 backdrop-blur-sm sm:px-10" role="tablist" aria-label="Choose a project">
        {works.map((x, k) => {
          const active = k === i
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setI(k)}
              className={`relative flex items-center gap-2.5 pb-2 text-sm transition-opacity ${active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: x.accent }} />
              <span className="font-mono-strict text-[10px] text-white/70">{String(k + 1).padStart(2, '0')}</span>
              {x.name}
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-px bg-white/25">
                  <motion.span
                    key={i + String(paused)}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: paused ? 0 : AUTO_MS / 1000, ease: 'linear' }}
                  />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
