import { motion } from 'framer-motion'
import { Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { SectionHeading } from './SectionHeading'

const EMAIL = 'harshilraval2015@gmail.com'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  const [copied, setCopied] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setStatus('sent')
    form.reset()
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          kicker="Contact"
          title="Let’s start a conversation"
          subtitle="Tell me about the role, stack, or problem space—I'll respond as soon as I can."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-4 lg:col-span-5"
          >
            <div className="rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white/90 to-zinc-50/80 p-6 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:from-zinc-900/80 dark:to-zinc-950/80">
              <p className="font-mono-strict text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                Direct
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200/60 bg-white/80 px-4 py-3 transition-colors hover:border-emerald-500/40 dark:border-zinc-700 dark:bg-zinc-950/50 dark:hover:border-emerald-500/35">
                  <Mail className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <a
                    href={`mailto:${EMAIL}`}
                    className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                  >
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={() => void copyEmail()}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-zinc-200 px-2 py-1 font-mono-strict text-[10px] font-semibold uppercase tracking-wide text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <a
                  href="tel:+919737248676"
                  className="flex items-center gap-3 rounded-xl border border-zinc-200/60 bg-white/80 px-4 py-3 text-sm font-medium transition-colors hover:border-violet-400/40 dark:border-zinc-700 dark:bg-zinc-950/50"
                >
                  <Phone className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                  +91-9737248676
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white/60 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900/40">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Location & time
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Remote-friendly · IST
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.05 }}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-black/40 lg:col-span-7"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-1">
                <span className="mb-1.5 block font-mono-strict text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Name
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 outline-none ring-violet-500/0 transition-all placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/12 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-100 dark:focus:bg-zinc-950"
                />
              </label>
              <label className="sm:col-span-1">
                <span className="mb-1.5 block font-mono-strict text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 outline-none ring-violet-500/0 transition-all placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/12 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-100 dark:focus:bg-zinc-950"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-1.5 block font-mono-strict text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Role, timeline, tech stack, or links…"
                  className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 outline-none ring-violet-500/0 transition-all placeholder:text-zinc-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/12 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-100 dark:focus:bg-zinc-950"
                />
              </label>
            </div>
            <div className="relative mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                <Send className="h-4 w-4" strokeWidth={1.75} />
                Send message
              </button>
              {status === 'sent' ? (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Opening your mail client…
                </p>
              ) : null}
            </div>
            <p className="relative mt-4 font-mono-strict text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-600">
              Uses mailto with a pre-filled message. Swap for Formspree, Resend, or your API on
              deploy.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
