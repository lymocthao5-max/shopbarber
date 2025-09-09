import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from "@/components/ui/theme-provider";
import UXOptimizedHeader from '@/components/UXOptimizedHeader';
import PremiumHeroSection from '@/components/PremiumHeroSection';
import EnhancedAIStyleRecommendation from '@/components/EnhancedAIStyleRecommendation';
import AIChat from '@/components/AIChat';
import { ServiceCardSkeleton, GallerySkeleton, BookingFormSkeleton } from '@/components/AdvancedLoadingStates';

// Lazy load components for better performance
const InteractiveServicesSection = lazy(() => import('@/components/InteractiveServicesSection'));
const PremiumGallerySection = lazy(() => import('@/components/PremiumGallerySection'));
const PremiumBookingSection = lazy(() => import('@/components/PremiumBookingSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

export default function EnhancedPremiumIndex() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="barbershop-theme">
      <div className="min-h-screen bg-black">
        <UXOptimizedHeader />
        <main>
          <section id="home">
            <PremiumHeroSection />
          </section>
          
          <section id="about">
            <Suspense fallback={<ServiceCardSkeleton />}>
              <AboutSection />
            </Suspense>
          </section>
          
          <section id="services">
            <Suspense fallback={<ServiceCardSkeleton />}>
              <InteractiveServicesSection />
            </Suspense>
          </section>
          
          <section id="ai-styling">
            <EnhancedAIStyleRecommendation />
          </section>
          
          <section id="gallery">
            <Suspense fallback={<GallerySkeleton />}>
              <PremiumGallerySection />
            </Suspense>
          </section>
          
          <section id="booking">
            <Suspense fallback={<BookingFormSkeleton />}>
              <PremiumBookingSection />
            </Suspense>
          </section>
          
          <section id="contact">
            <Suspense fallback={<ServiceCardSkeleton />}>
              <ContactSection />
            </Suspense>
          </section>
        </main>
        
        {/* AI Chat Support */}
        <AIChat />
      </div>
    </ThemeProvider>
  );
}