import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 py-10 dark:border-zinc-800/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 sm:justify-start">
            <Logo className="h-6 w-6" />
            Harshil Raval
          </p>
          <p className="mt-1 font-mono-strict text-xs text-zinc-500 dark:text-zinc-600">
            © {new Date().getFullYear()} · Built with React, Tailwind & Motion · Press Ctrl/⌘ K to navigate
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-emerald-500" />
          <a
            href="#top"
            className="font-mono-strict text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-300"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
