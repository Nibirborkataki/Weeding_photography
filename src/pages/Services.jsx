import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/motion/Reveal'
import SplitReveal from '../components/motion/SplitReveal'
import ParallaxImage from '../components/motion/ParallaxImage'
import PackageCard from '../components/PackageCard'
import Accordion from '../components/ui/Accordion'
import BookingCTA from '../sections/BookingCTA'
import { TransitionLink } from '../components/transition/PageTransition'
import { ArrowRight, Check } from '../components/ui/Icons'
import { services, getService, serviceLabel } from '../data/services'
import { addOns, includedWithEvery, packagesFor } from '../data/packages'
import { faqs } from '../data/content'
import { formatPrice } from '../config/site'
import { smoothScrollTo } from '../lib/smoothScroll'
import { usePageTitle } from '../hooks/usePageTitle'
import styles from './Services.module.css'

function scrollToService(id) {
  const el = document.getElementById(id)
  if (el) smoothScrollTo(el, 0)
}

function ServiceSection({ service, index }) {
  const reversed = index % 2 === 1
  return (
    <section id={service.id} className={`section ${reversed ? 'section--alt' : ''}`}>
      <div className="container">
        <div className={`${styles.intro} ${reversed ? styles.reversed : ''}`}>
          <ParallaxImage className={styles.image} {...service.image} />
          <div className={styles.text}>
            <p className="eyebrow">
              0{index + 1} · {service.eyebrow}
            </p>
            <SplitReveal as="h2" className="display-md">
              {service.name}
            </SplitReveal>
            <Reveal className={styles.copy} stagger={0.08}>
              <p className={styles.tagline}>{service.tagline}</p>
              <p className="lead">{service.description}</p>
              <ul className={styles.highlights}>
                {service.highlights.map((h) => (
                  <li key={h}>
                    <Check size={16} /> {h}
                  </li>
                ))}
              </ul>
              <div className={styles.actions}>
                <TransitionLink to={`/booking?service=${service.id}`} className="btn">
                  Book {serviceLabel(service).toLowerCase()} <ArrowRight />
                </TransitionLink>
                <TransitionLink to={`/portfolio?category=${service.portfolioCategory}`} className="link-arrow">
                  See the work <ArrowRight />
                </TransitionLink>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className={styles.packages} stagger={0.12}>
          {packagesFor(service.id).map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default function Services() {
  usePageTitle('Services & Pricing')
  const { hash } = useLocation()

  // Arriving from a "/services#ceremonies" link: glide to that section once the page is in.
  useEffect(() => {
    const id = hash.replace('#', '')
    if (!getService(id)) return
    const timer = setTimeout(() => scrollToService(id), 700)
    return () => clearTimeout(timer)
  }, [hash])

  return (
    <>
      <PageHeader
        eyebrow="Services & pricing"
        title={
          <>
            Photography for every <em>chapter</em>
          </>
        }
        intro="Weddings are our specialty. We also photograph the family ceremonies, portraits and brand stories that matter just as much — each with clear, honest pricing."
        aside={
          <Reveal as="nav" immediate delay={0.6} stagger={0.1} className={styles.mosaic} aria-label="Jump to a service">
            {services.map((s, i) => (
              <button key={s.id} type="button" className={styles.tile} onClick={() => scrollToService(s.id)}>
                <img src={s.image.src} alt="" loading={i < 2 ? 'eager' : 'lazy'} />
                <span className={styles.tileLabel}>
                  <span>0{i + 1}</span>
                  {serviceLabel(s)}
                </span>
              </button>
            ))}
          </Reveal>
        }
      />

      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      <section className="section section--alt">
        <div className={`container ${styles.extras}`}>
          <div>
            <SectionHeading
              align="stack"
              eyebrow="Always included"
              title={
                <>
                  With <em>every</em> booking
                </>
              }
            />
            <Reveal as="ul" className={styles.included} stagger={0.08}>
              {includedWithEvery.map((item) => (
                <li key={item}>
                  <Check /> {item}
                </li>
              ))}
            </Reveal>
          </div>
          <div>
            <SectionHeading
              align="stack"
              eyebrow="Add-ons"
              title={
                <>
                  Make it <em>yours</em>
                </>
              }
            />
            <Reveal as="ul" className={styles.addons} stagger={0.06}>
              {addOns.map((a) => (
                <li key={a.id}>
                  <span className={styles.addonName}>
                    {a.name}
                    <small>{a.services.map((id) => serviceLabel(getService(id))).join(' · ')}</small>
                  </span>
                  <span className={styles.dots} aria-hidden="true" />
                  <strong>{formatPrice(a.price)}</strong>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.faq}`}>
          <SectionHeading
            align="stack"
            eyebrow="FAQ"
            title={
              <>
                Questions, <em>answered</em>
              </>
            }
            intro="Can’t find what you’re looking for? Send us a note — we reply within a day."
          />
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <BookingCTA />
    </>
  )
}
