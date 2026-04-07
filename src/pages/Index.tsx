import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MarqueeBar from '@/components/MarqueeBar';
import RitualsSection from '@/components/RitualsSection';
import AboutSection from '@/components/AboutSection';
import MastersSection from '@/components/MastersSection';
import ReviewsSection from '@/components/ReviewsSection';
import BookingSection from '@/components/BookingSection';
import FaqSection from '@/components/FaqSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--dark)' }}>
      <Navbar />
      <HeroSection />
      <MarqueeBar />
      <RitualsSection />
      <AboutSection />
      <MastersSection />
      <ReviewsSection />
      <BookingSection />
      <FaqSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
