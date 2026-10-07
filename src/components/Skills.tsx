import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Database, FormInput, Layers, Monitor, Radio, Server, Wrench, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from './SectionHeading'

const icons: Record<string, LucideIcon> = {
  Frontend: Monitor,
  'State & Forms': FormInput,
  Backend: Server,
  Database: Database,
  'Real-time & AI': Radio,
  Tooling: Wrench,
}

const groups = [
  {
    title: 'Frontend',
    core: true,
    items: ['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Drag & Drop', 'Google Maps'],
  },
  { title: 'State & Forms', core: false, items: ['MobX', 'Redux', 'Formik', 'Yup'] },
  { title: 'Backend', core: false, items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Socket.io'] },
  { title: 'Database', core: false, items: ['MySQL', 'MongoDB'] },
  { title: 'Real-time & AI', core: false, items: ['Ably', 'Cursor AI', 'GitHub Copilot', 'ChatGPT API'] },
  { title: 'Tooling', core: false, items: ['Git', 'GitHub', 'Webpack', 'Babel', 'npm', 'CI/CD', 'Vercel'] },
] as const

const filters = ['All', ...groups.map((g) => g.title)] as const

export function Skills() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const visible = groups.filter((g) => filter === 'All' || g.title === filter)

  return (
    <section
      id="skills"
      className="border-b border-zinc-200/60 py-20 dark:border-zinc-800/60 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          kicker="Skills"
          title="Stack & tooling"
          subtitle="React and TypeScript for the frontend, Node.js, Express and MySQL for API work. Filter by area."
        />

        <div role="tablist" aria-label="Filter skills" className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              type="button"
              onClick={() => setFilter(f)}
              className={`relative rounded-full border px-4 py-2 font-mono-strict text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                filter === f
                  ? 'border-transparent text-white dark:text-zinc-950'
                  : 'border-zinc-200 bg-white/70 text-zinc-600 hover:border-violet-400/50 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="skill-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 -z-0 rounded-full bg-zinc-900 dark:bg-white"
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.div layout className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((group) => (
                <motion.div
                  layout
                  key={group.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                  className={`rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-colors hover:border-violet-300/60 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-violet-500/30 ${
                    group.core ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="flex items-center gap-2.5 font-mono-strict text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/15 to-emerald-500/15 text-violet-600 dark:text-violet-400">
                        {(() => {
                          const Icon = icons[group.title] ?? Layers
                          return <Icon className="h-4 w-4" strokeWidth={1.75} />
                        })()}
                      </span>
                      {group.title}
                    </h3>
                    {group.core && (
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono-strict text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                        Core
                      </span>
                    )}
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <motion.li key={skill} whileHover={{ y: -2, scale: 1.04 }}>
                        <span className="inline-flex rounded-lg border border-zinc-200/80 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-800 transition-colors hover:border-violet-300/60 hover:bg-violet-50 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:hover:border-violet-500/40 dark:hover:bg-violet-950/40">
                          {skill}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}
