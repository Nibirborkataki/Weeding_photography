import SplitReveal from '../components/motion/SplitReveal'
import Reveal from '../components/motion/Reveal'
import { TransitionLink } from '../components/transition/PageTransition'
import { ArrowRight } from '../components/ui/Icons'
import { images } from '../data/images'
import { usePageTitle } from '../hooks/usePageTitle'
import styles from './NotFound.module.css'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className={styles.page}>
      <img className={styles.bg} src={images.notFound.src} alt="" />
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container on-dark ${styles.content}`}>
        <p className="eyebrow">Error 404</p>
        <SplitReveal as="h1" immediate delay={0.4} className="display-lg">
          This aisle leads <em>nowhere</em>
        </SplitReveal>
        <Reveal immediate delay={0.7} className={styles.body}>
          <p>The page you’re looking for has wandered off. Let’s get you back to the celebration.</p>
          <div className={styles.actions}>
            <TransitionLink to="/" className="btn btn--light">
              Back to home <ArrowRight />
            </TransitionLink>
            <TransitionLink to="/portfolio" className="btn btn--outline-light">
              View portfolio
            </TransitionLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
