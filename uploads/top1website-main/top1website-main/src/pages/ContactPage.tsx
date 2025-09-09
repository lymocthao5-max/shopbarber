import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactSection from '../components/ContactSection';

const ContactPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Liên Hệ"
        description="Liên hệ với Premium Vietnamese Barbershop để đặt lịch hẹn, tư vấn dịch vụ hoặc giải đáp thắc mắc. Chúng tôi luôn sẵn sàng hỗ trợ bạn."
        keywords="liên hệ barbershop, địa chỉ tiệm cắt tóc, số điện thoại, contact"
        canonicalUrl="https://premiumbarbershop.vn/contact"
      />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ để được tư vấn tốt nhất.
            </p>
          </div>

          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default ContactPage;