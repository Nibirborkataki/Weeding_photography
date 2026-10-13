import { navLinks, site } from '../../config/site'
import { services } from '../../data/services'
import { smoothScrollTo } from '../../lib/smoothScroll'
import { TransitionLink } from '../transition/PageTransition'
import SplitReveal from '../motion/SplitReveal'
import { ArrowRight } from '../ui/Icons'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={`section--dark ${styles.footer}`}>
      <div className="container">
        <div className={styles.top}>
          <SplitReveal as="h2" className="display-lg">
            Let’s tell <em>your</em> story.
          </SplitReveal>
          <TransitionLink to="/booking" className="btn btn--light">
            Book your date <ArrowRight />
          </TransitionLink>
        </div>

        <div className={styles.grid}>
          <div className={styles.about}>
            <p>
              Wedding photography at heart — plus family ceremonies, portraits and commercial work, all told
              beautifully. {site.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className={styles.heading}>Explore</h3>
            <ul className={styles.list}>
              {navLinks.map((l) => (
                <li key={l.to}>
                  <TransitionLink to={l.to} end={l.to === '/'}>
                    {l.label}
                  </TransitionLink>
                </li>
              ))}
              <li>
                <TransitionLink to="/booking">Booking</TransitionLink>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className={styles.heading}>Services</h3>
            <ul className={styles.list}>
              {services.map((s) => (
                <li key={s.id}>
                  <TransitionLink to={`/services#${s.id}`}>{s.name}</TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.heading}>Studio</h3>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              </li>
              <li className={styles.plain}>{site.hours}</li>
            </ul>
          </div>

          <div>
            <h3 className={styles.heading}>Follow</h3>
            <ul className={styles.list}>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Each letter fills with gold while hovered, then fades back slowly. */}
        <p className={styles.wordmark} aria-hidden="true">
          {site.name.split('').map((ch, i) =>
            ch === ' ' ? (
              <span key={i}> </span>
            ) : (
              <span key={i} className={styles.letter}>
                {ch}
              </span>
            ),
          )}
        </p>

        <div className={styles.bottom}>
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          <p>Placeholder imagery courtesy of Unsplash.</p>
          <button type="button" className={styles.toTop} onClick={() => smoothScrollTo(0)}>
            Back to top ↑
          </button>
        </div>

        <p className={styles.credit}>
          Designed &amp; developed by{' '}
          <a href="https://nibir-portfolio-pi.vercel.app/" target="_blank" rel="noopener noreferrer">
            Nibir Borkataki <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </footer>
  )
}
