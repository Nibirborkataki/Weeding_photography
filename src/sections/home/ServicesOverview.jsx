import SectionHeading from '../../components/ui/SectionHeading'
import Reveal from '../../components/motion/Reveal'
import { TransitionLink } from '../../components/transition/PageTransition'
import { ArrowRight } from '../../components/ui/Icons'
import { services } from '../../data/services'
import { packagesFor } from '../../data/packages'
import { formatPrice } from '../../config/site'
import styles from './ServicesOverview.module.css'

/** Lowest fixed price across a service's packages, for the "from ₹…" label. */
function startingPrice(serviceId) {
  const prices = packagesFor(serviceId)
    .map((p) => p.price)
    .filter((p) => p != null)
  return prices.length ? Math.min(...prices) : null
}

export default function ServicesOverview() {
  return (
    <section className="section" aria-labelledby="services-overview-title">
      <div className="container">
        <SectionHeading
          id="services-overview-title"
          eyebrow="What we photograph"
          title={
            <>
              One studio, <em>every</em> milestone
            </>
          }
          intro="Weddings are our specialty — and the families, rituals and brands we meet along the way get exactly the same care."
          aside={
            <TransitionLink to="/services" className="link-arrow">
              All services &amp; pricing <ArrowRight />
            </TransitionLink>
          }
        />

        <Reveal className={styles.grid} stagger={0.12}>
          {services.map((service, i) => {
            const from = startingPrice(service.id)
            return (
              <TransitionLink
                key={service.id}
                to={`/services#${service.id}`}
                className={`${styles.card} ${service.flagship ? styles.flagship : ''}`}
              >
                <div className={styles.media}>
                  <img src={service.image.src} alt={service.image.alt} loading="lazy" decoding="async" />
                  {service.flagship && <span className={styles.badge}>{service.eyebrow}</span>}
                </div>
                <div className={styles.body}>
                  <span className={styles.index}>0{i + 1}</span>
                  <h3 className={styles.name}>{service.name}</h3>
                  <p className={styles.tagline}>{service.tagline}</p>
                  <ul className={styles.tags}>
                    {service.highlights.slice(0, service.flagship ? 4 : 3).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <span className={styles.footer}>
                    <span className={styles.price}>{from ? `From ${formatPrice(from)}` : 'Custom quotes'}</span>
                    <span className={styles.more}>
                      Explore <ArrowRight />
                    </span>
                  </span>
                </div>
              </TransitionLink>
            )
          })}
          <TransitionLink to="/contact" className={styles.ask}>
            <span className={styles.askEyebrow}>Something else?</span>
            <span className={styles.askTitle}>
              Birthdays, launches, corporate events — <em>tell us your occasion.</em>
            </span>
            <span className={styles.more}>
              Ask us <ArrowRight />
            </span>
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  )
}
