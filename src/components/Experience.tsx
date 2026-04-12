import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'

const roles = [
  {
    company: 'Benagon Technologies',
    period: 'Nov 2023 – Present',
    short: 'Present',
    bullets: [
      'Built staff management system covering scheduling and payroll workflows.',
      'Reduced scheduling conflicts by 30% through clearer UX and validation.',
      'Improved code reusability by ~40% with shared components and utilities.',
      'Delivered real-time updates using Ably for live dashboards and notifications.',
    ],
  },
  {
    company: 'Balkrushna Technologies',
    period: 'Feb 2022 – Nov 2023',
    short: '2022 — 2023',
    bullets: [
      'Built a chat system using Socket.io with rooms and presence patterns.',
      'Developed REST APIs with Node.js and MySQL for core product features.',
      'Implemented RBAC with JWT for secure, role-aware access.',
      'Built blockchain visualization UI for exploratory data views.',
    ],
  },
] as const

export function Experience() {
  return (
    <section
      id="experience"
      className="border-b border-zinc-200/60 py-20 dark:border-zinc-800/60 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          kicker="Experience"
          title="Roles that shaped how I build"
          subtitle="Highlights from shipping production features—ownership, iteration, and measurable outcomes."
        />

        <div className="mt-16 space-y-12 lg:space-y-0">
          {roles.map((role, index) => (
            <motion.article
              key={role.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.06 * index }}
              className="relative grid gap-8 border-t border-zinc-200/80 pt-12 dark:border-zinc-800/80 lg:grid-cols-12 lg:gap-10 lg:pt-14"
            >
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="font-mono-strict text-xs font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    {role.short}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
                    {role.company}
                  </h3>
                  <p className="mt-2 font-mono-strict text-sm text-zinc-500 dark:text-zinc-500">
                    {role.period}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-8">
                <ul className="space-y-4">
                  {role.bullets.map((b) => (
                    <li
                      key={b}
                      className="group flex gap-4 rounded-xl border border-transparent bg-zinc-50/50 px-4 py-3 transition-colors hover:border-zinc-200/80 dark:bg-zinc-900/30 dark:hover:border-zinc-800"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-emerald-400"
                        aria-hidden
                      />
                      <span className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
