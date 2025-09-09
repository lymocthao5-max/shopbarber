import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import PremiumBookingSection from '../components/PremiumBookingSection';

const BookingPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Đặt Lịch"
        description="Đặt lịch hẹn cắt tóc tại Premium Vietnamese Barbershop. Chọn thời gian phù hợp và trải nghiệm dịch vụ chuyên nghiệp."
        keywords="đặt lịch cắt tóc, booking barbershop, hẹn cắt tóc, appointment"
        canonicalUrl="https://premiumbarbershop.vn/booking"
      />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Đặt Lịch Hẹn
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Chọn thời gian phù hợp và để chúng tôi mang đến cho bạn trải nghiệm cắt tóc tuyệt vời nhất
            </p>
          </div>

          <PremiumBookingSection />
        </div>
      </div>
    </>
  );
};

export default BookingPage;