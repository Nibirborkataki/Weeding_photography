import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useIntroDone } from '../../context/IntroContext'

/**
 * Heading whose lines slide up from behind a mask.
 * `immediate` plays on mount (after the intro); otherwise it plays on scroll.
 */
export default function SplitReveal({
  as: Tag = 'h2',
  children,
  className,
  delay = 0,
  stagger = 0.12,
  duration = 1.25,
  immediate = false,
  ...rest
}) {
  const ref = useRef(null)
  const introDone = useIntroDone()

  useGSAP(
    () => {
      if (!introDone || prefersReducedMotion()) return
      const split = SplitText.create(ref.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration,
            stagger,
            delay,
            ease: 'power4.out',
            scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 88%', once: true },
          }),
      })
      return () => split.revert()
    },
    { dependencies: [introDone], scope: ref },
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
