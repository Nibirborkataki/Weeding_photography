import ParallaxImage from '../components/motion/ParallaxImage'
import SplitReveal from '../components/motion/SplitReveal'
import Reveal from '../components/motion/Reveal'
import { TransitionLink } from '../components/transition/PageTransition'
import { ArrowRight } from '../components/ui/Icons'
import { images } from '../data/images'
import { site } from '../config/site'
import styles from './BookingCTA.module.css'

export default function BookingCTA() {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <ParallaxImage className={styles.bg} {...images.bookingBand} reveal={false} speed={10} />
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container on-dark ${styles.content}`}>
        <p className="eyebrow">Limited dates</p>
        <SplitReveal as="h2" id="cta-title" className="display-lg">
          Now booking <em>{site.bookingYear}</em> weddings
        </SplitReveal>
        <Reveal className={styles.body}>
          <p className={styles.text}>
            We take on a limited number of celebrations each year, so every couple has our full attention — from the
            first call to the final album.
          </p>
          <div className={styles.actions}>
            <TransitionLink to="/booking" className="btn btn--light">
              Check availability <ArrowRight />
            </TransitionLink>
            <TransitionLink to="/contact" className="btn btn--outline-light">
              Ask a question
            </TransitionLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
