import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import SectionHeading from '../../components/ui/SectionHeading'
import { processSteps } from '../../data/content'
import styles from './Process.module.css'

export default function Process() {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // --progress drives scaleX on desktop and scaleY on the vertical mobile rail.
      gsap.fromTo(
        `.${styles.railFill}`,
        { '--progress': 0 },
        { '--progress': 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 60%', scrub: true } },
      )
      gsap.from(`.${styles.step}`, {
        y: 40,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From first hello <br />
              to <em>forever</em>
            </>
          }
          intro="A calm, well-planned process so that on the day, all you have to do is be present."
        />
        <div ref={ref} className={styles.steps}>
          <div className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} />
          </div>
          {processSteps.map((step, i) => (
            <article key={step.title} className={styles.step}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.num}>0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
