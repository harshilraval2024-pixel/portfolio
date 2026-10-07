import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Copy, Download, Moon, Search, Sun } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { profile, sections } from '../data/profile'

type Cmd = { id: string; label: string; hint: string; run: () => void; icon: typeof ArrowRight }

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { theme, toggleTheme } = useTheme()
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const cmds = useMemo<Cmd[]>(
    () => [
      ...sections.map((s) => ({
        id: s.id,
        label: `Go to ${s.label}`,
        hint: 'Navigate',
        icon: ArrowRight,
        run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      {
        id: 'resume',
        label: 'Download résumé (PDF)',
        hint: 'Action',
        icon: Download,
        run: () => window.open(profile.resume, '_blank'),
      },
      {
        id: 'copy',
        label: `Copy email · ${profile.email}`,
        hint: 'Action',
        icon: Copy,
        run: () => void navigator.clipboard?.writeText(profile.email),
      },
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        hint: 'Theme',
        icon: theme === 'dark' ? Sun : Moon,
        run: toggleTheme,
      },
    ],
    [theme, toggleTheme],
  )

  const results = useMemo(
    () => cmds.filter((c) => c.label.toLowerCase().includes(q.trim().toLowerCase())),
    [cmds, q],
  )

  useEffect(() => {
    if (open) {
      setQ('')
      setIdx(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setIdx(0), [q])

  const exec = (c?: Cmd) => {
    if (!c) return
    onClose()
    c.run()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-zinc-950/50 px-4 pt-[16vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3 border-b border-zinc-100 px-4 dark:border-zinc-800">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setIdx((i) => Math.min(i + 1, results.length - 1))
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setIdx((i) => Math.max(i - 1, 0))
                  } else if (e.key === 'Enter') exec(results[idx])
                  else if (e.key === 'Escape') onClose()
                }}
                placeholder="Jump to a section or run an action…"
                className="h-12 w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
              />
              <kbd className="rounded border border-zinc-200 px-1.5 py-0.5 font-mono-strict text-[10px] text-zinc-500 dark:border-zinc-700">
                esc
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-zinc-500">No matches</li>
              )}
              {results.map((c, i) => {
                const Icon = c.icon
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setIdx(i)}
                      onClick={() => exec(c)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        i === idx
                          ? 'bg-violet-500/10 text-violet-800 dark:text-violet-200'
                          : 'text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-70" />
                      <span className="flex-1 truncate">{c.label}</span>
                      <span className="font-mono-strict text-[10px] uppercase tracking-wider text-zinc-400">
                        {c.hint}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
