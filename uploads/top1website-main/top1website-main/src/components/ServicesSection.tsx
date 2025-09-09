import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ServicesSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('services');
    if (element) observer.observe(element);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const services = [
    {
      title: "CẮT TÓC CỔ ĐIỂN",
      price: "500.000₫",
      duration: "45 phút",
      description: "Cắt tóc chuyên nghiệp phù hợp với khuôn mặt và phong cách cá nhân",
      icon: "✂️",
      features: ["Tư vấn stylist", "Gội đầu", "Tạo kiểu", "Styling"]
    },
    {
      title: "CẠO RÂU HOÀNG GIA",
      price: "350.000₫", 
      duration: "30 phút",
      description: "Cạo râu truyền thống bằng dao cạo với khăn nóng",
      icon: "🪒",
      features: ["Khăn nóng", "Mỹ phẩm cao cấp", "Massage mặt", "Dưỡng ẩm"]
    },
    {
      title: "TẠO HÌNH RÂU",
      price: "400.000₫",
      duration: "40 phút", 
      description: "Tạo hình râu và ria mép hoàn hảo",
      icon: "🧔",
      features: ["Thiết kế hình dáng", "Cắt tỉa chính xác", "Chăm sóc và nuôi dưỡng", "Styling"]
    },
    {
      title: "CẮT TÓC TRẺ EM",
      price: "300.000₫",
      duration: "30 phút",
      description: "Cắt tóc cho các quý tử nhỏ theo phong cách vui nhộn",
      icon: "👶",
      features: ["Phương pháp vui chơi", "An toàn", "Sự kiên nhẫn của thợ", "Quà tặng"]
    },
    {
      title: "GÓI VIP TOÀN DIỆN",
      price: "900.000₫",
      duration: "90 phút",
      description: "Trọn gói dịch vụ cho những người sành điệu thực thụ",
      icon: "👑",
      features: ["Cắt tóc + cạo râu", "Chăm sóc râu", "Massage đầu", "Đồ uống"]
    },
    {
      title: "TẠO KIỂU NHANH",
      price: "150.000₫",
      duration: "15 phút",
      description: "Tạo kiểu nhanh cho các cuộc họp công việc",
      icon: "⚡",
      features: ["Tạo kiểu nhanh", "Sản phẩm chuyên nghiệp", "Cố định", "Bóng mượt"]
    }
  ];

  return (
    <section id="services" className="relative py-20 bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.05}deg)`,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff00ff' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l-15-15v30l15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-7xl font-black mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              DỊCH VỤ CỦA CHÚNG TÔI
            </span>
          </h2>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Dịch vụ barbershop chuyên nghiệp với chất lượng tuyệt vời và phong cách đỉnh cao
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`group relative bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-purple-500/30 hover:border-cyan-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="p-6 space-y-4 relative overflow-hidden">
                {/* Service icon with animation */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {service.title}
                  </h3>
                </div>

                {/* Price and duration */}
                <div className="flex justify-between items-center bg-black/50 rounded-lg p-3 border border-purple-500/30">
                  <span className="text-2xl font-bold text-cyan-400">{service.price}</span>
                  <span className="text-gray-400">{service.duration}</span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-center leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Book button */}
                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/50"
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  ĐẶT LỊCH
                </Button>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-lg">
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                       style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative inline-block">
            <Button 
              size="lg"
              className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 hover:from-yellow-400 hover:via-red-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ĐẶT LỊCH BẤT KỲ DỊCH VỤ NÀO
            </Button>
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-lg blur-lg opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}