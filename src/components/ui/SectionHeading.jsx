import SplitReveal from '../motion/SplitReveal'
import Reveal from '../motion/Reveal'
import styles from './SectionHeading.module.css'

/** Eyebrow + split-reveal title + optional intro, with an optional right-hand slot. */
export default function SectionHeading({ eyebrow, title, intro, aside, align = 'split', id, size = 'display-md' }) {
  return (
    <div className={`${styles.heading} ${styles[align]}`}>
      <div className={styles.main}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <SplitReveal as="h2" id={id} className={size}>
          {title}
        </SplitReveal>
      </div>
      {(intro || aside) && (
        <Reveal className={styles.aside}>
          {intro && <p className="lead">{intro}</p>}
          {aside}
        </Reveal>
      )}
    </div>
  )
}
