import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Typewriter({ phrases }: { phrases: readonly string[] }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [text, setText] = useState(reduce ? phrases[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return
    const full = phrases[i]
    let t: ReturnType<typeof setTimeout>
    if (!deleting && text === full) {
      t = setTimeout(() => setDeleting(true), 1700)
    } else if (deleting && text === '') {
      t = setTimeout(() => {
        setDeleting(false)
        setI((n) => (n + 1) % phrases.length)
      }, 250)
    } else {
      t = setTimeout(
        () => setText(full.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 28 : 55,
      )
    }
    return () => clearTimeout(t)
  }, [text, deleting, i, phrases, reduce])

  return (
    <span aria-label={phrases[i]}>
      {text}
      {!reduce && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-pulse bg-emerald-500 dark:bg-emerald-400"
        />
      )}
    </span>
  )
}
