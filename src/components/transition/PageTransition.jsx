import { createContext, useCallback, useContext, useLayoutEffect, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'
import { scrollToTop, smoothScrollTo } from '../../lib/smoothScroll'
import { site } from '../../config/site'
import styles from './PageTransition.module.css'

const TransitionContext = createContext(null)

/**
 * Curtain transition between routes: the panel wipes up over the old page,
 * the route changes underneath, then the panel continues up to reveal it.
 */
export function TransitionProvider({ children }) {
  const overlayRef = useRef(null)
  const busy = useRef(false)
  const navigate = useNavigate()
  const location = useLocation()

  const go = useCallback(
    (to, options) => {
      if (busy.current) return
      const target = typeof to === 'string' ? to : `${to.pathname ?? ''}${to.search ?? ''}`
      if (target === location.pathname + location.search) {
        smoothScrollTo(0)
        return
      }
      // Same page, different section (e.g. "/services#commercial" from the footer): no curtain.
      if (target.includes('#') && target.split('#')[0] === location.pathname) {
        navigate(to, options)
        return
      }
      if (prefersReducedMotion()) {
        navigate(to, options)
        return
      }
      busy.current = true
      const overlay = overlayRef.current
      gsap
        .timeline({ onComplete: () => (busy.current = false) })
        .set(overlay, { visibility: 'visible', yPercent: 100 })
        .to(overlay, { yPercent: 0, duration: 0.7, ease: 'power4.inOut' })
        .from(overlay.firstChild, { yPercent: 40, autoAlpha: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .add(() => {
          scrollToTop()
          navigate(to, options)
        })
        .to(overlay, { yPercent: -100, duration: 0.85, ease: 'power4.inOut', delay: 0.25 })
        .set(overlay, { visibility: 'hidden' })
    },
    [location.pathname, location.search, navigate],
  )

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
        <img className={styles.mark} src={site.logo} alt="" />
      </div>
    </TransitionContext.Provider>
  )
}

export const usePageTransition = () => useContext(TransitionContext)

/** Resets scroll on every route change (incl. back/forward) before new ScrollTriggers measure. */
export function ScrollReset() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    scrollToTop()
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])
  return null
}

/** NavLink that plays the curtain transition on normal left-clicks. */
export function TransitionLink({ to, onClick, children, ...rest }) {
  const go = usePageTransition()
  const handleClick = (event) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      rest.target === '_blank'
    ) {
      return
    }
    event.preventDefault()
    go(to)
  }
  return (
    <NavLink to={to} onClick={handleClick} {...rest}>
      {children}
    </NavLink>
  )
}
