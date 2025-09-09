import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbMap: Record<string, string> = {
    'services': 'Dịch Vụ',
    'pricing': 'Bảng Giá',
    'booking': 'Đặt Lịch',
    'ai-style': 'AI Style',
    'gallery': 'Thư Viện',
    'about': 'Giới Thiệu',
    'contact': 'Liên Hệ',
    'admin': 'Quản Trị',
    'enterprise-admin': 'Quản Trị Doanh Nghiệp'
  };

  if (pathnames.length === 0) return null;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Trang Chủ', path: '/' },
    ...pathnames.map((pathname, index) => ({
      label: breadcrumbMap[pathname] || pathname,
      path: `/${pathnames.slice(0, index + 1).join('/')}`
    }))
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-300 mb-6 px-4">
      <Link 
        to="/" 
        className="flex items-center hover:text-white transition-colors duration-200"
      >
        <Home className="w-4 h-4 mr-1" />
        Trang Chủ
      </Link>
      
      {pathnames.map((pathname, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            {isLast ? (
              <span className="text-white font-medium">
                {breadcrumbMap[pathname] || pathname}
              </span>
            ) : (
              <Link 
                to={path} 
                className="hover:text-white transition-colors duration-200"
              >
                {breadcrumbMap[pathname] || pathname}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;