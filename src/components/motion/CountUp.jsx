import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

/** Number that counts up the first time it scrolls into view. */
export default function CountUp({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const formatter = new Intl.NumberFormat('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  const format = (n) => `${formatter.format(n)}${suffix}`

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const el = ref.current
      const counter = { n: 0 }
      el.textContent = format(0)
      gsap.to(counter, {
        n: value,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = format(counter.n)
        },
      })
    },
    { scope: ref, dependencies: [value] },
  )

  return <span ref={ref}>{format(value)}</span>
}
