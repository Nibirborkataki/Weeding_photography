import { useId, useState } from 'react'
import styles from './Accordion.module.css'

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  const baseId = useId()

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        return (
          <div key={item.q} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <h3>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} className={styles.panel} role="region" aria-hidden={!isOpen}>
              <div className={styles.panelInner}>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
