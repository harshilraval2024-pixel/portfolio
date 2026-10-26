import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Calculator, Check, LayoutDashboard, MessageCircle, MousePointer2, Search, Stethoscope, Zap, type LucideIcon } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { Magnetic } from './Interactive'

interface Work {
  id: string
  name: string
  tagline: string
  meta: string
  tags: string[]
  points: string[]
  url?: string
  host: string
  /** tall full-page capture that scrolls inside the browser frame on hover */
  page: string
  /** seconds for the hover scroll to reach the bottom of the page */
  scroll: number
  chips: { icon: LucideIcon; label: string }[]
  bg: string
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
    page: '/projects/tatsat-page.jpg',
    scroll: 11,
    chips: [
      { icon: Calculator, label: 'Savings calculator' },
      { icon: Zap, label: 'Instant quote flow' },
      { icon: LayoutDashboard, label: 'Staff admin' },
    ],
    bg: 'radial-gradient(55% 80% at 12% 8%,#fb923c 0%,transparent 62%),radial-gradient(50% 70% at 92% 18%,#fb7185 0%,transparent 60%),radial-gradient(65% 80% at 78% 105%,#fbbf24 0%,transparent 58%),radial-gradient(55% 60% at 0% 100%,#dc2626 0%,transparent 62%),linear-gradient(135deg,#c2410c,#ea580c)',
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
    page: '/projects/satva-page.jpg',
    scroll: 8,
    chips: [
      { icon: MessageCircle, label: 'WhatsApp booking' },
      { icon: Stethoscope, label: 'Doctor profiles' },
      { icon: Search, label: 'SEO ready' },
    ],
    bg: 'radial-gradient(55% 80% at 12% 8%,#38bdf8 0%,transparent 62%),radial-gradient(50% 70% at 92% 18%,#818cf8 0%,transparent 60%),radial-gradient(65% 80% at 78% 105%,#34d399 0%,transparent 58%),radial-gradient(55% 60% at 0% 100%,#0891b2 0%,transparent 62%),linear-gradient(135deg,#0369a1,#0e7490)',
    accent: '#5eead4',
  },
]

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>\")"

const chipSpots = [
  'left-[2%] top-[6%] sm:-left-4',
  'right-[1%] top-[34%] sm:-right-5',
  'left-[8%] bottom-[2%] sm:left-[6%] sm:-bottom-5',
]

