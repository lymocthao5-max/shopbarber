import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { demoBookings, demoServices, demoBarbers, demoUsers } from '../../data/demoData';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Star,
  Phone,
  Mail
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'admin') return null;

  const totalBookings = demoBookings.length;
  const totalCustomers = demoUsers.filter(u => u.role === 'customer').length;
  const totalRevenue = demoBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);
  const pendingBookings = demoBookings.filter(b => b.status === 'pending').length;

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
    { id: 'overview', label: 'Tổng quan', icon: TrendingUp },
    { id: 'bookings', label: 'Quản lý lịch hẹn', icon: Calendar },
    { id: 'customers', label: 'Khách hàng', icon: Users },
    { id: 'services', label: 'Dịch vụ', icon: Settings },
    { id: 'barbers', label: 'Thợ cắt tóc', icon: Users },
    { id: 'analytics', label: 'Báo cáo', icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Bảng điều khiển Admin
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chào mừng, {user.name}
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
                  Tổng quan hệ thống
                </h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tổng lịch hẹn</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {totalBookings}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Khách hàng</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {totalCustomers}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Doanh thu</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {totalRevenue.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Chờ xác nhận</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {pendingBookings}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Lịch hẹn gần đây
                    </h3>
                    <div className="space-y-4">
                      {demoBookings.slice(0, 5).map((booking) => {
                        const customer = demoUsers.find(u => u.id === booking.userId);
                        return (
                          <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(booking.status)}
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {customer?.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {booking.service} • {booking.date}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {getStatusText(booking.status)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Thống kê nhanh
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Dịch vụ phổ biến nhất</span>
                        <span className="font-medium text-gray-900 dark:text-white">Cắt tóc + Gội + Massage</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Thợ cắt tóc xuất sắc</span>
                        <span className="font-medium text-gray-900 dark:text-white">Thầy Minh</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Khung giờ đông nhất</span>
                        <span className="font-medium text-gray-900 dark:text-white">14:00 - 16:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Đánh giá trung bình</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-gray-900 dark:text-white">4.8/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Quản lý lịch hẹn
                  </h2>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Thêm lịch hẹn
                  </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="p-6">
                    <div className="flex gap-4 mb-6">
                      <Button size="sm" variant="outline">Tất cả</Button>
                      <Button size="sm" variant="outline">Chờ xác nhận</Button>
                      <Button size="sm" variant="outline">Đã xác nhận</Button>
                      <Button size="sm" variant="outline">Hoàn thành</Button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Khách hàng</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Dịch vụ</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Thợ cắt</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Ngày giờ</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Giá</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Trạng thái</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {demoBookings.map((booking) => {
                            const customer = demoUsers.find(u => u.id === booking.userId);
                            return (
                              <tr key={booking.id} className="border-b border-gray-100 dark:border-gray-800">
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      {customer?.name}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {customer?.phone}
                                    </p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-gray-900 dark:text-white">
                                  {booking.service}
                                </td>
                                <td className="py-3 px-4 text-gray-900 dark:text-white">
                                  {booking.barber}
                                </td>
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="text-gray-900 dark:text-white">{booking.date}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{booking.time}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                                  {booking.price.toLocaleString('vi-VN')}đ
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(booking.status)}
                                    <span className="text-sm">{getStatusText(booking.status)}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-red-600">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Quản lý khách hàng
                  </h2>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Thêm khách hàng
                  </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Khách hàng</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Liên hệ</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Ngày tham gia</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Lần cắt</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Điểm tích lũy</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {demoUsers.filter(u => u.role === 'customer').map((customer) => {
                            const customerBookings = demoBookings.filter(b => b.userId === customer.id);
                            return (
                              <tr key={customer.id} className="border-b border-gray-100 dark:border-gray-800">
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                      {customer.avatar ? (
                                        <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover" />
                                      ) : (
                                        <Users className="h-5 w-5 text-gray-400" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900 dark:text-white">
                                        {customer.name}
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        ID: {customer.id}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Mail className="h-3 w-3 text-gray-400" />
                                      <span className="text-gray-900 dark:text-white">{customer.email}</span>
                                    </div>
                                    {customer.phone && (
                                      <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-3 w-3 text-gray-400" />
                                        <span className="text-gray-900 dark:text-white">{customer.phone}</span>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-gray-900 dark:text-white">
                                  {new Date(customer.createdAt).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="py-3 px-4 text-gray-900 dark:text-white">
                                  {customerBookings.length} lần
                                </td>
                                <td className="py-3 px-4 font-medium text-amber-600">
                                  {customer.loyaltyPoints || 0} điểm
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Quản lý dịch vụ
                  </h2>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Thêm dịch vụ
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {demoServices.map((service) => (
                    <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {service.description}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Giá:</span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {service.price.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Thời gian:</span>
                          <span className="text-gray-900 dark:text-white">
                            {service.duration} phút
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Loại:</span>
                          <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs rounded-full">
                            {service.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'barbers' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Quản lý thợ cắt tóc
                  </h2>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Thêm thợ cắt
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {demoBarbers.map((barber) => (
                    <div key={barber.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <img src={barber.avatar} alt={barber.name} className="w-16 h-16 rounded-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {barber.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kinh nghiệm: {barber.experience}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {barber.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Chuyên môn:</p>
                        <div className="flex flex-wrap gap-1">
                          {barber.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Báo cáo và thống kê
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Doanh thu theo tháng
                    </h3>
                    <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      [Biểu đồ doanh thu sẽ được hiển thị ở đây]
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Dịch vụ phổ biến
                    </h3>
                    <div className="space-y-3">
                      {demoServices.slice(0, 5).map((service, index) => (
                        <div key={service.id} className="flex justify-between items-center">
                          <span className="text-gray-900 dark:text-white">{service.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-amber-500 h-2 rounded-full" 
                                style={{ width: `${(5 - index) * 20}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {(5 - index) * 20}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Khách hàng mới theo tháng
                    </h3>
                    <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      [Biểu đồ khách hàng mới sẽ được hiển thị ở đây]
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Thống kê tổng quan
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Tổng doanh thu tháng này</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {totalRevenue.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Khách hàng mới tháng này</span>
                        <span className="font-bold text-gray-900 dark:text-white">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Tỷ lệ khách hàng quay lại</span>
                        <span className="font-bold text-gray-900 dark:text-white">85%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Đánh giá trung bình</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-gray-900 dark:text-white">4.8/5</span>
                        </div>
                      </div>
                    </div>
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