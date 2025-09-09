import React from 'react';
import Header from '@/components/Header';
import PremiumHeroSection from '@/components/PremiumHeroSection';
import InteractiveServicesSection from '@/components/InteractiveServicesSection';
import PremiumGallerySection from '@/components/PremiumGallerySection';
import AIStyleRecommendation from '@/components/AIStyleRecommendation';
import PremiumBookingSection from '@/components/PremiumBookingSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function PremiumIndex() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <section id="home">
          <PremiumHeroSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="services">
          <InteractiveServicesSection />
        </section>
        <section id="ai-styling">
          <AIStyleRecommendation />
        </section>
        <section id="gallery">
          <PremiumGallerySection />
        </section>
        <section id="booking">
          <PremiumBookingSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}