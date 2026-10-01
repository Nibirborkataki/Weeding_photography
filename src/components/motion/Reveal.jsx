import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useIntroDone } from '../../context/IntroContext'

/**
 * Fades + lifts its direct children (or `targets` selector inside it) into view.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  className,
  targets,
  y = 36,
  stagger = 0.12,
  delay = 0,
  duration = 1.1,
  start = 'top 86%',
  immediate = false,
  ...rest
}) {
  const ref = useRef(null)
  const introDone = useIntroDone()

  useGSAP(
    () => {
      if (!introDone || prefersReducedMotion()) return
      const els = targets ?? ref.current.children
      gsap.from(els, {
        y,
        autoAlpha: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: immediate ? undefined : { trigger: ref.current, start, once: true },
      })
    },
    { dependencies: [introDone], scope: ref },
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
