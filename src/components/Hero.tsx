import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Download, Mail, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'
import { CountUp } from './CountUp'
import { Typewriter } from './Typewriter'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
      when: 'beforeChildren',
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
}

const bentoItems = [
  { label: 'Stack', value: 'React · TS · MobX' },
  { label: 'Focus', value: 'Scheduling · Real-time' },
  { label: 'Experience', value: '4+ years shipping' },
] as const

const phrases = [
  'scheduling calendars with drag & drop',
  'invoicing and reporting screens',
  'real-time chat and live updates',
  'reusable React hooks and components',
] as const

const stats = [
  { to: 4, suffix: '+', label: 'Years building for the web' },
  { to: 2000, suffix: '+', label: 'Commits to one production React app' },
  { to: 30, suffix: '%', label: 'Fewer scheduling conflicts' },
  { to: 40, suffix: '%', label: 'Less duplicated code' },
] as const

export function Hero() {
  return (
    <section
      id="top"
      className="relative border-b border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-32 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-400">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl sm:leading-[1.05] lg:text-6xl lg:leading-[1.02] dark:text-white"
            >
              <span className="block text-zinc-500 dark:text-zinc-500">Harshil Raval</span>
              <span className="mt-1 block text-gradient">Full Stack Web Developer</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 font-mono-strict text-sm text-zinc-600 sm:text-base dark:text-zinc-400"
            >
              React.js · TypeScript · Node.js
            </motion.p>
            <motion.p
              variants={item}
              className="mt-3 font-mono-strict text-sm text-emerald-700 dark:text-emerald-400 sm:text-base"
            >
              <span className="text-zinc-400 dark:text-zinc-600">&gt; </span>
              I build <Typewriter phrases={phrases} />
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400"
            >
              Frontend-focused developer shipping a multi-tenant workforce platform for
              care agencies: scheduling, timesheets, invoicing and reporting, built to stay
              fast and maintainable as the product grows.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/25 transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:shadow-white/10 dark:hover:bg-zinc-100"
              >
                View projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300/90 bg-white/80 px-6 py-3.5 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 hover:text-emerald-800 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-emerald-500/40 dark:hover:text-emerald-300"
              >
                Contact
                <ArrowDownRight className="h-4 w-4 opacity-70" />
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-zinc-600 transition-colors hover:text-violet-700 dark:text-zinc-400 dark:hover:text-violet-300"
              >
                <Download className="h-4 w-4" />
                Résumé
              </a>
            </motion.div>

            <motion.a
              variants={item}
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex max-w-full items-center gap-3 rounded-2xl border border-zinc-200/90 bg-white/60 px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur transition-all hover:border-violet-400/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:border-violet-500/35"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                <Mail className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 truncate font-mono-strict text-[13px]">
                {profile.email}
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative lg:col-span-5"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/10 via-transparent to-emerald-500/10 blur-2xl dark:from-violet-500/15 dark:to-emerald-500/10" />
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 shadow-xl shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-black/40">
              <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                <span className="ml-2 font-mono-strict text-[10px] text-zinc-400">
                  profile.tsx
                </span>
              </div>
              <div className="space-y-3 p-5 sm:p-6">
                <pre className="font-mono-strict text-[11px] leading-relaxed text-zinc-600 sm:text-xs dark:text-zinc-400">
                  <span className="text-violet-600 dark:text-violet-400">const</span>{' '}
                  <span className="text-emerald-600 dark:text-emerald-400">developer</span>
                  {' = '}
                  <span className="text-zinc-800 dark:text-zinc-200">{'{'}</span>
                  {'\n'}
                  {'  '}<span className="text-zinc-500">role:</span>{' '}
                  <span className="text-amber-700 dark:text-amber-400">
                    &apos;Full-stack · frontend-first&apos;
                  </span>
                  ,{'\n'}
                  {'  '}<span className="text-zinc-500">focus:</span>{' '}
                  <span className="text-amber-700 dark:text-amber-400">
                    [&apos;scheduler&apos;, &apos;invoicing&apos;, &apos;realtime&apos;]
                  </span>
                  ,{'\n'}
                  <span className="text-zinc-800 dark:text-zinc-200">{'}'}</span>
                </pre>
                <div className="grid gap-2 sm:grid-cols-3">
                  {bentoItems.map((cell, i) => (
                    <motion.div
                      key={cell.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.08 }}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-950/50"
                    >
                      <p className="font-mono-strict text-[10px] uppercase tracking-wider text-zinc-500">
                        {cell.label}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {cell.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-200/80 dark:border-zinc-800 dark:bg-zinc-800 lg:grid-cols-4"
        >
          {stats.map((st) => (
            <div key={st.label} className="bg-white/80 p-5 backdrop-blur dark:bg-zinc-950/80 sm:p-6">
              <dt className="sr-only">{st.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                <span className="text-gradient">
                  <CountUp to={st.to} suffix={st.suffix} />
                </span>
              </dd>
              <p className="mt-1 text-xs leading-snug text-zinc-500 sm:text-sm">{st.label}</p>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
