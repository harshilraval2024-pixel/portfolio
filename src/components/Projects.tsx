import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Building2, CalendarClock, ChevronDown, Network, Shield } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { SectionHeading } from './SectionHeading'

const projects = [
  {
    group: '20x',
    brand: '20x',
    title: 'Nursing & Care Agency',
    subtitle: 'Staff scheduling, time tracking & payroll',
    summary:
      'Multi-tenant web platform for nursing and care agencies: calendars, shifts, timesheets, invoicing and reports in one place, with real-time updates and maintainable React.',
    highlights: [
      'Developed a web app for staff scheduling, time tracking and payroll, reducing schedule conflicts by 30%.',
      'Built the Scheduler and Timesheet calendars with drag-and-drop booking, availability, shift types and conflict warnings.',
      'Refactored React code into reusable hooks, decreasing duplication by 40%, and managed state with MobX.',
      'Delivered client invoicing: manual lines, credit notes, partial payments and invoice recalculation.',
      'Built report screens with filters and Excel/PDF downloads.',
      'Implemented real-time chat and live progress updates with Ably.',
      'Applied each agency\'s theme colors, name and logo across the calendars and app.',
    ],
    stack: ['React', 'TypeScript', 'MobX', 'Ably', 'Formik', 'Drag & Drop'],
    gradient: 'from-violet-600 via-fuchsia-500 to-cyan-500',
    icon: Building2,
  },
  {
    group: '20x',
    brand: '20x',
    title: 'Dom Care',
    subtitle: 'Digital timesheets for home care',
    summary:
      'A digital timesheet solution for home care providers, with clear shift visibility in a purpose-built 24-hour calendar view.',
    highlights: [
      'Developed a digital timesheet calendar for home care providers, displaying shifts in an easy-to-read 24-hour view.',
      'Built the visit scheduler with drag-and-drop visit planning and Google Maps staff location.',
    ],
    stack: ['React', 'TypeScript', 'Google Maps', 'Drag & Drop'],
    gradient: 'from-emerald-600 via-teal-500 to-cyan-500',
    icon: CalendarClock,
  },
  {
    group: 'earlier',
    brand: 'Balkrushna',
    title: 'Chatbot Widget System',
    subtitle: 'Real-time messaging & support widget',
    summary: 'A real-time messaging and support widget for web platforms.',
    highlights: [
      'Built a real-time chat system using Socket.io and developed backend APIs with Node.js and MySQL.',
      'Designed a simple, step-by-step setup for integrating chat into websites.',
    ],
    stack: ['Socket.io', 'Node.js', 'MySQL'],
    gradient: 'from-violet-600 via-purple-500 to-indigo-600',
    icon: Bot,
  },
  {
    group: 'earlier',
    brand: 'Balkrushna',
    title: 'RBAC System',
    subtitle: 'Role-based access control CRM',
    summary: 'A secure CRM with user and role-based permission management.',
    highlights: [
      'Developed a secure CRM with React, Node.js, and MySQL, implementing JWT for role-based access control.',
      'Streamlined user and role management, enhancing security and user experience through dynamic interface updates.',
    ],
    stack: ['React', 'Node.js', 'MySQL', 'JWT'],
    gradient: 'from-emerald-600 via-teal-500 to-cyan-600',
    icon: Shield,
  },
  {
    group: 'earlier',
    brand: 'Balkrushna',
    title: 'Blockchain System',
    subtitle: 'Member structure visualization',
    summary: 'A visualization tool for blockchain member structures.',
    highlights: ['Developed a dynamic tree view for blockchain member hierarchies, with auto-updating data.'],
    stack: ['Tree view', 'Auto-updating data'],
    gradient: 'from-amber-500 via-orange-500 to-rose-600',
    icon: Network,
  },
] as const

const tabs = [
  { id: 'all', label: 'All' },
  { id: '20x', label: '20x platform' },
  { id: 'earlier', label: 'Earlier work' },
] as const

const PREVIEW = 3

function Spotlight({ children }: { children: React.ReactNode }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div onMouseMove={onMove} className="spotlight relative">
      {children}
    </div>
  )
}

