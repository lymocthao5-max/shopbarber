import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { demoBookings, demoServices, demoBarbers } from '../../data/demoData';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Star, 
  Gift, 
  History, 
  Settings,
  LogOut,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const userBookings = demoBookings.filter(booking => booking.userId === user.id);
  const upcomingBookings = userBookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'pending'
  );
  const pastBookings = userBookings.filter(booking => booking.status === 'completed');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận';
      case 'pending': return 'Chờ xác nhận';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: User },
    { id: 'bookings', label: 'Lịch hẹn', icon: Calendar },
    { id: 'history', label: 'Lịch sử', icon: History },
    { id: 'loyalty', label: 'Tích điểm', icon: Gift },
    { id: 'profile', label: 'Hồ sơ', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Chào mừng, {user.name}!
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Khách hàng thân thiết
                </p>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tổng quan
                </h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Lịch hẹn sắp tới</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {upcomingBookings.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Đã hoàn thành</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {pastBookings.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                        <Gift className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Điểm tích lũy</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {user.loyaltyPoints || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Lịch hẹn gần đây
                    </h3>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Đặt lịch mới
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {userBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(booking.status)}
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {booking.service}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {booking.barber} • {booking.date} • {booking.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {booking.price.toLocaleString('vi-VN')}đ
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {getStatusText(booking.status)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Lịch hẹn của tôi
                  </h2>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Đặt lịch mới
                  </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Lịch hẹn sắp tới
                    </h3>
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getStatusIcon(booking.status)}
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  {getStatusText(booking.status)}
                                </span>
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {booking.service}
                              </h4>
                              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  {booking.barber}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {booking.date}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  {booking.time}
                                </div>
                              </div>
                              {booking.notes && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                  Ghi chú: {booking.notes}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900 dark:text-white">
                                {booking.price.toLocaleString('vi-VN')}đ
                              </p>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline">
                                  Sửa
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  Hủy
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Lịch sử dịch vụ
                </h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {booking.service}
                            </h4>
                            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {booking.barber}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {booking.date} • {booking.time}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {booking.price.toLocaleString('vi-VN')}đ
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <Button size="sm" variant="outline" className="mt-2">
                              Đặt lại
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Chương trình tích điểm
                </h2>

                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-6 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Điểm tích lũy của bạn</h3>
                      <p className="text-3xl font-bold">{user.loyaltyPoints || 0} điểm</p>
                      <p className="text-amber-100 mt-1">
                        Còn {500 - (user.loyaltyPoints || 0)} điểm để lên hạng Vàng
                      </p>
                    </div>
                    <Gift className="h-16 w-16 text-amber-200" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Ưu đãi có thể đổi
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Giảm 10%</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Cho lần cắt tiếp theo</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-600">100 điểm</p>
                          <Button size="sm" disabled={!user.loyaltyPoints || user.loyaltyPoints < 100}>
                            Đổi
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Cắt tóc miễn phí</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Dịch vụ cơ bản</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-600">300 điểm</p>
                          <Button size="sm" disabled={!user.loyaltyPoints || user.loyaltyPoints < 300}>
                            Đổi
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Cách tích điểm
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span>Hoàn thành dịch vụ: +10 điểm</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span>Đánh giá 5 sao: +5 điểm</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>Giới thiệu bạn bè: +50 điểm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Thông tin cá nhân
                </h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
                      ) : (
                        <User className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Khách hàng từ {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Họ và tên
                      </label>
                      <div className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{user.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <div className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{user.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Số điện thoại
                      </label>
                      <div className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">{user.phone || 'Chưa cập nhật'}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Loại tài khoản
                      </label>
                      <div className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <Gift className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">
                          {user.role === 'customer' ? 'Khách hàng' : 'Quản trị viên'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <Button>Cập nhật thông tin</Button>
                    <Button variant="outline">Đổi mật khẩu</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};