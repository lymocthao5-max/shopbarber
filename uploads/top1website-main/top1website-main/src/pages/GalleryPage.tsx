import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import PremiumGallerySection from '../components/PremiumGallerySection';

const GalleryPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Thư Viện"
        description="Khám phá bộ sưu tập các kiểu tóc đẹp và xu hướng mới nhất tại Premium Vietnamese Barbershop. Cảm hứng cho phong cách của bạn."
        keywords="thư viện kiểu tóc, gallery barbershop, xu hướng tóc nam, hairstyle gallery"
        canonicalUrl="https://premiumbarbershop.vn/gallery"
      />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Thư Viện Phong Cách
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Khám phá những tác phẩm nghệ thuật tóc đẹp nhất và tìm cảm hứng cho phong cách riêng của bạn
            </p>
          </div>

          <PremiumGallerySection />
        </div>
      </div>
    </>
  );
};

export default GalleryPage;