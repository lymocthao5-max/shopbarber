import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { Clock, Shield, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { servicesPageData, addOnsData } from '../data/servicesData';

const ServicesPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Dịch Vụ"
        description="Khám phá các dịch vụ cắt tóc và chăm sóc nam giới chuyên nghiệp tại Premium Vietnamese Barbershop. Từ cắt tóc classic đến styling cao cấp."
        keywords="dịch vụ cắt tóc, styling nam, nhuộm tóc, chăm sóc da mặt, massage, barbershop services"
        canonicalUrl="https://premiumbarbershop.vn/services"
      />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Dịch Vụ Chuyên Nghiệp
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Trải nghiệm các dịch vụ cắt tóc và chăm sóc nam giới đẳng cấp với công nghệ hiện đại và kỹ thuật chuyên nghiệp
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {servicesPageData.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="bg-black/20 backdrop-blur-md border-white/10 hover:border-yellow-400/50 transition-all duration-300 group">
                  <CardHeader className="relative">
                    {service.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                        <Star className="w-3 h-3 mr-1" />
                        Phổ Biến
                      </Badge>
                    )}
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{service.name}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-2xl font-bold text-yellow-400">{service.price}</span>
                          <div className="flex items-center text-gray-400">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4">
                      {service.description}
                    </CardDescription>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/booking">
                      <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                        Đặt Lịch Ngay
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Add-ons Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Dịch Vụ Bổ Sung
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {addOnsData.map((addon, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-md border-white/10 hover:border-yellow-400/50 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-white font-semibold mb-2">{addon.name}</h3>
                    <p className="text-yellow-400 font-bold">{addon.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quality Guarantee */}
          <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl p-8 border border-yellow-400/20">
            <div className="text-center">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Cam Kết Chất Lượng
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Chúng tôi cam kết mang đến trải nghiệm tốt nhất với đội ngũ thợ cắt tóc chuyên nghiệp, 
                sản phẩm cao cấp và không gian sang trọng.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">100%</div>
                  <div className="text-gray-300">Hài Lòng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">5+</div>
                  <div className="text-gray-300">Năm Kinh Nghiệm</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">1000+</div>
                  <div className="text-gray-300">Khách Hàng</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-white mb-6">
              Sẵn Sàng Thay Đổi Phong Cách?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold">
                  Đặt Lịch Ngay
                </Button>
              </Link>
              <Link to="/ai-style">
                <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                  Tư Vấn AI Style
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;