import PageHeader from '../components/ui/PageHeader'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/motion/Reveal'
import PackageCard from '../components/PackageCard'
import Accordion from '../components/ui/Accordion'
import BookingCTA from '../sections/BookingCTA'
import { Check } from '../components/ui/Icons'
import { addOns, includedWithEvery, packages } from '../data/packages'
import { faqs } from '../data/content'
import { images } from '../data/images'
import { formatPrice } from '../config/site'
import { usePageTitle } from '../hooks/usePageTitle'
import styles from './Services.module.css'

export default function Services() {
  usePageTitle('Services & Pricing')

  return (
    <>
      <PageHeader
        eyebrow="Services & pricing"
        title={
          <>
            Collections for every <em>kind</em> of love
          </>
        }
        intro="Whether it’s thirty guests on a cliff or three days of rituals, every collection is built around your story — and every one can be tailored."
        image={images.servicesHeader}
      />

      <section className="section">
        <div className="container">
          <Reveal className={styles.packages} stagger={0.15}>
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className={`container ${styles.extras}`}>
          <div>
            <SectionHeading
              align="stack"
              eyebrow="Always included"
              title={
                <>
                  With <em>every</em> collection
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
            <Reveal as="ul" className={styles.addons} stagger={0.08}>
              {addOns.map((a) => (
                <li key={a.id}>
                  <span>{a.name}</span>
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
