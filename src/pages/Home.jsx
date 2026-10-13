import Hero from '../sections/home/Hero'
import Intro from '../sections/home/Intro'
import ServicesOverview from '../sections/home/ServicesOverview'
import AcademyTeaser from '../sections/home/AcademyTeaser'
import FeaturedStories from '../sections/home/FeaturedStories'
import Process from '../sections/home/Process'
import Testimonials from '../sections/home/Testimonials'
import ReviewSection from '../sections/ReviewSection'
import BookingCTA from '../sections/BookingCTA'
import Marquee from '../components/ui/Marquee'
import { useReviews } from '../hooks/useReviews'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Home() {
  usePageTitle()
  const { reviews, add } = useReviews()

  return (
    <>
      <Hero />
      <Intro />
      <ServicesOverview />
      <AcademyTeaser />
      <FeaturedStories />
      <Marquee words={['Weddings', 'Rituals', 'Portraits', 'Campaigns']} />
      <Process />
      <Testimonials reviews={reviews} />
      <ReviewSection reviews={reviews} onSubmit={add} />
      <BookingCTA />
    </>
  )
}
