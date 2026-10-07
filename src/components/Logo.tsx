import { useId } from 'react'

/** The HR monogram, identical to public/favicon.svg. */
export function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Harshil Raval logo">
      <defs>
        <linearGradient id={id} x1="6" y1="4" x2="58" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="0.52" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id})`} />
      <g fill="none" stroke="#fff" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18v28M28 18v28M14 32h14" />
        <path d="M37 46V18h6.5a7.2 7.2 0 0 1 0 14H37M44 32l7.5 14" />
      </g>
    </svg>
  )
}
