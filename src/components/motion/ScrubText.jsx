import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/gsap'

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export default function ScrubText({ as: Tag = 'p', children, className }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const split = SplitText.create(ref.current, { type: 'words' })
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 50%', scrub: true },
        },
      )
      return () => split.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
