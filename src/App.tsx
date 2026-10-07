import { useEffect, useState } from 'react'
import { About } from './components/About'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { CursorAmbient } from './components/CursorAmbient'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { ShiftPlayground } from './components/ShiftPlayground'
import { Skills } from './components/Skills'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  const [palette, setPalette] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <ScrollProgress />
        <CursorAmbient />
        <div className="relative z-10">
          <Navbar onOpenPalette={() => setPalette(true)} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <ShiftPlayground />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
        <CommandPalette open={palette} onClose={() => setPalette(false)} />
      </div>
    </ThemeProvider>
  )
}
