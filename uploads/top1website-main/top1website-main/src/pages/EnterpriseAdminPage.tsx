import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EnterpriseAdmin from './EnterpriseAdmin';

const EnterpriseAdminPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Quản Trị Doanh Nghiệp"
        description="Trang quản trị doanh nghiệp với các tính năng phân tích, báo cáo và quản lý nâng cao."
        keywords="enterprise admin, business management, analytics"
        canonicalUrl="https://premiumbarbershop.vn/enterprise-admin"
      />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Quản Trị Doanh Nghiệp
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Phân tích dữ liệu, báo cáo chi tiết và quản lý doanh nghiệp một cách thông minh
            </p>
          </div>

          <EnterpriseAdmin />
        </div>
      </div>
    </>
  );
};

export default EnterpriseAdminPage;