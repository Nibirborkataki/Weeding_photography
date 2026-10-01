import SplitReveal from '../motion/SplitReveal'
import Reveal from '../motion/Reveal'
import ParallaxImage from '../motion/ParallaxImage'
import styles from './PageHeader.module.css'

/** Top-of-page header used by inner pages. */
export default function PageHeader({ eyebrow, title, intro, image, children }) {
  return (
    <header className={`${styles.header} ${image ? styles.withImage : ''}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <Reveal immediate delay={0.35}>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <SplitReveal as="h1" immediate delay={0.45} className="display-lg">
            {title}
          </SplitReveal>
          {(intro || children) && (
            <Reveal immediate delay={0.75} className={styles.extra}>
              {intro && <p className="lead">{intro}</p>}
              {children}
            </Reveal>
          )}
        </div>
        {image && <ParallaxImage className={styles.image} {...image} eager />}
      </div>
    </header>
  )
}
