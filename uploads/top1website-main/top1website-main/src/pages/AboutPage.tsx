import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import AboutSection from '../components/AboutSection';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Giới Thiệu"
        description="Tìm hiểu về Premium Vietnamese Barbershop - câu chuyện thương hiệu, sứ mệnh và đội ngũ chuyên nghiệp. Hành trình tạo nên phong cách đẳng cấp."
        keywords="giới thiệu barbershop, về chúng tôi, câu chuyện thương hiệu, about us"
        canonicalUrl="https://premiumbarbershop.vn/about"
      />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Về Chúng Tôi
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Khám phá câu chuyện đằng sau Premium Vietnamese Barbershop và sứ mệnh mang đến trải nghiệm grooming đẳng cấp
            </p>
          </div>

          <AboutSection />
        </div>
      </div>
    </>
  );
};

export default AboutPage;