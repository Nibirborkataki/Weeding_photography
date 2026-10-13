import { site } from '../../config/site'
import styles from './Wordmark.module.css'

/** Text version of the logo: "PRISM SNAP" over "STUDIO", set in the logo's didone caps. */
export default function Wordmark({ size = 'md', className = '' }) {
  return (
    <span className={`${styles.wordmark} ${styles[size]} ${className}`}>
      <span className={styles.name}>{site.name}</span>
      <span className={styles.sub}>Studio</span>
    </span>
  )
}
