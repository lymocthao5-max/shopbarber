import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign, 
  Star,
  Clock,
  Target,
  Award,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  revenue: { current: number; previous: number; growth: number };
  customers: { current: number; previous: number; growth: number };
  bookings: { current: number; previous: number; growth: number };
  satisfaction: { current: number; previous: number; growth: number };
}

interface ChartData {
  name: string;
  value: number;
  revenue?: number;
  bookings?: number;
  customers?: number;
}

type PeriodType = '7d' | '30d' | '90d' | '1y';
type ChartType = 'revenue' | 'bookings' | 'customers' | 'services';

const AdvancedAnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('30d');
  const [selectedChart, setSelectedChart] = useState<ChartType>('revenue');
  const [isLoading, setIsLoading] = useState(false);

  const analyticsData: AnalyticsData = {
    revenue: { current: 125750000, previous: 98500000, growth: 27.7 },
    customers: { current: 2847, previous: 2156, growth: 32.1 },
    bookings: { current: 1653, previous: 1298, growth: 27.3 },
    satisfaction: { current: 4.8, previous: 4.6, growth: 4.3 }
  };

  const revenueData: ChartData[] = [
    { name: 'T1', value: 8500000 },
    { name: 'T2', value: 9200000 },
    { name: 'T3', value: 11800000 },
    { name: 'T4', value: 13200000 },
    { name: 'T5', value: 15600000 },
    { name: 'T6', value: 18900000 },
    { name: 'T7', value: 22100000 },
    { name: 'T8', value: 19800000 },
    { name: 'T9', value: 21500000 },
    { name: 'T10', value: 24300000 },
    { name: 'T11', value: 26800000 },
    { name: 'T12', value: 28950000 }
  ];

  const serviceData: ChartData[] = [
    { name: 'Premium Cut', value: 35, revenue: 45000000 },
    { name: 'AI Styling', value: 28, revenue: 32000000 },
    { name: 'VIP Package', value: 20, revenue: 28000000 },
    { name: 'Beard Grooming', value: 12, revenue: 15000000 },
    { name: 'Basic Cut', value: 5, revenue: 5750000 }
  ];

  const customerGrowthData: ChartData[] = [
    { name: 'T1', customers: 1850, bookings: 980 },
    { name: 'T2', customers: 1920, bookings: 1050 },
    { name: 'T3', customers: 2100, bookings: 1180 },
    { name: 'T4', customers: 2280, bookings: 1320 },
    { name: 'T5', customers: 2450, bookings: 1450 },
    { name: 'T6', customers: 2650, bookings: 1580 },
    { name: 'T7', customers: 2847, bookings: 1653 }
  ];

  const timeSlotData: ChartData[] = [
    { name: '8-10h', value: 15 },
    { name: '10-12h', value: 25 },
    { name: '12-14h', value: 20 },
    { name: '14-16h', value: 30 },
    { name: '16-18h', value: 35 },
    { name: '18-20h', value: 40 },
    { name: '20-22h', value: 25 }
  ];

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const StatCard = ({ 
    title, 
    current, 
    previous, 
    growth, 
    icon: Icon, 
    format = 'number',
    suffix = '' 
  }: {
    title: string;
    current: number;
    previous: number;
    growth: number;
    icon: React.ElementType;
    format?: 'number' | 'currency' | 'rating';
    suffix?: string;
  }) => {
    const formatValue = (value: number) => {
      if (format === 'currency') {
        return `${(value / 1000000).toFixed(1)}M đ`;
      } else if (format === 'rating') {
        return value.toFixed(1);
      }
      return value.toLocaleString() + suffix;
    };

    return (
      <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <Badge className={`${growth >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {growth >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(growth).toFixed(1)}%
            </Badge>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{formatValue(current)}</h3>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-gray-500 text-xs mt-1">
              So với kỳ trước: {formatValue(previous)}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Analytics Dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Phân tích chi tiết hiệu suất kinh doanh và xu hướng khách hàng
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as PeriodType)}
              className="bg-black/50 border border-purple-500/50 text-white rounded-lg px-4 py-2"
            >
              <option value="7d">7 ngày qua</option>
              <option value="30d">30 ngày qua</option>
              <option value="90d">90 ngày qua</option>
              <option value="1y">1 năm qua</option>
            </select>
            <Button
              onClick={refreshData}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <StatCard
            title="Doanh thu"
            current={analyticsData.revenue.current}
            previous={analyticsData.revenue.previous}
            growth={analyticsData.revenue.growth}
            icon={DollarSign}
            format="currency"
          />
          <StatCard
            title="Khách hàng"
            current={analyticsData.customers.current}
            previous={analyticsData.customers.previous}
            growth={analyticsData.customers.growth}
            icon={Users}
          />
          <StatCard
            title="Lượt đặt lịch"
            current={analyticsData.bookings.current}
            previous={analyticsData.bookings.previous}
            growth={analyticsData.bookings.growth}
            icon={Calendar}
          />
          <StatCard
            title="Đánh giá trung bình"
            current={analyticsData.satisfaction.current}
            previous={analyticsData.satisfaction.previous}
            growth={analyticsData.satisfaction.growth}
            icon={Star}
            format="rating"
            suffix="/5"
          />
        </motion.div>

        {/* Chart Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {[
            { id: 'revenue' as ChartType, label: 'Doanh thu', icon: BarChart3 },
            { id: 'bookings' as ChartType, label: 'Đặt lịch', icon: LineChartIcon },
            { id: 'customers' as ChartType, label: 'Khách hàng', icon: Users },
            { id: 'services' as ChartType, label: 'Dịch vụ', icon: PieChartIcon }
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={selectedChart === id ? "default" : "outline"}
              onClick={() => setSelectedChart(id)}
              className={`${
                selectedChart === id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                  : 'border-purple-500/50 text-gray-300 hover:bg-purple-500/10'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </motion.div>

        {/* Main Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Primary Chart */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">
                {selectedChart === 'revenue' && 'Biểu đồ Doanh thu'}
                {selectedChart === 'bookings' && 'Xu hướng Đặt lịch'}
                {selectedChart === 'customers' && 'Tăng trưởng Khách hàng'}
                {selectedChart === 'services' && 'Phân bố Dịch vụ'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {selectedChart === 'revenue' && (
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #8B5CF6',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                        formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M đ`, 'Doanh thu']}
                      />
                      <Bar dataKey="value" fill="url(#gradient1)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  )}
                  {selectedChart === 'bookings' && (
                    <LineChart data={customerGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #8B5CF6',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                      />
                      <Line type="monotone" dataKey="bookings" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 6 }} />
                    </LineChart>
                  )}
                  {selectedChart === 'customers' && (
                    <AreaChart data={customerGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #8B5CF6',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                      />
                      <Area type="monotone" dataKey="customers" stroke="#06B6D4" fill="url(#gradient2)" />
                      <defs>
                        <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  )}
                  {selectedChart === 'services' && (
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #8B5CF6',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Tỷ lệ']}
                      />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Time Slot Analysis */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Phân tích Khung giờ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeSlotData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #8B5CF6',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Tỷ lệ đặt lịch']}
                    />
                    <Bar dataKey="value" fill="url(#gradient3)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Service Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Hiệu suất Dịch vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-300 pb-4">Dịch vụ</th>
                      <th className="text-right text-gray-300 pb-4">Tỷ lệ (%)</th>
                      <th className="text-right text-gray-300 pb-4">Doanh thu</th>
                      <th className="text-right text-gray-300 pb-4">Xu hướng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceData.map((service, index) => (
                      <tr key={service.name} className="border-b border-gray-800">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-white font-medium">{service.name}</span>
                          </div>
                        </td>
                        <td className="text-right text-white py-4">{service.value}%</td>
                        <td className="text-right text-white py-4">
                          {service.revenue ? `${(service.revenue / 1000000).toFixed(1)}M đ` : '-'}
                        </td>
                        <td className="text-right py-4">
                          <Badge className="bg-green-500/20 text-green-400">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +{(Math.random() * 20 + 5).toFixed(1)}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;