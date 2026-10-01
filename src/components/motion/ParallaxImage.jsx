import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { useIntroDone } from '../../context/IntroContext'
import styles from './ParallaxImage.module.css'

/** Image that drifts inside its frame on scroll and wipes in when first seen. */
export default function ParallaxImage({ src, alt, className = '', speed = 8, reveal = true, loading = 'lazy', eager = false }) {
  const ref = useRef(null)
  const introDone = useIntroDone()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const img = ref.current.querySelector('img')
      gsap.fromTo(
        img,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
      if (reveal && introDone) {
        gsap.fromTo(
          ref.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          },
        )
      }
    },
    { dependencies: [introDone], scope: ref, revertOnUpdate: true },
  )

  return (
    <div ref={ref} className={`${styles.frame} ${className}`}>
      <img src={src} alt={alt} loading={eager ? 'eager' : loading} decoding="async" />
    </div>
  )
}
