import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useBookingSystem } from '@/hooks/useBookingSystem';

export default function BookingSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    service: '',
    barber: '',
    bookingDate: '',
    bookingTime: '',
    message: ''
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const { services, barbers, loading, createBooking, getAvailableTimeSlots } = useBookingSystem();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById('booking');
    if (element) observer.observe(element);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Update available time slots when date or barber changes
  useEffect(() => {
    if (formData.bookingDate && formData.barber) {
      const slots = getAvailableTimeSlots(formData.bookingDate, formData.barber);
      setAvailableTimeSlots(slots);
      
      // Reset time if current selection is not available
      if (formData.bookingTime && !slots.includes(formData.bookingTime)) {
        setFormData(prev => ({ ...prev, bookingTime: '' }));
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formData.bookingDate, formData.barber, getAvailableTimeSlots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    // Validation
    if (!formData.customerName || !formData.customerPhone || !formData.service || 
        !formData.bookingDate || !formData.bookingTime) {
      setSubmitStatus({
        type: 'error',
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc.'
      });
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.customerPhone.replace(/\s/g, ''))) {
      setSubmitStatus({
        type: 'error',
        message: 'Số điện thoại không hợp lệ. Vui lòng nhập 10-11 chữ số.'
      });
      return;
    }

    // Date validation (not in the past)
    const selectedDate = new Date(formData.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setSubmitStatus({
        type: 'error',
        message: 'Không thể đặt lịch cho ngày trong quá khứ.'
      });
      return;
    }

    try {
      const result = await createBooking(formData);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        
        // Reset form
        setFormData({
          customerName: '',
          customerPhone: '',
          service: '',
          barber: '',
          bookingDate: '',
          bookingTime: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.'
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear submit status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <section id="booking" className="relative py-20 bg-gradient-to-b from-black via-purple-950/30 to-black overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.02}deg)`,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff00ff' fill-opacity='0.1'%3E%3Cpath d='M50 50m-25 0a25 25 0 1 1 50 0a25 25 0 1 1 -50 0'/%3E%3C/g%3E%3C/svg%3E")
          `
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className={`text-5xl md:text-7xl font-black mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              ĐẶT LỊCH ONLINE
            </span>
          </h2>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Hệ thống đặt lịch thông minh với kiểm tra xung đột thời gian thực
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className={`bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-cyan-500/30 hover:border-cyan-500 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="p-8 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
              
              {/* Submit status alert */}
              {submitStatus.type && (
                <Alert className={`mb-6 ${
                  submitStatus.type === 'success' 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-red-500 bg-red-500/10'
                }`}>
                  <AlertDescription className={
                    submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }>
                    {submitStatus.message}
                  </AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Personal info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-cyan-400 font-semibold">Tên của bạn *</label>
                    <Input 
                      type="text"
                      placeholder="Nhập tên của bạn"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className="bg-black/50 border-purple-500/50 text-white placeholder-gray-400 focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-cyan-400 font-semibold">Số điện thoại *</label>
                    <Input 
                      type="tel"
                      placeholder="0999 123 456"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      className="bg-black/50 border-purple-500/50 text-white placeholder-gray-400 focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Service and master */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-cyan-400 font-semibold">Dịch vụ *</label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger className="bg-black/50 border-purple-500/50 text-white focus:border-cyan-500">
                        <SelectValue placeholder="Chọn dịch vụ" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-500/50">
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.name} className="text-white hover:bg-purple-500/20">
                            <div className="flex flex-col">
                              <span>{service.name}</span>
                              <span className="text-sm text-gray-400">
                                {formatPrice(service.price)} - {service.duration} phút
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-cyan-400 font-semibold">Thợ cắt tóc</label>
                    <Select value={formData.barber} onValueChange={(value) => handleInputChange('barber', value)}>
                      <SelectTrigger className="bg-black/50 border-purple-500/50 text-white focus:border-cyan-500">
                        <SelectValue placeholder="Chọn thợ cắt tóc" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-500/50">
                        {barbers.filter(barber => barber.isAvailable).map((barber) => (
                          <SelectItem key={barber.id} value={barber.name} className="text-white hover:bg-purple-500/20">
                            <div className="flex flex-col">
                              <span>{barber.name} "{barber.nickname}"</span>
                              <span className="text-sm text-gray-400">
                                {barber.specialties.join(', ')}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                        <SelectItem value="Bất kỳ thợ nào" className="text-white hover:bg-purple-500/20">
                          Bất kỳ thợ nào
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date and time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-cyan-400 font-semibold">Ngày *</label>
                    <Input 
                      type="date"
                      value={formData.bookingDate}
                      onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                      className="bg-black/50 border-purple-500/50 text-white focus:border-cyan-500 transition-colors"
                      min={getMinDate()}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-cyan-400 font-semibold">Thời gian *</label>
                    <Select 
                      value={formData.bookingTime} 
                      onValueChange={(value) => handleInputChange('bookingTime', value)}
                      disabled={!formData.bookingDate || !formData.barber}
                    >
                      <SelectTrigger className="bg-black/50 border-purple-500/50 text-white focus:border-cyan-500">
                        <SelectValue placeholder={
                          !formData.bookingDate || !formData.barber 
                            ? "Chọn ngày và thợ trước" 
                            : availableTimeSlots.length === 0 
                              ? "Không có slot trống" 
                              : "Chọn thời gian"
                        } />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-purple-500/50">
                        {availableTimeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="text-white hover:bg-purple-500/20">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.bookingDate && formData.barber && availableTimeSlots.length === 0 && (
                      <p className="text-yellow-400 text-sm">
                        Không có thời gian trống cho ngày này. Vui lòng chọn ngày khác.
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-cyan-400 font-semibold">Yêu cầu thêm</label>
                  <Textarea 
                    placeholder="Hãy cho chúng tôi biết về yêu cầu kiểu tóc của bạn..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-black/50 border-purple-500/50 text-white placeholder-gray-400 focus:border-cyan-500 transition-colors min-h-[100px]"
                  />
                </div>

                {/* Submit button */}
                <div className="text-center pt-6">
                  <Button 
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 hover:from-green-400 hover:via-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {loading ? 'ĐANG XỬ LÝ...' : 'ĐẶT LỊCH NGAY'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </div>
              </form>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-cyan-500 rotate-45 animate-spin-slow opacity-30"></div>
              <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse opacity-40"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 bg-pink-500 transform rotate-45 animate-bounce opacity-50"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-yellow-500 rounded-full animate-pulse opacity-30"></div>
            </div>
          </Card>
        </div>

        {/* Contact info */}
        <div className={`mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            {
              icon: "📞",
              title: "Điện thoại",
              info: "+84 28 1234 5678",
              description: "Gọi hàng ngày 9:00-21:00"
            },
            {
              icon: "📍", 
              title: "Địa chỉ",
              info: "123 Đường Phong Cách",
              description: "TP.HCM, Quận 1"
            },
            {
              icon: "⏰",
              title: "Giờ làm việc", 
              info: "9:00 - 21:00",
              description: "Không nghỉ cuối tuần"
            }
          ].map((contact, index) => (
            <Card key={index} className="bg-black/50 border border-purple-500/30 hover:border-cyan-500 transition-all duration-300 group">
              <div className="p-6 text-center space-y-3">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {contact.icon}
                </div>
                <h3 className="text-xl font-bold text-cyan-400">{contact.title}</h3>
                <p className="text-white font-semibold">{contact.info}</p>
                <p className="text-gray-400 text-sm">{contact.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}