import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'

const core = {
  title: 'Frontend',
  items: [
    'React.js',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'Bootstrap',
  ],
} as const

const secondary = [
  { title: 'State', items: ['Redux', 'MobX'] as const },
  { title: 'Backend', items: ['Node.js', 'Express'] as const },
  { title: 'Data', items: ['MySQL'] as const },
  { title: 'Tooling', items: ['Git', 'GitHub', 'Webpack', 'npm'] as const },
] as const

export function Skills() {
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
          subtitle="A pragmatic toolkit centered on TypeScript, React, and Node—chosen for velocity and long-term maintainability."
        />

        <div className="mt-14 grid auto-rows-min gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-violet-300/50 hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-violet-500/25 sm:col-span-2 sm:row-span-4 sm:flex sm:flex-col sm:justify-center sm:p-8 lg:col-span-2 lg:row-span-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-mono-strict text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
                {core.title}
              </h3>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono-strict text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                Core
              </span>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {core.items.map((skill) => (
                <li key={skill}>
                  <span className="inline-flex rounded-lg border border-zinc-200/80 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-800 transition-colors hover:border-violet-300/60 hover:bg-violet-50 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:hover:border-violet-500/40 dark:hover:bg-violet-950/40">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {secondary.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.05 * (i + 1) }}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
            >
              <h3 className="font-mono-strict text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill}>
                    <span className="inline-flex rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
