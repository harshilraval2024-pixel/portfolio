import { motion } from 'framer-motion'
import { CalendarClock, GraduationCap, Layers, Radio, Receipt } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const highlights = [
  {
    icon: Layers,
    title: 'Frontend architecture',
    body: 'React, TypeScript and MobX with reusable hooks and shared components, cutting duplication by about 40% in a large codebase.',
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    icon: CalendarClock,
    title: 'Scheduling & calendars',
    body: 'Drag-and-drop booking, availability, shift types and conflict warnings.',
    span: 'sm:col-span-1',
  },
  {
    icon: Radio,
    title: 'Real-time interfaces',
    body: 'Live updates and chat with Ably and Socket.io.',
    span: 'sm:col-span-1',
  },
  {
    icon: Receipt,
    title: 'Business workflows',
    body: 'Invoicing, credit notes, pay rates and exportable reports for care agencies.',
    span: 'sm:col-span-2 lg:col-span-4',
  },
] as const

const education = [
  { school: 'Sigma Institute of Engineering', degree: 'Bachelor of Information Technology', years: '2019 – 2022', score: 'CGPA 8.17' },
  { school: 'Government Polytechnic Gandhinagar', degree: 'Diploma in Information Technology', years: '2016 – 2019', score: 'CGPA 7.76' },
] as const

export function About() {
  return (
    <section
      id="about"
      className="border-b border-zinc-200/60 py-20 dark:border-zinc-800/60 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          kicker="About"
          title="Interfaces that stay fast as products grow"
          subtitle="4+ years building production web applications with React, TypeScript, Node.js and MySQL. For the last three years I have built the frontend of a multi-tenant workforce platform for care agencies."
        />

        <div className="mt-14 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon
            return (
              <motion.article
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: 0.05 * i }}
                whileHover={{ y: -2 }}
                className={`group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:shadow-black/30 ${h.span}`}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/10 to-emerald-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 text-violet-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-violet-400">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="relative mt-4 text-base font-semibold text-zinc-900 dark:text-white">
                  {h.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {h.body}
                </p>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:gap-4">
          {education.map((e, i) => (
            <motion.div
              key={e.school}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i }}
              className="flex items-start gap-4 rounded-2xl border border-zinc-200/80 bg-white/60 p-5 dark:border-zinc-800/80 dark:bg-zinc-900/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">{e.degree}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{e.school}</p>
                <p className="mt-1 font-mono-strict text-xs text-zinc-500">
                  {e.years} · {e.score}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
