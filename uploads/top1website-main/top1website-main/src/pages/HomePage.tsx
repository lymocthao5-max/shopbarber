import React from 'react';
import SEOHead from '../components/SEOHead';
import PremiumHeroSection from '../components/PremiumHeroSection';
import AboutSection from '../components/AboutSection';
import InteractiveServicesSection from '../components/InteractiveServicesSection';
import PremiumGallerySection from '../components/PremiumGallerySection';
import EnhancedAIStyleRecommendation from '../components/EnhancedAIStyleRecommendation';
import PremiumBookingSection from '../components/PremiumBookingSection';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Trang Chủ"
        description="Premium Vietnamese Barbershop - Nơi phong cách gặp gỡ chất lượng. Trải nghiệm dịch vụ cắt tóc đẳng cấp với công nghệ AI hiện đại."
        keywords="tiệm cắt tóc premium, barbershop Việt Nam, AI styling, cắt tóc nam chuyên nghiệp"
        canonicalUrl="https://premiumbarbershop.vn/"
      />
      
      <main>
        <PremiumHeroSection />
        <AboutSection />
        <InteractiveServicesSection />
        <PremiumGallerySection />
        <EnhancedAIStyleRecommendation />
        <PremiumBookingSection />
        <ContactSection />
      </main>
    </>
  );
};

export default HomePage;