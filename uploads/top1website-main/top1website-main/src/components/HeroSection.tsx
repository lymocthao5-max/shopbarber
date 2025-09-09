import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Parallax layers */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, #ff00ff22 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #00ffff22 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, #ffff0022 0%, transparent 50%)
            `
          }}
        />
        
        {/* Moving particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Interactive light effect */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-300"
          style={{
            background: 'radial-gradient(circle, #ff00ff44, #00ffff44, transparent)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Main title with crazy animations */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight">
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                BARBERSHOP
              </span>
              <span className="block text-4xl md:text-6xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mt-2">
                TƯƠNG LAI
              </span>
            </h1>
            
            <div className="relative">
              <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
                Kiểu tóc của bạn — phong cách của bạn
              </p>
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 animate-pulse"></div>
            </div>
          </div>

          {/* Animated subtitle */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Hòa mình vào thế giới cắt tóc chuyên nghiệp với những hiệu ứng tuyệt vời và phong cách không thể tin được
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="relative group px-8 py-4 text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">ĐẶT LỊCH NGAY</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-md blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-bold border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              XEM CÁC KIỂU TÓC
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-spin-slow">
        <div className="w-8 h-8 border-2 border-pink-500 rotate-45 opacity-60"></div>
      </div>
      <div className="absolute top-40 right-20 animate-pulse">
        <div className="w-6 h-6 bg-cyan-500 rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-40 left-20 animate-bounce">
        <div className="w-4 h-4 bg-yellow-500 transform rotate-45 opacity-50"></div>
      </div>
    </section>
  );
}