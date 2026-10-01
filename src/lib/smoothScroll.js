import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenis = null
let lockCount = 0

/** Starts Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {}

  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  if (lockCount > 0) lenis.stop()

  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTop() {
  lenis?.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)
}

/** Smoothly scrolls to a y position (number) or an element. */
export function smoothScrollTo(target, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset })
    return
  }
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

/** Reference-counted scroll lock (loader, mobile menu, lightbox). */
export function lockScroll() {
  lockCount++
  lenis?.stop()
  document.documentElement.classList.add('scroll-locked')
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount > 0) return
  lenis?.start()
  document.documentElement.classList.remove('scroll-locked')
}
