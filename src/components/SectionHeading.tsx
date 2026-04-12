import { motion } from 'framer-motion'

type SectionHeadingProps = {
  index: string
  kicker: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({
  index,
  kicker,
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono-strict text-xs font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
          {index}
        </span>
        <span
          className="h-px flex-1 max-w-16 bg-gradient-to-r from-zinc-300 to-transparent dark:from-zinc-600"
          aria-hidden
        />
        <span className="font-mono-strict text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
          {kicker}
        </span>
      </div>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15] dark:text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  )
}
