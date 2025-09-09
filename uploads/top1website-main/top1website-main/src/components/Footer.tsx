import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Premium Barbershop
            </h3>
            <p className="text-gray-300 text-sm">
              Nơi phong cách gặp gỡ chất lượng. Trải nghiệm dịch vụ cắt tóc đẳng cấp với công nghệ AI hiện đại.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Dịch Vụ</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Bảng Giá</Link></li>
              <li><Link to="/ai-style" className="text-gray-300 hover:text-white transition-colors">AI Style</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Thư Viện</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-white transition-colors">Đặt Lịch</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Dịch Vụ</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Cắt Tóc Nam</li>
              <li className="text-gray-300">Tạo Kiểu</li>
              <li className="text-gray-300">Gội Đầu Massage</li>
              <li className="text-gray-300">Nhuộm Tóc</li>
              <li className="text-gray-300">Chăm Sóc Da Mặt</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liên Hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">info@premiumbarbershop.vn</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-yellow-400 mt-1" />
                <span className="text-gray-300">123 Nguyễn Huệ, Quận 1, TP.HCM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Premium Vietnamese Barbershop. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;