export function Projects() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('all')
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const list = projects.filter((p) => tab === 'all' || p.group === tab)

  return (
    <section id="projects" className="border-b border-zinc-200/60 py-20 dark:border-zinc-800/60 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          kicker="Projects"
          title="Shipped products & platforms"
          subtitle="Two products on the 20x care platform, plus earlier work on real-time chat, access control and data visualization."
        />

        <div role="tablist" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`relative rounded-full border px-4 py-2 font-mono-strict text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                tab === t.id
                  ? 'border-transparent text-white dark:text-zinc-950'
                  : 'border-zinc-200 bg-white/70 text-zinc-600 hover:border-violet-400/50 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400'
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="project-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white"
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 flex flex-col gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {list.map((project, index) => {
              const Icon = project.icon
              const expanded = !!open[project.title]
              const shown = expanded ? project.highlights : project.highlights.slice(0, PREVIEW)
              const hidden = project.highlights.length - PREVIEW
              return (
                <motion.article
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="group relative"
                >
                  <div
                    className="project-card-ring absolute -inset-[1px] rounded-[1.35rem] opacity-60 blur-[1px] transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <Spotlight>
                    <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/90 shadow-xl shadow-zinc-900/[0.06] backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/85 dark:shadow-black/40">
                      <div className="spotlight-glow pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div
                        className={`relative z-10 h-36 overflow-hidden bg-gradient-to-br ${project.gradient} animate-project-gradient sm:h-40`}
                      >
                        <motion.div
                          className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl"
                          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <div className="relative flex h-full flex-col justify-between p-6 sm:flex-row sm:items-end sm:p-8">
                          <div className="flex items-start gap-4">
                            <motion.span
                              whileHover={{ scale: 1.08, rotate: -4 }}
                              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg ring-1 ring-white/30 backdrop-blur-md"
                            >
                              <Icon className="h-7 w-7" strokeWidth={1.5} />
                            </motion.span>
                            <div>
                              <p className="font-mono-strict text-[11px] font-semibold uppercase tracking-[0.25em] text-white/90">
                                {project.brand}
                              </p>
                              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                {project.title}
                              </h3>
                              <p className="mt-1 max-w-xl text-sm font-medium text-white/85 sm:text-base">
                                {project.subtitle}
                              </p>
                            </div>
                          </div>
                          <span className="mt-4 inline-flex self-start rounded-full bg-black/20 px-3 py-1 font-mono-strict text-[10px] font-bold tabular-nums text-white/95 ring-1 ring-white/25 backdrop-blur-sm">
                            {String(index + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      <div className="relative z-10 grid gap-8 p-6 sm:p-8 lg:grid-cols-5 lg:gap-10">
                        <div className="lg:col-span-2">
                          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{project.summary}</p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {project.stack.map((t) => (
                              <motion.li key={t} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                                <span className="inline-flex rounded-lg border border-zinc-200/90 bg-zinc-50 px-3 py-1.5 font-mono-strict text-[11px] font-semibold uppercase tracking-wider text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
                                  {t}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div className="lg:col-span-3">
                          <ul className="space-y-3">
                            <AnimatePresence initial={false}>
                              {shown.map((line) => (
                                <motion.li
                                  key={line}
                                  layout
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="flex gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3 transition-colors hover:border-violet-200/80 hover:bg-violet-50/40 dark:border-zinc-800/80 dark:bg-zinc-950/40 dark:hover:border-violet-500/30 dark:hover:bg-violet-950/20"
                                >
                                  <span
                                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-emerald-400 shadow-sm shadow-violet-500/30"
                                    aria-hidden
                                  />
                                  <span className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{line}</span>
                                </motion.li>
                              ))}
                            </AnimatePresence>
                          </ul>
                          {hidden > 0 && (
                            <button
                              type="button"
                              onClick={() => setOpen((o) => ({ ...o, [project.title]: !expanded }))}
                              aria-expanded={expanded}
                              className="mt-4 inline-flex items-center gap-1.5 font-mono-strict text-[11px] font-semibold uppercase tracking-wider text-violet-700 hover:underline dark:text-violet-300"
                            >
                              {expanded ? 'Show less' : `Show ${hidden} more`}
                              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Spotlight>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