function Panel({ w, index, flip }: { w: Work; index: number; flip: boolean }) {
  const [hover, setHover] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 110, damping: 16 })
  const sy = useSpring(my, { stiffness: 110, damping: 16 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-11, 11])
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8])
  const glowX = useTransform(sx, [-0.5, 0.5], ['5%', '95%'])
  const glowY = useTransform(sy, [-0.5, 0.5], ['5%', '95%'])
  // chips sit nearer the viewer, so they travel against the tilt
  const c1x = useTransform(sx, [-0.5, 0.5], [18, -18])
  const c1y = useTransform(sy, [-0.5, 0.5], [12, -12])
  const c2x = useTransform(sx, [-0.5, 0.5], [30, -30])
  const c2y = useTransform(sy, [-0.5, 0.5], [20, -20])
  const chipMotion = [
    { x: c1x, y: c1y },
    { x: c2x, y: c2y },
    { x: c1x, y: c2y },
  ]

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
    e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
    setHover(false)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl text-white shadow-2xl shadow-zinc-900/30 ring-1 ring-black/10"
      style={{ background: w.bg }}
    >
      {/* living background: drifting colour blobs, grid and film grain */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-24 h-[28rem] w-[28rem] rounded-full opacity-45 blur-3xl"
        style={{ backgroundColor: w.accent }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-[26rem] w-[26rem] rounded-full bg-white opacity-20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl"
        style={{ left: glowX, top: glowY, backgroundColor: w.accent }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `linear-gradient(${flip ? '270deg' : '90deg'},rgba(0,0,0,0.28) 0%,rgba(0,0,0,0.12) 38%,transparent 62%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      <span
        aria-hidden
        className={`pointer-events-none absolute top-1 select-none text-[8rem] font-bold leading-none tracking-tighter opacity-[0.1] ${flip ? 'right-6' : 'left-6'}`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className={`relative z-10 grid items-center gap-12 p-6 sm:p-10 lg:grid-cols-[5fr_7fr] lg:gap-10 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono-strict text-[10px] uppercase tracking-[0.2em] text-white/70"
          >
            {String(index + 1).padStart(2, '0')} · {w.meta}
          </motion.p>
          <h4 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl">{w.name}</h4>
          <p className="mt-3 text-lg text-white/85 sm:text-xl">{w.tagline}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {w.tags.map((t) => (
              <li key={t} className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs backdrop-blur-sm transition-colors hover:bg-white/25">
                {t}
              </li>
            ))}
          </ul>

          <ul className="mt-6 space-y-2.5">
            {w.points.map((p, k) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + k * 0.1 }}
                className="flex gap-2.5 text-sm text-white/85"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: w.accent }} />
                {p}
              </motion.li>
            ))}
          </ul>

          <div className="mt-8">
            {w.url ? (
              <Magnetic strength={0.3}>
                <a href={w.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-sm font-medium">
                  Explore the project
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </a>
              </Magnetic>
            ) : (
              <p className="font-mono-strict text-[10px] uppercase tracking-[0.2em] text-white/60">Private deployment</p>
            )}
          </div>
        </div>

        {/* 3D stage */}
        <div className="[perspective:1400px]" onMouseMove={onMove} onMouseEnter={() => setHover(true)} onMouseLeave={onLeave}>
          <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="stage relative px-2 py-6 sm:px-6 sm:py-10">
            {/* depth plates behind the screen */}
            <div aria-hidden className="absolute inset-x-6 inset-y-10 rounded-2xl border border-white/20 bg-white/10 sm:inset-x-10" style={{ transform: 'translateZ(-60px)' }} />
            <div aria-hidden className="absolute inset-x-3 inset-y-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm sm:inset-x-8" style={{ transform: 'translateZ(-30px)' }} />

            <div style={{ transform: 'translateZ(40px)' }} className="relative overflow-hidden rounded-xl border border-white/50 bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-100 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-center font-mono-strict text-[10px] text-zinc-500">{w.host}</span>
              </div>
              <div
                role="img"
                aria-label={`${w.name} website, scrolls on hover`}
                className="screen aspect-[16/10] w-full bg-white bg-cover"
                style={{ backgroundImage: `url(${w.page})`, backgroundSize: '100% auto', backgroundPosition: '50% 0%', ['--dur' as string]: `${w.scroll}s` }}
              />
              {/* glare that follows the cursor */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: hover ? 1 : 0,
                  background: 'radial-gradient(360px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.28), transparent 60%)',
                }}
              />
              <motion.div
                aria-hidden
                animate={{ opacity: hover ? 0 : 1, y: hover ? 8 : 0 }}
                className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-zinc-900/80 px-3 py-1.5 font-mono-strict text-[10px] uppercase tracking-wider text-white backdrop-blur"
              >
                <MousePointer2 className="h-3 w-3" /> Hover to scroll the site
              </motion.div>
            </div>

            {/* floating feature chips at different depths */}
            {w.chips.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.label}
                  className={`absolute z-20 hidden sm:block ${chipSpots[i]}`}
                  style={{ ...chipMotion[i], transform: `translateZ(${90 + i * 25}px)` }}
                >
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    className="flex items-center gap-2 rounded-xl border border-white/40 bg-white/85 px-3 py-2 text-xs font-semibold text-zinc-800 shadow-xl shadow-black/25 backdrop-blur-md"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg text-white" style={{ background: w.accent }}>
                      <Icon className="h-3.5 w-3.5 text-zinc-900" />
                    </span>
                    {c.label}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

export function Showcase() {
  return (
    <div className="space-y-8">
      {works.map((w, i) => (
        <Panel key={w.id} w={w} index={i} flip={i % 2 === 1} />
      ))}
    </div>
  )
}
