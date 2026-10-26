import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Building2, CalendarClock, ChevronDown, Network, Shield, type LucideIcon } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { SectionHeading } from './SectionHeading'
import { Showcase } from './Showcase'

interface Project {
  group: '20x' | 'earlier'
  brand: string
  title: string
  subtitle: string
  summary: string
  highlights: readonly string[]
  stack: readonly string[]
  icon: LucideIcon
}

const projects: Project[] = [
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
    icon: Network,
  },
]

const tabs = [
  { id: 'all', label: 'All' },
  { id: '20x', label: '20x platform' },
  { id: 'earlier', label: 'Earlier work' },
] as const

const PREVIEW = 2

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

const accent = {
  '20x': {
    tile: 'from-violet-600 to-indigo-500',
    pill: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
    dot: 'bg-violet-500',
    hover: 'hover:border-violet-300/70 dark:hover:border-violet-500/40',
  },
  earlier: {
    tile: 'from-zinc-700 to-zinc-500 dark:from-zinc-600 dark:to-zinc-400',
    pill: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300',
    dot: 'bg-zinc-400',
    hover: 'hover:border-zinc-400/70 dark:hover:border-zinc-500/60',
  },
} as const

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
          subtitle="Client websites for a solar company and a children's hospital, two products on the 20x care platform, plus earlier work on real-time chat, access control and data visualization."
        />

        <div className="mt-10">
          <Showcase />
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">More work</h3>
          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
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
        </div>

        <motion.div layout className="mt-6 grid items-start gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((project, index) => {
              const Icon = project.icon
              const a = accent[project.group]
              const expanded = !!open[project.title]
              const shown = expanded ? project.highlights : project.highlights.slice(0, PREVIEW)
              const hidden = project.highlights.length - PREVIEW
              return (
                <motion.article
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -3 }}
                  className="group"
                >
                  <Spotlight>
                    <div
                      className={`relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/90 p-6 shadow-lg shadow-zinc-900/[0.05] backdrop-blur-md transition-colors dark:border-zinc-800 dark:bg-zinc-900/85 dark:shadow-black/30 ${a.hover}`}
                    >
                      <div className="spotlight-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <motion.span
                            whileHover={{ scale: 1.08, rotate: -4 }}
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${a.tile} text-white shadow-md`}
                          >
                            <Icon className="h-6 w-6" strokeWidth={1.6} />
                          </motion.span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className={`rounded-full px-2.5 py-0.5 font-mono-strict text-[10px] font-semibold uppercase tracking-wider ${a.pill}`}>
                                {project.brand}
                              </span>
                              <span className="font-mono-strict text-[10px] tabular-nums text-zinc-400">
                                {String(index + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
                              </span>
                            </div>
                            <h4 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{project.title}</h4>
                            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{project.subtitle}</p>
                          </div>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{project.summary}</p>

                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {project.stack.map((t) => (
                            <li
                              key={t}
                              className="rounded-md border border-zinc-200/90 bg-zinc-50 px-2 py-1 font-mono-strict text-[10px] font-semibold uppercase tracking-wider text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>

                        <ul className="mt-5 space-y-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                          <AnimatePresence initial={false}>
                            {shown.map((line) => (
                              <motion.li
                                key={line}
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="flex gap-2.5 overflow-hidden text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400"
                              >
                                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} aria-hidden />
                                {line}
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </ul>
                        {hidden > 0 && (
                          <button
                            type="button"
                            onClick={() => setOpen((o) => ({ ...o, [project.title]: !expanded }))}
                            aria-expanded={expanded}
                            className="mt-3 inline-flex items-center gap-1.5 font-mono-strict text-[11px] font-semibold uppercase tracking-wider text-violet-700 hover:underline dark:text-violet-300"
                          >
                            {expanded ? 'Show less' : `Show ${hidden} more`}
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
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
