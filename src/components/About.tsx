import { motion } from 'framer-motion'
import { Code2, Gauge, Layers, Radio } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const highlights = [
  {
    icon: Layers,
    title: 'Full-stack integration',
    body: 'Cohesive features across frontend and backend—fewer handoffs, faster delivery.',
    span: 'sm:col-span-2 lg:col-span-2 lg:row-span-1',
  },
  {
    icon: Gauge,
    title: 'Performance & quality',
    body: 'Clean architecture and measurable UX wins.',
    span: 'sm:col-span-1',
  },
  {
    icon: Radio,
    title: 'Real-time',
    body: 'Live data, sockets, and event-driven UIs.',
    span: 'sm:col-span-1',
  },
  {
    icon: Code2,
    title: '4+ years',
    body: 'Production web apps at scale.',
    span: 'sm:col-span-2 lg:col-span-2',
  },
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
          title="Reliable products, maintained with care"
          subtitle="I ship web applications with an emphasis on frontend and backend integration, performance, clean code, and real-time systems that stay maintainable as teams grow."
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
      </div>
    </section>
  )
}
