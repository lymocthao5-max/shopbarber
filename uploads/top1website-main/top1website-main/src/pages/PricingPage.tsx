import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PricingPage: React.FC = () => {
  const pricingPlans = [
    {
      name: "Essential",
      price: "150,000₫",
      description: "Gói cơ bản cho khách hàng mới",
      icon: Zap,
      features: [
        "Cắt tóc chuyên nghiệp",
        "Gội đầu cơ bản",
        "Tạo kiểu đơn giản",
        "Tư vấn kiểu tóc",
        "Đồ uống miễn phí"
      ],
      popular: false,
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Premium",
      price: "250,000₫",
      description: "Gói phổ biến nhất",
      icon: Star,
      features: [
        "Tất cả dịch vụ Essential",
        "AI tư vấn kiểu tóc",
        "Gội đầu thảo dược",
        "Massage da đầu",
        "Tạo kiểu chuyên nghiệp",
        "Chăm sóc da đầu",
        "Bảo hành 1 tuần"
      ],
      popular: true,
      color: "from-yellow-400 to-orange-500"
    },
    {
      name: "Royal",
      price: "400,000₫",
      description: "Trải nghiệm đẳng cấp hoàng gia",
      icon: Crown,
      features: [
        "Tất cả dịch vụ Premium",
        "Chăm sóc da mặt cao cấp",
        "Massage toàn thân 15 phút",
        "Cạo râu chuyên nghiệp",
        "Nhuộm/highlight (nếu cần)",
        "Không gian VIP riêng",
        "Đồ uống cao cấp",
        "Bảo hành 2 tuần"
      ],
      popular: false,
      color: "from-purple-400 to-pink-500"
    }
  ];

  const additionalServices = [
    { service: "Nhuộm tóc", price: "200,000₫ - 400,000₫" },
    { service: "Highlights", price: "250,000₫ - 500,000₫" },
    { service: "Uốn tóc", price: "300,000₫ - 600,000₫" },
    { service: "Duỗi tóc", price: "250,000₫ - 450,000₫" },
    { service: "Chăm sóc da mặt", price: "150,000₫ - 300,000₫" },
    { service: "Massage thư giãn", price: "100,000₫ - 200,000₫" }
  ];

  const membershipBenefits = [
    "Giảm giá 10-20% cho tất cả dịch vụ",
    "Ưu tiên đặt lịch",
    "Tích điểm đổi quà",
    "Sinh nhật miễn phí",
    "Tư vấn style cá nhân",
    "Sự kiện độc quyền"
  ];

  return (
    <>
      <SEOHead
        title="Bảng Giá"
        description="Xem bảng giá chi tiết các dịch vụ tại Premium Vietnamese Barbershop. Gói dịch vụ từ cơ bản đến cao cấp với mức giá hợp lý."
        keywords="bảng giá cắt tóc, giá dịch vụ barbershop, gói dịch vụ nam, pricing"
        canonicalUrl="https://premiumbarbershop.vn/pricing"
      />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Bảng Giá Dịch Vụ
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn. Tất cả đều đảm bảo chất lượng cao nhất.
            </p>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={index} 
                  className={`relative bg-black/20 backdrop-blur-md border-white/10 hover:border-yellow-400/50 transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-yellow-400/50 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                      Phổ Biến Nhất
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto p-3 rounded-full bg-gradient-to-r ${plan.color} w-fit mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
                      <span className="text-gray-400">/lần</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to="/booking">
                      <Button 
                        className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold`}
                      >
                        Chọn Gói Này
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Dịch Vụ Bổ Sung
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((item, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-md border-white/10 hover:border-yellow-400/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-semibold">{item.service}</h3>
                      <span className="text-yellow-400 font-bold">{item.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Membership Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 border border-purple-400/20 mb-16">
            <div className="text-center mb-8">
              <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Thành Viên VIP
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Trở thành thành viên VIP để nhận được nhiều ưu đãi đặc biệt và trải nghiệm dịch vụ cao cấp
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {membershipBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold">
                  Tìm Hiểu Thêm
                </Button>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Câu Hỏi Thường Gặp
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">Có thể hủy lịch hẹn không?</h3>
                  <p className="text-gray-300">Bạn có thể hủy lịch hẹn trước 2 tiếng mà không mất phí.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">Có chấp nhận thanh toán thẻ không?</h3>
                  <p className="text-gray-300">Chúng tôi chấp nhận tiền mặt, thẻ ATM, và ví điện tử.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">Thời gian phục vụ?</h3>
                  <p className="text-gray-300">Thứ 2 - CN: 8:00 - 21:00. Nghỉ lễ tết theo quy định.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">Có bảo hành dịch vụ không?</h3>
                  <p className="text-gray-300">Tất cả dịch vụ đều có bảo hành từ 1-2 tuần tùy gói.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Sẵn Sàng Đặt Lịch?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                  Đặt Lịch Ngay
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                  Liên Hệ Tư Vấn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;