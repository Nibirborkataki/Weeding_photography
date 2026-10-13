import { formatPackagePrice } from '../config/site'
import { TransitionLink } from './transition/PageTransition'
import { Check } from './ui/Icons'
import styles from './PackageCard.module.css'

export default function PackageCard({ pkg, index, compact = false }) {
  const features = compact ? pkg.features.slice(0, 4) : pkg.features
  return (
    <article className={`${styles.card} ${pkg.featured ? styles.featured : ''}`}>
      <div className={styles.top}>
        <span className={styles.index}>0{index + 1}</span>
        {pkg.featured && <span className={styles.badge}>Most loved</span>}
      </div>
      <h3 className={styles.name}>{pkg.name}</h3>
      <p className={styles.tagline}>{pkg.tagline}</p>
      <p className={styles.price}>
        {pkg.price != null && <span>from</span>} {formatPackagePrice(pkg.price)}
      </p>
      <p className={styles.coverage}>{pkg.coverage}</p>
      <ul className={styles.features}>
        {features.map((f) => (
          <li key={f}>
            <Check size={16} /> {f}
          </li>
        ))}
      </ul>
      <TransitionLink
        to={`/booking?package=${pkg.id}`}
        className={`btn btn--block ${pkg.featured ? 'btn--light' : 'btn--ghost'}`}
      >
        {pkg.price == null ? 'Request a quote' : `Choose ${pkg.name}`}
      </TransitionLink>
    </article>
  )
}
