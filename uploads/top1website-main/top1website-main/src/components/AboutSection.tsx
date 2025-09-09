import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

export default function AboutSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('about');
    if (element) observer.observe(element);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const masters = [
    {
      name: "Minh 'Razor' Nguyễn",
      specialty: "Kiểu tóc cổ điển",
      experience: "8 năm",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Chuyên gia kỹ thuật cổ điển với phong cách hiện đại"
    },
    {
      name: "Tuấn 'Fade' Trần",
      specialty: "Fade thời trang",
      experience: "6 năm", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Chuyên gia cắt tóc gradient hiện đại"
    },
    {
      name: "Hùng 'Beard' Lê",
      specialty: "Chăm sóc râu",
      experience: "10 năm",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      description: "Chuyên gia tạo hình và chăm sóc râu"
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Parallax background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          backgroundImage: `
            linear-gradient(45deg, #ff00ff11 25%, transparent 25%),
            linear-gradient(-45deg, #00ffff11 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ff00ff11 75%),
            linear-gradient(-45deg, transparent 75%, #00ffff11 75%)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-7xl font-black mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              ĐỘI NGŨ CỦA CHÚNG TÔI
            </span>
          </h2>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Những bậc thầy nghề với kỹ năng tuyệt vời và cách tiếp cận sáng tạo với từng khách hàng
          </p>
        </div>

        {/* Masters grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {masters.map((master, index) => (
            <Card 
              key={index}
              className={`group relative bg-black/50 border-2 border-purple-500/30 hover:border-purple-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="p-6 text-center space-y-4">
                {/* Master photo with effects */}
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <img 
                    src={master.image}
                    alt={master.name}
                    className="relative z-10 w-full h-full rounded-full object-cover border-4 border-purple-500 group-hover:border-pink-500 transition-colors duration-300"
                  />
                  {/* Rotating ring */}
                  <div className="absolute inset-0 border-2 border-cyan-500 rounded-full animate-spin-slow opacity-60"></div>
                </div>

                {/* Master info */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {master.name}
                  </h3>
                  <p className="text-cyan-400 font-semibold text-lg">
                    {master.specialty}
                  </p>
                  <p className="text-gray-400">
                    Kinh nghiệm: {master.experience}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {master.description}
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Story section */}
        <div className={`mt-20 text-center max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative p-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/30">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              CÂU CHUYỆN CỦA CHÚNG TÔI
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Chúng tôi đã tạo ra barbershop của tương lai, nơi kỹ thuật truyền thống kết hợp với công nghệ đổi mới. 
              Mỗi kiểu tóc là một tác phẩm nghệ thuật, mỗi khách hàng là một câu chuyện phong cách độc đáo.
            </p>
            
            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}