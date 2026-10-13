import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'
import { lockScroll, unlockScroll } from '../../lib/smoothScroll'
import { navLinks, site } from '../../config/site'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { useIntroDone } from '../../context/IntroContext'
import { TransitionLink } from '../transition/PageTransition'
import { ArrowRight } from '../ui/Icons'
import Wordmark from '../ui/Wordmark'
import styles from './Navbar.module.css'

function UserMenu({ user, onSignOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className={styles.userMenu}>
      <button
        type="button"
        className={styles.avatarBtn}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.avatar} aria-hidden="true">
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span className={styles.userName}>{user.name.split(' ')[0]}</span>
      </button>
      {open && (
        <div className={styles.dropdown} role="menu">
          <p className={styles.dropdownMeta}>
            Signed in as
            <strong>{user.email}</strong>
            {user.provider === 'google' && <span className={styles.providerTag}>Google · demo</span>}
          </p>
          <TransitionLink to="/booking" role="menuitem" className={styles.dropdownItem} onClick={() => setOpen(false)}>
            Book a date
          </TransitionLink>
          <button type="button" role="menuitem" className={styles.dropdownItem} onClick={onSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { user, signOut } = useAuth()
  const toast = useToast()
  const introDone = useIntroDone()
  const { pathname } = useLocation()
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Solid background once scrolled; hide on scroll down, show on scroll up.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 480 && y > lastY + 2)
      if (y < lastY - 2) setHidden(false)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    lockScroll()
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Animate the inner bar: the header itself uses a CSS transform for hide-on-scroll.
  useGSAP(
    () => {
      if (!introDone || prefersReducedMotion()) return
      gsap.from(headerRef.current.firstChild, {
        y: -40,
        autoAlpha: 0,
        duration: 1.2,
        delay: 0.7,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
      })
    },
    { dependencies: [introDone] },
  )

  useGSAP(
    () => {
      if (!menuOpen || prefersReducedMotion()) return
      gsap
        .timeline()
        .from(menuRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut' })
        .from(`.${styles.mobileLink}`, { yPercent: 110, duration: 0.9, stagger: 0.06, ease: 'power4.out' }, '-=0.35')
        .from(`.${styles.mobileFooter}`, { autoAlpha: 0, y: 16, duration: 0.6 }, '-=0.6')
    },
    { dependencies: [menuOpen], scope: menuRef },
  )

  const handleSignOut = async () => {
    await signOut()
    toast.info('You have been signed out.')
  }

  const headerClass = [
    styles.header,
    scrolled && styles.scrolled,
    hidden && !menuOpen && styles.hidden,
    menuOpen && styles.menuOpen,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <header ref={headerRef} className={headerClass}>
        <div className={`container ${styles.bar}`}>
          <TransitionLink to="/" className={styles.logo} aria-label={`${site.fullName} — home`}>
            <Wordmark />
          </TransitionLink>

          <nav className={styles.nav} aria-label="Main">
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <TransitionLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            {user ? (
              <UserMenu user={user} onSignOut={handleSignOut} />
            ) : (
              <TransitionLink to="/signin" className={styles.signIn}>
                Sign in
              </TransitionLink>
            )}
            <TransitionLink to="/booking" className={`btn ${styles.cta}`}>
              Book a date
            </TransitionLink>
            <button
              type="button"
              className={styles.burger}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div ref={menuRef} id="mobile-menu" className={styles.mobileMenu} data-lenis-prevent>
          <nav aria-label="Mobile">
            <ul className={styles.mobileList}>
              {[...navLinks, { to: '/booking', label: 'Book a date' }].map((link, i) => (
                <li key={link.to} className={styles.mobileItem}>
                  <TransitionLink to={link.to} end={link.to === '/'} className={styles.mobileLink}>
                    <span className={styles.mobileIndex}>0{i + 1}</span>
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.mobileFooter}>
            {user ? (
              <button type="button" className="link-arrow" onClick={handleSignOut}>
                Sign out ({user.name.split(' ')[0]})
              </button>
            ) : (
              <TransitionLink to="/signin" className="link-arrow">
                Sign in / Create account <ArrowRight />
              </TransitionLink>
            )}
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.phone}</span>
          </div>
        </div>
      )}
    </>
  )
}
