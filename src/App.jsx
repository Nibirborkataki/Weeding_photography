import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ScrollTrigger } from './lib/gsap'
import { initSmoothScroll } from './lib/smoothScroll'
import { IntroContext } from './context/IntroContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ScrollReset, TransitionProvider } from './components/transition/PageTransition'
import Loader from './components/loader/Loader'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Academy from './pages/Academy'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import About from './pages/About'
import Reviews from './pages/Reviews'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => initSmoothScroll(), [])

  // Late-loading fonts, images or content change the page height — re-measure scroll animations.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    let lastHeight = document.body.offsetHeight
    let timer
    const observer = new ResizeObserver(() => {
      const height = document.body.offsetHeight
      if (Math.abs(height - lastHeight) < 2) return
      lastHeight = height
      clearTimeout(timer)
      timer = setTimeout(refresh, 250)
    })
    observer.observe(document.body)

    return () => {
      window.removeEventListener('load', refresh)
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <IntroContext.Provider value={introDone}>
      <AuthProvider>
        <ToastProvider>
          {showLoader && <Loader onReveal={() => setIntroDone(true)} onComplete={() => setShowLoader(false)} />}
          <TransitionProvider>
            <ScrollReset />
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="academy" element={<Academy />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="services" element={<Services />} />
                <Route path="about" element={<About />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="booking" element={<Booking />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Routes>
          </TransitionProvider>
        </ToastProvider>
      </AuthProvider>
    </IntroContext.Provider>
  )
}
