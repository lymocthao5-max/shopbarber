import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import AdminTabs from '../components/AdminTabs';

const AdminPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Quản Trị"
        description="Trang quản trị hệ thống Premium Vietnamese Barbershop. Quản lý đặt lịch, dịch vụ và khách hàng."
        keywords="admin, quản trị, management system"
        canonicalUrl="https://premiumbarbershop.vn/admin"
      />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Quản Trị Hệ Thống
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Quản lý toàn bộ hoạt động của barbershop từ đặt lịch đến dịch vụ khách hàng
            </p>
          </div>

          <AdminTabs />
        </div>
      </div>
    </>
  );
};

export default AdminPage;