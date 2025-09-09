import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminTabs from '@/components/AdminTabs';
import AdvancedAnalyticsDashboard from '@/components/AdvancedAnalyticsDashboard';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Settings, 
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  TrendingUp,
  DollarSign,
  Star,
  Activity
} from 'lucide-react';

type AdminTabType = 'dashboard' | 'analytics' | 'management';

export default function EnterpriseAdmin() {
  const [activeTab, setActiveTab] = useState<AdminTabType>('dashboard');
  const [notifications] = useState([
    { id: 1, type: 'booking', message: 'Đặt lịch mới từ Nguyễn Văn A', time: '5 phút trước', unread: true },
    { id: 2, type: 'review', message: 'Đánh giá 5 sao từ Trần Thị B', time: '15 phút trước', unread: true },
    { id: 3, type: 'system', message: 'Cập nhật hệ thống hoàn tất', time: '1 giờ trước', unread: false }
  ]);

  const quickStats = [
    { label: 'Doanh thu hôm nay', value: '12.5M đ', change: '+15%', icon: DollarSign, color: 'text-green-400' },
    { label: 'Đặt lịch hôm nay', value: '47', change: '+8%', icon: Calendar, color: 'text-blue-400' },
    { label: 'Khách hàng mới', value: '23', change: '+12%', icon: Users, color: 'text-purple-400' },
    { label: 'Đánh giá TB', value: '4.9', change: '+0.1', icon: Star, color: 'text-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Elite Cuts Admin
              </h1>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                <Activity className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Filter className="w-4 h-4 mr-2" />
                Lọc
              </Button>
              <div className="relative">
                <Button variant="outline" className="border-gray-700 text-gray-300">
                  <Bell className="w-4 h-4" />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-4 mb-8"
        >
          {[
            { id: 'dashboard' as AdminTabType, label: 'Dashboard', icon: BarChart3 },
            { id: 'analytics' as AdminTabType, label: 'Analytics', icon: TrendingUp },
            { id: 'management' as AdminTabType, label: 'Quản lý', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "outline"}
              onClick={() => setActiveTab(id)}
              className={`${
                activeTab === id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                  : 'border-purple-500/50 text-gray-300 hover:bg-purple-500/10'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </motion.div>

        {/* Quick Stats */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {quickStats.map((stat, index) => (
              <Card key={index} className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <AdminTabs />
              </div>
              
              {/* Notifications */}
              <div>
                <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      Thông báo
                      <Badge className="bg-red-500/20 text-red-400">
                        {notifications.filter(n => n.unread).length} mới
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border ${
                            notification.unread 
                              ? 'bg-purple-500/10 border-purple-500/30' 
                              : 'bg-gray-800/50 border-gray-700'
                          }`}
                        >
                          <p className="text-white text-sm">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && <AdvancedAnalyticsDashboard />}

          {activeTab === 'management' && (
            <div className="grid grid-cols-1 gap-8">
              <AdminTabs />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}