import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarClock,
  ClipboardList,
  FileBarChart,
  FormInput,
  MessageSquare,
  Receipt,
  Timer,
  UserCog,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from './SectionHeading'

const moduleIcons: Record<string, LucideIcon> = {
  Scheduler: CalendarClock,
  Timesheets: Timer,
  'Client invoicing': Receipt,
  'Client manager': Users,
  'Staff manager': UserCog,
  Reports: FileBarChart,
  Chat: MessageSquare,
  Recruitment: ClipboardList,
  'Form builder': FormInput,
}

const modules = [
  { name: 'Scheduler', text: 'Drag-and-drop shift booking, staff availability, shift types, day/night and split/sleepover rates, shift buffers and conflict warnings.' },
  { name: 'Timesheets', text: 'Timesheet calendar with shift approval and sign-off, bulk approvals, approval history and custom durations.' },
  { name: 'Client invoicing', text: 'Manual invoice lines, credit notes, partial payments, payable invoices and invoice recalculation.' },
  { name: 'Client manager', text: 'Client rates and settings, bulk updates, CSV import with column mapping, and a copy-settings tool with history.' },
  { name: 'Staff manager', text: 'Staff profiles, pay bands, training certificates and printable profiles.' },
  { name: 'Reports', text: 'Staff data, staff payments, compliance, DBS and shift booking reports with filters and downloads.' },
  { name: 'Chat', text: 'Staff–admin chat interface with live updates delivered through Ably.' },
  { name: 'Recruitment', text: 'Pre-recruitment and recruitment pipelines, references and job roles.' },
  { name: 'Form builder', text: 'Configurable forms with a live preview.' },
] as const

type Group = { name: string; blurb?: string; bullets: readonly string[] }

const roles: {
  company: string
  title: string
  period: string
  short: string
  groups: Group[]
  explorer?: boolean
}[] = [
  {
    company: 'Benagon Technologies',
    title: 'Software Developer',
    period: 'Nov 2023 – Present',
    short: 'Present',
    explorer: true,
    groups: [
      {
        name: '20x – Nursing & Care Agency',
        blurb: 'Multi-tenant workforce platform for nursing and care agencies, built with React, TypeScript and MobX.',
        bullets: [
          'Developed a web app for staff scheduling, time tracking and payroll, reducing schedule conflicts by 30%.',
          'Built the Scheduler and Timesheet calendars with drag-and-drop shift booking, staff availability, shift types, day/night and split/sleepover rates, shift buffers and conflict warnings.',
          'Delivered client invoicing features: manual invoice lines, credit notes, partial payments and invoice recalculation, plus bulk pay-band and rate updates and a copy-client-settings tool with history.',
          'Built report screens with filters and Excel/PDF downloads (staff data, staff payments, compliance, DBS, shift booking).',
          'Implemented the real-time staff–admin chat interface and live progress updates with Ably.',
          'Refactored React code into reusable hooks, decreasing duplication by 40%, and managed state with MobX.',
          'Contributed 2,000+ commits to the React codebase, resolving ticketed bugs and feature requests across the Scheduler, client manager, staff manager, settings, recruitment and reporting modules.',
        ],
      },
      {
        name: '20x – Dom Care',
        blurb: 'A digital timesheet solution for home care providers.',
        bullets: [
          'Developed a digital timesheet calendar for home care providers, displaying shifts in an easy-to-read 24-hour view.',
          'Built the visit scheduler with drag-and-drop visit planning and Google Maps staff location.',
        ],
      },
    ],
  },
  {
    company: 'Balkrushna Technologies',
    title: 'Full Stack Developer',
    period: 'Feb 2022 – Nov 2023',
    short: '2022 — 2023',
    groups: [
      {
        name: 'Chatbot Widget System',
        blurb: 'A real-time messaging and support widget for web platforms.',
        bullets: [
          'Built a real-time chat system using Socket.io and developed backend APIs with Node.js and MySQL.',
          'Designed a simple, step-by-step setup for integrating chat into websites.',
        ],
      },
      {
        name: 'RBAC System (Role-Based Access Control)',
        blurb: 'A secure CRM with user and role-based permission management.',
        bullets: [
          'Developed a secure CRM with React, Node.js, and MySQL, implementing JWT for role-based access control.',
          'Streamlined user and role management, enhancing security and user experience through dynamic interface updates.',
        ],
      },
      {
        name: 'Blockchain System',
        blurb: 'A visualization tool for blockchain member structures.',
        bullets: ['Developed a dynamic tree view for blockchain member hierarchies, with auto-updating data.'],
      },
    ],
  },
]

function ModuleExplorer() {
  const [active, setActive] = useState<number>(0)
  return (
    <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-white/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
      <p className="font-mono-strict text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
        Modules I worked on — tap one
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {modules.map((m, i) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
              active === i
                ? 'border-transparent bg-gradient-to-r from-violet-600 to-emerald-500 text-white shadow-md'
                : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-violet-400/50 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300'
            }`}
          >
            {(() => {
              const Icon = moduleIcons[m.name]
              return Icon ? <Icon className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px" strokeWidth={2} /> : null
            })()}
            {m.name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="mt-4 min-h-[3.5rem] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          {modules[active].text}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

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
          subtitle="Production features, shipped and maintained: ownership, iteration and measurable outcomes."
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
                  <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">{role.title}</p>
                  <p className="mt-2 font-mono-strict text-sm text-zinc-500">{role.period}</p>
                </div>
              </div>
              <div className="space-y-10 lg:col-span-8">
                {role.groups.map((g) => (
                  <div key={g.name}>
                    <h4 className="text-base font-semibold text-zinc-900 dark:text-white">{g.name}</h4>
                    {g.blurb && <p className="mt-1 text-sm italic text-zinc-500">{g.blurb}</p>}
                    <ul className="mt-4 space-y-3">
                      {g.bullets.map((b) => (
                        <li
                          key={b}
                          className="group flex gap-4 rounded-xl border border-transparent bg-zinc-50/50 px-4 py-3 transition-colors hover:border-zinc-200/80 dark:bg-zinc-900/30 dark:hover:border-zinc-800"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-emerald-400"
                            aria-hidden
                          />
                          <span className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {role.explorer && <ModuleExplorer />}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
