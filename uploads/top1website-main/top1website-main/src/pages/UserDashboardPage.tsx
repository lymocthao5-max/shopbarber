import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';
import { Calendar, User, Star, Clock, Phone, Mail } from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h2>
          <a href="/login" className="text-amber-400 hover:text-amber-300">
            Đăng nhập ngay
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Dashboard Khách Hàng"
        description="Quản lý thông tin cá nhân và lịch hẹn tại Premium Vietnamese Barbershop"
        keywords="dashboard, user profile, booking history"
      />
      
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Chào mừng, {user.name}!
                </h1>
                <p className="text-gray-300">
                  Quản lý thông tin và lịch hẹn của bạn
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Info */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Thông tin cá nhân
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Họ và tên
                    </label>
                    <div className="text-white">{user.name}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <div className="text-white flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {user.email}
                    </div>
                  </div>
                  
                  {user.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Số điện thoại
                      </label>
                      <div className="text-white flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {user.phone}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Loại tài khoản
                    </label>
                    <div className="text-white">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.role === 'admin' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                      </span>
                    </div>
                  </div>

                  {user.loyaltyPoints !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Điểm tích lũy
                      </label>
                      <div className="text-white flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        {user.loyaltyPoints} điểm
                      </div>
                    </div>
                  )}
                </div>

                <button className="w-full mt-6 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                  Chỉnh sửa thông tin
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Thao tác nhanh
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="/booking"
                    className="flex items-center p-4 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors text-white"
                  >
                    <Calendar className="w-6 h-6 mr-3" />
                    <div>
                      <div className="font-semibold">Đặt lịch mới</div>
                      <div className="text-sm opacity-90">Đặt lịch cắt tóc</div>
                    </div>
                  </a>
                  
                  <a
                    href="/services"
                    className="flex items-center p-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white"
                  >
                    <Star className="w-6 h-6 mr-3" />
                    <div>
                      <div className="font-semibold">Xem dịch vụ</div>
                      <div className="text-sm opacity-90">Khám phá dịch vụ</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Lịch hẹn gần đây
                </h2>
                
                <div className="text-gray-400 text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Bạn chưa có lịch hẹn nào</p>
                  <a
                    href="/booking"
                    className="inline-block mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Đặt lịch ngay
                  </a>
                </div>
              </div>

              {/* Admin Panel Access */}
              {user.role === 'admin' && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Quản trị viên
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href="/admin"
                      className="flex items-center p-4 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-white"
                    >
                      <User className="w-6 h-6 mr-3" />
                      <div>
                        <div className="font-semibold">Admin Dashboard</div>
                        <div className="text-sm opacity-90">Quản lý cơ bản</div>
                      </div>
                    </a>
                    
                    <a
                      href="/enterprise-admin"
                      className="flex items-center p-4 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-white"
                    >
                      <Star className="w-6 h-6 mr-3" />
                      <div>
                        <div className="font-semibold">Enterprise Admin</div>
                        <div className="text-sm opacity-90">Quản lý nâng cao</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};