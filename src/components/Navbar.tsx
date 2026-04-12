import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-[padding,background] duration-300 ${
        scrolled ? 'py-2' : 'py-3 sm:py-4'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group relative z-10 flex shrink-0 items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-semibold tracking-tight text-zinc-900 transition-colors dark:text-zinc-50"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-zinc-900 text-xs font-bold text-white ring-2 ring-white/20 dark:bg-white dark:text-zinc-900 dark:ring-zinc-800">
            <span className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-violet-500/30 opacity-0 transition-opacity group-hover:opacity-100 dark:from-emerald-400/20 dark:to-violet-500/20" />
            <span className="relative">HR</span>
          </span>
          <span className="hidden font-medium sm:inline">Harshil Raval</span>
        </a>

        <div
          className={`hidden items-center gap-1 rounded-full border px-1.5 py-1 shadow-sm backdrop-blur-xl md:flex ${
            scrolled
              ? 'border-zinc-200/90 bg-white/90 dark:border-zinc-700/90 dark:bg-zinc-900/90'
              : 'border-zinc-200/70 bg-white/70 dark:border-zinc-800/70 dark:bg-zinc-950/60'
          }`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white/90 text-zinc-700 shadow-sm backdrop-blur transition-all hover:border-emerald-500/40 hover:text-emerald-700 dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-emerald-400/30 dark:hover:text-emerald-300"
          >
            {theme === 'dark' ? (
              <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            )}
          </button>

          <button
            type="button"
            className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white/90 text-zinc-800 shadow-sm backdrop-blur transition-all hover:border-zinc-300 md:hidden dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:text-zinc-200"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-b border-zinc-200/80 bg-white/95 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95 md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-4 sm:px-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3 font-mono-strict text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    <span className="text-zinc-400 dark:text-zinc-600">/</span> {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
