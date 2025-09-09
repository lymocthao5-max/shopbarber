import React from 'react';
import { LanguageProvider } from '@/components/MultiLanguageSupport';
import Header from '@/components/Header';
import PremiumHeroSection from '@/components/PremiumHeroSection';
import InteractiveServicesSection from '@/components/InteractiveServicesSection';
import PremiumGallerySection from '@/components/PremiumGallerySection';
import AIStyleRecommendation from '@/components/AIStyleRecommendation';
import PremiumBookingSection from '@/components/PremiumBookingSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import CustomerReviewSystem from '@/components/CustomerReviewSystem';
import LoyaltyProgram from '@/components/LoyaltyProgram';
import LiveChatSupport from '@/components/LiveChatSupport';

export default function EnterpriseIndex() {
  return (
    <LanguageProvider>
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
          <section id="loyalty">
            <LoyaltyProgram />
          </section>
          <section id="reviews">
            <CustomerReviewSystem />
          </section>
          <section id="booking">
            <PremiumBookingSection />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </main>
        <LiveChatSupport />
      </div>
    </LanguageProvider>
  );
}