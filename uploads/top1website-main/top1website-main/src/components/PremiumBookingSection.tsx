import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare,
  Sparkles,
  Check,
  Star,
  ChevronRight,
  Gift,
  Shield,
  Award
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { servicesData, barbersData, timeSlots, getServiceById, getBarberById, formatPrice } from '../data/servicesData';

const PremiumBookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedBarber, setSelectedBarber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentStep(1);
      setSelectedDate(undefined);
      setSelectedTime('');
      setSelectedService('');
      setSelectedBarber('');
      setFormData({ name: '', email: '', phone: '', notes: '' });
    }, 4000);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceedStep1 = selectedService && selectedBarber;
  const canProceedStep2 = selectedDate && selectedTime;
  const canSubmit = formData.name && formData.email && formData.phone;

  const selectedServiceData = getServiceById(selectedService);
  const selectedBarberData = getBarberById(selectedBarber);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden" id="booking">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-yellow-600/5 to-orange-600/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-md border border-purple-500/30 rounded-full px-6 py-3 mb-6"
          >
            <CalendarIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-200">Đặt Lịch Trải Nghiệm Cao Cấp</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Đặt Lịch Hẹn
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Cao Cấp
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Trải nghiệm dịch vụ cắt tóc cao cấp với các chuyên gia hàng đầu. 
            Đặt lịch chỉ trong vài bước đơn giản và nhận ưu đãi đặc biệt.
          </motion.p>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Card className="border-0 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md overflow-hidden shadow-2xl">
            <CardHeader className="text-center pb-8 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
              <CardTitle className="text-3xl text-white mb-4 flex items-center justify-center space-x-2">
                <CalendarIcon className="w-8 h-8 text-purple-400" />
                <span>Đặt Lịch Hẹn</span>
              </CardTitle>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                {[
                  { step: 1, label: 'Chọn Dịch Vụ' },
                  { step: 2, label: 'Chọn Thời Gian' },
                  { step: 3, label: 'Thông Tin' }
                ].map(({ step, label }) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
                      currentStep >= step 
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg' 
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {currentStep > step ? <Check className="w-6 h-6" /> : step}
                    </div>
                    <div className="ml-2 text-sm text-gray-300 hidden sm:block">{label}</div>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-4 transition-all duration-500 ${
                        currentStep > step ? 'bg-gradient-to-r from-purple-600 to-cyan-600' : 'bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-gray-400 text-lg">
                {currentStep === 1 && "Chọn Dịch Vụ & Thợ Cắt Tóc Yêu Thích"}
                {currentStep === 2 && "Chọn Ngày & Giờ Phù Hợp"}
                {currentStep === 3 && "Điền Thông Tin Liên Hệ"}
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Service & Barber Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-10"
                  >
                    {/* Service Selection */}
                    <div>
                      <Label className="text-2xl font-semibold text-white mb-6 block flex items-center">
                        <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
                        Chọn Dịch Vụ
                      </Label>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {servicesData.map((service) => (
                          <motion.div
                            key={service.id}
                            className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                              selectedService === service.id
                                ? 'border-purple-500 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 shadow-2xl'
                                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50'
                            }`}
                            onClick={() => setSelectedService(service.id)}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-xl ${
                                  selectedService === service.id 
                                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600' 
                                    : 'bg-gray-700'
                                }`}>
                                  <service.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-white text-lg">{service.name}</h3>
                                  <p className="text-sm text-gray-400 mb-2">{service.description}</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                                    <span className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {service.duration} phút
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-white">{formatPrice(service.price)}</div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              {service.features.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-300">
                                  <Check className="w-4 h-4 mr-2 text-green-400" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Barber Selection */}
                    <div>
                      <Label className="text-2xl font-semibold text-white mb-6 block flex items-center">
                        <User className="w-6 h-6 mr-2 text-cyan-400" />
                        Chọn Thợ Cắt Tóc
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {barbersData.map((barber) => (
                          <motion.div
                            key={barber.id}
                            className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                              selectedBarber === barber.id
                                ? 'border-purple-500 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 shadow-2xl'
                                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50'
                            }`}
                            onClick={() => setSelectedBarber(barber.id)}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-4">
                              <img
                                src={barber.image}
                                alt={barber.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                              />
                              <div className="flex-1">
                                <h3 className="font-bold text-white text-lg">{barber.name}</h3>
                                <p className="text-sm text-gray-400 mb-1">{barber.specialty}</p>
                                <p className="text-xs text-gray-500 mb-2">{barber.experience}</p>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-300 font-medium">{barber.rating}</span>
                                  <span className="text-xs text-gray-500">(200+ đánh giá)</span>
                                </div>
                              </div>
                              {selectedBarber === barber.id && (
                                <div className="text-purple-400">
                                  <Check className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time Selection */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Calendar */}
                      <div>
                        <Label className="text-2xl font-semibold text-white mb-6 block flex items-center">
                          <CalendarIcon className="w-6 h-6 mr-2 text-purple-400" />
                          Chọn Ngày
                        </Label>
                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            locale={vi}
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div>
                        <Label className="text-2xl font-semibold text-white mb-6 block flex items-center">
                          <Clock className="w-6 h-6 mr-2 text-cyan-400" />
                          Giờ Có Sẵn
                        </Label>
                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                          <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                            {timeSlots.map((time) => (
                              <motion.button
                                key={time}
                                className={`p-3 rounded-lg font-medium transition-all duration-300 ${
                                  selectedTime === time
                                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                                }`}
                                onClick={() => setSelectedTime(time)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {time}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Selected Info Preview */}
                    {selectedDate && selectedTime && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-2xl p-6 border border-purple-500/20"
                      >
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <Check className="w-5 h-5 mr-2 text-green-400" />
                          Thời Gian Đã Chọn
                        </h3>
                        <div className="text-gray-300">
                          <p className="text-xl font-medium">
                            {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: vi })} lúc {selectedTime}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Personal Information */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-white mb-3 block flex items-center text-lg">
                          <User className="w-5 h-5 mr-2 text-purple-400" />
                          Họ và Tên *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-gray-800/50 border-gray-700 text-white h-12 text-lg"
                          placeholder="Nhập họ và tên của bạn"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white mb-3 block flex items-center text-lg">
                          <Mail className="w-5 h-5 mr-2 text-cyan-400" />
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-gray-800/50 border-gray-700 text-white h-12 text-lg"
                          placeholder="Nhập địa chỉ email"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-white mb-3 block flex items-center text-lg">
                        <Phone className="w-5 h-5 mr-2 text-green-400" />
                        Số Điện Thoại *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white h-12 text-lg"
                        placeholder="Nhập số điện thoại (VD: 0901234567)"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-white mb-3 block flex items-center text-lg">
                        <MessageSquare className="w-5 h-5 mr-2 text-yellow-400" />
                        Yêu Cầu Đặc Biệt (Tùy chọn)
                      </Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="bg-gray-800/50 border-gray-700 text-white text-lg"
                        placeholder="Chia sẻ yêu cầu đặc biệt hoặc ghi chú thêm..."
                        rows={4}
                      />
                    </div>

                    {/* Booking Summary */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-2xl p-8 border border-purple-500/30">
                      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                        <Award className="w-6 h-6 mr-2 text-yellow-400" />
                        Tóm Tắt Đặt Lịch
                      </h3>
                      <div className="space-y-4 text-gray-300">
                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                          <span className="text-lg">Dịch vụ:</span>
                          <span className="text-white font-medium text-lg">{selectedServiceData?.name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                          <span className="text-lg">Thợ cắt tóc:</span>
                          <span className="text-white font-medium text-lg">{selectedBarberData?.name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                          <span className="text-lg">Ngày:</span>
                          <span className="text-white font-medium text-lg">
                            {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: vi }) : ''}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                          <span className="text-lg">Giờ:</span>
                          <span className="text-white font-medium text-lg">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 bg-gradient-to-r from-purple-800/20 to-cyan-800/20 rounded-lg px-4 mt-4">
                          <span className="text-xl font-semibold">Tổng cộng:</span>
                          <span className="text-3xl font-bold text-white">{selectedServiceData ? formatPrice(selectedServiceData.price) : ''}</span>
                        </div>
                      </div>
                    </div>

                    {/* Special Offers */}
                    <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl p-6 border border-yellow-500/30">
                      <div className="flex items-center space-x-2 mb-3">
                        <Gift className="w-6 h-6 text-yellow-400" />
                        <h4 className="text-lg font-semibold text-white">Ưu Đãi Đặc Biệt</h4>
                      </div>
                      <p className="text-gray-300">
                        🎉 Khách hàng mới được giảm 15% cho lần đầu sử dụng dịch vụ!
                        <br />
                        🎁 Tặng kèm gói chăm sóc tóc tại nhà trị giá 200.000₫
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-6 border-t border-gray-700">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 h-12 px-8 text-lg"
                >
                  <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
                  Quay Lại
                </Button>

                {currentStep < 3 ? (
                  <Button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !canProceedStep1) ||
                      (currentStep === 2 && !canProceedStep2)
                    }
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white h-12 px-8 text-lg shadow-lg"
                  >
                    Tiếp Theo
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white h-12 px-8 text-lg shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Xác Nhận Đặt Lịch
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-3xl p-10 max-w-lg w-full text-center relative overflow-hidden"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              {/* Success Animation Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 animate-pulse" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <Check className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-6">Đặt Lịch Thành Công!</h3>
                
                <div className="space-y-4 mb-8">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Cảm ơn bạn đã tin tưởng Premium Vietnamese Barbershop! 
                    Lịch hẹn của bạn đã được xác nhận thành công.
                  </p>
                  
                  <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Mã đặt lịch:</span>
                      <span className="text-white font-mono font-bold">
                        #BK{Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Thời gian:</span>
                      <span className="text-white">
                        {selectedDate && format(selectedDate, 'dd/MM/yyyy', { locale: vi })} - {selectedTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-gray-400">
                  <p>📧 Email xác nhận sẽ được gửi trong vòng 5 phút</p>
                  <p>📱 SMS nhắc nhở trước 2 giờ</p>
                  <p>🎁 Nhận ưu đãi đặc biệt khi đến cửa hàng</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PremiumBookingSection;