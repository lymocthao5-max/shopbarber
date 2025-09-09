import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GallerySection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('gallery');
    if (element) observer.observe(element);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const galleryItems = [
    {
      before: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=500&fit=crop",
      after: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      title: "Biến đổi cổ điển",
      description: "Từ bình thường đến phong cách"
    },
    {
      before: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop",
      after: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
      title: "Fade hiện đại",
      description: "Kiểu tóc gradient"
    },
    {
      before: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=500&fit=crop",
      after: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
      title: "Râu trong mơ",
      description: "Hình dáng hoàn hảo"
    },
    {
      before: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=500&fit=crop",
      after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
      title: "Phong cách doanh nhân",
      description: "Thanh lịch và nghiêm túc"
    },
    {
      before: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=500&fit=crop",
      after: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=500&fit=crop",
      title: "Hình ảnh sáng tạo",
      description: "Giải pháp táo bạo"
    },
    {
      before: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=500&fit=crop",
      after: "https://images.unsplash.com/photo-1543965170-4c01a586684e?w=400&h=500&fit=crop",
      title: "Phong cách trẻ trung",
      description: "Kiểu tóc xu hướng"
    }
  ];

  return (
    <section id="gallery" className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Parallax background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #ff00ff22 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #00ffff22 0%, transparent 50%)
          `
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-7xl font-black mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              TÁC PHẨM CỦA CHÚNG TÔI
            </span>
          </h2>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Xem những sự biến đổi không thể tin được của khách hàng chúng tôi
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {galleryItems.map((item, index) => (
            <Card 
              key={index}
              className={`group relative bg-black/50 border-2 border-purple-500/30 hover:border-cyan-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                {/* Before/After images */}
                <div className="relative w-full h-full">
                  <img 
                    src={item.before}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img 
                    src={item.after}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  
                  {/* Before/After labels */}
                  <div className="absolute top-4 left-4 bg-red-500/80 text-white px-3 py-1 rounded-full text-sm font-bold transition-opacity duration-500 group-hover:opacity-0">
                    TRƯỚC
                  </div>
                  <div className="absolute top-4 left-4 bg-green-500/80 text-white px-3 py-1 rounded-full text-sm font-bold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    SAU
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                  <Button 
                    size="sm" 
                    className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                    onClick={() => setSelectedImage(index)}
                  >
                    Phóng to
                  </Button>
                </div>

                {/* Animated border effect */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { number: "1000+", label: "Khách hàng hài lòng" },
            { number: "5", label: "Năm kinh nghiệm" },
            { number: "3", label: "Thợ cắt tóc" },
            { number: "24/7", label: "Hỗ trợ" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            size="lg"
            className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            TRỞ THÀNH PHẦN CỦA THƯ VIỆN
          </Button>
        </div>
      </div>

      {/* Modal for enlarged images */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={galleryItems[selectedImage].after}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <Button 
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}