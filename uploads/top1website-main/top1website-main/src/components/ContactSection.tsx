import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('contact');
    if (element) observer.observe(element);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Parallax background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          backgroundImage: `
            radial-gradient(circle at 30% 70%, #ff00ff33 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, #00ffff33 0%, transparent 50%)
          `
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-7xl font-black mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              LIÊN HỆ
            </span>
          </h2>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Liên hệ với chúng tôi bằng bất kỳ cách nào thuận tiện
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact form */}
          <Card className={`bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-orange-500/30 hover:border-red-500 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 animate-pulse"></div>
              
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent relative z-10">
                Gửi tin nhắn
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-orange-400 font-semibold">Tên *</label>
                    <Input 
                      type="text"
                      placeholder="Tên của bạn"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-black/50 border-red-500/50 text-white placeholder-gray-400 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-orange-400 font-semibold">Email *</label>
                    <Input 
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-black/50 border-red-500/50 text-white placeholder-gray-400 focus:border-orange-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-orange-400 font-semibold">Chủ đề</label>
                  <Input 
                    type="text"
                    placeholder="Chủ đề tin nhắn"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="bg-black/50 border-red-500/50 text-white placeholder-gray-400 focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-orange-400 font-semibold">Tin nhắn *</label>
                  <Textarea 
                    placeholder="Tin nhắn của bạn..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-black/50 border-red-500/50 text-white placeholder-gray-400 focus:border-orange-500 transition-colors min-h-[120px]"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-400 hover:via-red-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/50"
                >
                  GỬI TIN NHẮN
                </Button>
              </form>
            </div>
          </Card>

          {/* Contact info and map */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Contact cards */}
            <div className="space-y-6">
              {[
                {
                  icon: "📍",
                  title: "Địa chỉ của chúng tôi",
                  info: "123 Đường Phong Cách",
                  description: "TP.HCM, Quận 1"
                },
                {
                  icon: "📞",
                  title: "Điện thoại",
                  info: "+84 28 1234 5678",
                  description: "Gọi hàng ngày 9:00-21:00"
                },
                {
                  icon: "✉️",
                  title: "Email",
                  info: "info@barbershop.vn",
                  description: "Phản hồi trong vòng 1 giờ"
                },
                {
                  icon: "⏰",
                  title: "Giờ làm việc",
                  info: "9:00 - 21:00",
                  description: "Không nghỉ cuối tuần và lễ"
                }
              ].map((contact, index) => (
                <Card key={index} className="bg-black/50 border border-orange-500/30 hover:border-red-500 transition-all duration-300 group">
                  <div className="p-6 flex items-center space-x-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-orange-400">{contact.title}</h4>
                      <p className="text-white font-semibold">{contact.info}</p>
                      <p className="text-gray-400 text-sm">{contact.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Social media */}
            <Card className="bg-black/50 border border-orange-500/30 hover:border-red-500 transition-all duration-300">
              <div className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-4">Chúng tôi trên mạng xã hội</h4>
                <div className="flex space-x-4">
                  {[
                    { name: "Instagram", icon: "📷", color: "from-pink-500 to-purple-500" },
                    { name: "Facebook", icon: "📘", color: "from-blue-500 to-cyan-500" },
                    { name: "Zalo", icon: "💬", color: "from-cyan-500 to-blue-500" },
                    { name: "TikTok", icon: "🎵", color: "from-green-500 to-emerald-500" }
                  ].map((social, index) => (
                    <Button 
                      key={index}
                      variant="outline"
                      size="sm"
                      className={`bg-gradient-to-r ${social.color} border-0 hover:scale-110 transition-all duration-300`}
                    >
                      <span className="mr-2">{social.icon}</span>
                      {social.name}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Map placeholder */}
            <Card className="bg-black/50 border border-orange-500/30 hover:border-red-500 transition-all duration-300 group overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative">
                <div className="text-center space-y-4">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🗺️</div>
                  <p className="text-gray-400">Bản đồ tương tác</p>
                  <p className="text-sm text-gray-500">Nhấp để mở trong bản đồ</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-20 text-center border-t border-gray-800 pt-12 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              BARBERSHOP TƯƠNG LAI
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Chúng tôi không chỉ tạo ra những kiểu tóc — chúng tôi tạo ra phong cách làm nổi bật cá tính của bạn. 
              Chào mừng đến với tương lai của nghề cắt tóc!
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>© 2024 Barbershop Tương Lai</span>
              <span>•</span>
              <span>Bảo lưu mọi quyền</span>
              <span>•</span>
              <span>Được tạo bởi 💜 MGX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}