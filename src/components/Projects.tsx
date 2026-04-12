import { motion } from 'framer-motion'
import {
  Bot,
  Building2,
  CalendarClock,
  Network,
  Shield,
  Sparkles,
} from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const projects = [
  {
    brand: '',
    title: 'Chatbot Widget System',
    subtitle: 'Embeddable assistant for any site',
    summary:
      'A configurable chatbot widget with themes, session handling, and hooks so teams can drop it into third-party properties without rework.',
    highlights: [
      'Themable embeddable widget with session continuity across page loads.',
      'Admin-friendly integration patterns and extension points for custom behavior.',
      'Pairs with REST and WebSocket-style flows for responsive, conversational UX.',
    ],
    stack: ['React', 'TypeScript', 'REST APIs', 'WebSockets'],
    gradient: 'from-violet-600 via-purple-500 to-indigo-600',
    icon: Bot,
  },
  {
    brand: '',
    title: 'RBAC System',
    subtitle: 'Roles, permissions & audited access',
    summary:
      'Role-based access control with JWT-backed sessions, fine-grained permissions, and traceable actions for multi-tenant admin surfaces.',
    highlights: [
      'JWT authentication with role-aware route and API protection.',
      'Permission matrices that scale as new resources and actions are added.',
      'Audited admin actions for safer operations in shared environments.',
    ],
    stack: ['Node.js', 'Express', 'MySQL', 'JWT'],
    gradient: 'from-emerald-600 via-teal-500 to-cyan-600',
    icon: Shield,
  },
  {
    brand: '',
    title: 'Blockchain Visualization System',
    subtitle: 'Explore chains at a glance',
    summary:
      'Interactive UI to explore chain data, transactions, and relationships—overview first, with drill-down when analysts need detail.',
    highlights: [
      'Visual summaries of transactions and relationships across the chain.',
      'Built for clarity first, then depth—progressive disclosure for power users.',
      'Responsive front end wired to Node-backed data for dependable loads.',
    ],
    stack: ['React', 'TypeScript', 'D3.js', 'Node.js'],
    gradient: 'from-amber-500 via-orange-500 to-rose-600',
    icon: Network,
  },
  {
    brand: '20x',
    title: 'Nursing & Care Agency',
    subtitle: 'Staff scheduling, time tracking & payroll',
    summary:
      'End-to-end web app for care agencies—calendars, shifts, and payroll in one place, with real-time updates and a focus on maintainable React.',
    highlights: [
      'Built a web app to manage staff scheduling, time tracking, and payroll for care agencies.',
      'Made calendar booking easier, cutting schedule conflicts by 30%.',
      'Cleaned up React code into reusable hooks, reducing duplication by 40%.',
      'Managed application state with MobX for better performance.',
      'Added live shift updates using Ably (real-time messaging).',
      'Delivered fast, reliable web apps using React, Webpack, and Babel.',
      'Built a shift calendar with customizable color themes.',
    ],
    stack: ['React', 'MobX', 'Ably', 'Webpack', 'Babel'],
    gradient: 'from-violet-600 via-fuchsia-500 to-cyan-500',
    icon: Building2,
  },
  {
    brand: '20x',
    title: 'Dom Care',
    subtitle: 'Digital timesheets for home care',
    summary:
      'A digital timesheet product for home care providers—clear shift visibility in a purpose-built 24-hour calendar view.',
    highlights: [
      'Developed a timesheet calendar that displays user shifts in an easy-to-read 24-hour view, improving clarity and shift management.',
    ],
    stack: ['React', 'Webpack', 'Calendar UI'],
    gradient: 'from-emerald-600 via-teal-500 to-cyan-500',
    icon: CalendarClock,
  },
] as const

const cardContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
}

const bulletVariant = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
}

export function Projects() {
  return (
    <section
      id="projects"
      className="border-b border-zinc-200/60 py-20 dark:border-zinc-800/60 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          kicker="Projects"
          title="Shipped products & platforms"
          subtitle="From embeddable widgets and auth systems to care-sector scheduling—five builds that mix product craft with production constraints."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white/80 px-4 py-2 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
            <motion.span
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            </motion.span>
            5 projects · scroll to explore
          </span>
        </motion.div>

        <div className="mt-12 flex flex-col gap-8 lg:gap-10">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px', amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: 0.06 * index,
                }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div
                  className="project-card-ring absolute -inset-[1px] rounded-[1.35rem] opacity-60 blur-[1px] transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/90 shadow-xl shadow-zinc-900/[0.06] backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/85 dark:shadow-black/40">
                  <div
                    className={`relative h-36 overflow-hidden bg-gradient-to-br ${project.gradient} animate-project-gradient sm:h-40`}
                  >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.07%22%3E%3Cpath%20d%3D%22M0%2040h40V0H0v40zm2-2V2h36v36H2z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
                    <motion.div
                      className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="relative flex h-full flex-col justify-between p-6 sm:flex-row sm:items-end sm:p-8">
                      <div className="flex items-start gap-4">
                        <motion.span
                          whileHover={{ scale: 1.05, rotate: -3 }}
                          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg ring-1 ring-white/30 backdrop-blur-md"
                        >
                          <Icon className="h-7 w-7" strokeWidth={1.5} />
                        </motion.span>
                        <div>
                          {project.brand ? (
                            <p className="font-mono-strict text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90">
                              {project.brand}
                            </p>
                          ) : (
                            <p className="font-mono-strict text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                              Selected work
                            </p>
                          )}
                          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            {project.title}
                          </h3>
                          <p className="mt-1 max-w-xl text-sm font-medium text-white/85 sm:text-base">
                            {project.subtitle}
                          </p>
                        </div>
                      </div>
                      <motion.span
                        className="mt-4 inline-flex self-start rounded-full bg-black/20 px-3 py-1 font-mono-strict text-[10px] font-bold tabular-nums text-white/95 ring-1 ring-white/25 backdrop-blur-sm sm:mt-0 sm:self-end"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </motion.span>
                    </div>
                  </div>

                  <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-5 lg:gap-10">
                    <div className="lg:col-span-2">
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {project.summary}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.stack.map((t) => (
                          <motion.li
                            key={t}
                            whileHover={{ scale: 1.04 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          >
                            <span className="inline-flex rounded-lg border border-zinc-200/90 bg-zinc-50 px-3 py-1.5 font-mono-strict text-[11px] font-semibold uppercase tracking-wider text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300">
                              {t}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.ul
                      variants={cardContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-20px' }}
                      className="space-y-3 lg:col-span-3"
                    >
                      {project.highlights.map((line) => (
                        <motion.li
                          key={line}
                          variants={bulletVariant}
                          className="flex gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3 transition-colors hover:border-violet-200/80 hover:bg-violet-50/40 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:hover:border-violet-500/20 dark:hover:bg-violet-950/15"
                        >
                          <span
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-emerald-400 shadow-sm shadow-violet-500/30"
                            aria-hidden
                          />
                          <span className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                            {line}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
