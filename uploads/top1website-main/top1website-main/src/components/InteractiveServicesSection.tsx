import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Star, 
  Clock, 
  DollarSign, 
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { servicesData, formatPrice } from '../data/servicesData';

const InteractiveServicesSection = () => {
  const [selectedService, setSelectedService] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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
    hidden: { opacity: 0, y: 50 },
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

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
          alt="Barbershop Services"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-200">Dịch Vụ Cao Cấp</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Dịch Vụ Đặc Biệt
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Của Chúng Tôi
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Trải nghiệm sự kết hợp hoàn hảo giữa nghề thủ công truyền thống và đổi mới hiện đại
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Service Cards */}
          <div className="space-y-6">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={`group cursor-pointer transition-all duration-500 ${
                  selectedService === index ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setSelectedService(index)}
              >
                <Card className={`relative overflow-hidden border-0 bg-gradient-to-br ${
                  selectedService === index 
                    ? 'from-purple-900/40 to-cyan-900/40 shadow-2xl shadow-purple-500/20' 
                    : 'from-gray-900/60 to-black/60 hover:from-gray-800/60 hover:to-gray-900/60'
                } backdrop-blur-md transition-all duration-500`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${service.color} shadow-lg`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                          <p className="text-gray-400 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                        selectedService === index ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-lg font-semibold text-white">{formatPrice(service.price)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-400">{service.duration} phút</span>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedService === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-700 pt-4"
                        >
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
                                <span className="text-sm text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <Button
                            onClick={scrollToBooking}
                            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium rounded-full transition-all duration-300"
                          >
                            Đặt Lịch Dịch Vụ Này
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Interactive Preview */}
          <motion.div
            variants={itemVariants}
            className="lg:sticky lg:top-24 h-fit"
          >
            <Card className="border-0 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                  <img
                    src={servicesData[selectedService].image}
                    alt={servicesData[selectedService].name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {servicesData[selectedService].name}
                          </h3>
                          <p className="text-gray-300">
                            {servicesData[selectedService].description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white/10"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white/10"
                            onClick={() => setIsMuted(!isMuted)}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {formatPrice(servicesData[selectedService].price)}
                  </motion.div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {servicesData[selectedService].features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center space-x-2 p-3 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-lg border border-purple-500/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Button
            onClick={scrollToBooking}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
          >
            <span className="relative z-10 flex items-center">
              Đặt Lịch Trải Nghiệm Cao Cấp
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveServicesSection;