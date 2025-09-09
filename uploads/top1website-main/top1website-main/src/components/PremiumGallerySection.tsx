import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Heart, 
  Share2, 
  Download, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Star,
  Camera
} from 'lucide-react';

const PremiumGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      category: 'cuts',
      title: 'Signature Fade',
      description: 'Precision fade with modern styling',
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3ESignature Fade%3C/text%3E%3C/svg%3E",
      likes: 234,
      views: 1200
    },
    {
      id: 2,
      type: 'video',
      category: 'process',
      title: 'Royal Treatment Process',
      description: 'Behind the scenes of our premium service',
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23111'/%3E%3Ccircle cx='200' cy='250' r='40' fill='%23666'/%3E%3Cpolygon points='185,235 185,265 215,250' fill='%23fff'/%3E%3Ctext x='50%25' y='70%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='14'%3ERoyal Treatment%3C/text%3E%3C/svg%3E",
      likes: 456,
      views: 2800,
      duration: '2:34'
    },
    {
      id: 3,
      type: 'image',
      category: 'styles',
      title: 'Modern Pompadour',
      description: 'Classic style with contemporary twist',
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3EModern Pompadour%3C/text%3E%3C/svg%3E",
      likes: 189,
      views: 890
    },
    {
      id: 4,
      type: 'image',
      category: 'beard',
      title: 'Sculpted Beard',
      description: 'Precision beard sculpting and styling',
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3ESculpted Beard%3C/text%3E%3C/svg%3E",
      likes: 312,
      views: 1450
    },
    {
      id: 5,
      type: 'video',
      category: 'transformation',
      title: 'Complete Makeover',
      description: 'Full transformation journey',
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23111'/%3E%3Ccircle cx='200' cy='250' r='40' fill='%23666'/%3E%3Cpolygon points='185,235 185,265 215,250' fill='%23fff'/%3E%3Ctext x='50%25' y='70%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='14'%3EComplete Makeover%3C/text%3E%3C/svg%3E",
      likes: 678,
      views: 3200,
      duration: '4:12'
    },
    {
      id: 6,
      type: 'image',
      category: 'cuts',
      title: 'Textured Crop',
      description: 'Modern textured crop with sharp lines',
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3ETextured Crop%3C/text%3E%3C/svg%3E",
      likes: 145,
      views: 720
    }
  ];

  const filters = [
    { id: 'all', label: 'All Work', count: galleryItems.length },
    { id: 'cuts', label: 'Haircuts', count: galleryItems.filter(item => item.category === 'cuts').length },
    { id: 'beard', label: 'Beard Work', count: galleryItems.filter(item => item.category === 'beard').length },
    { id: 'styles', label: 'Styling', count: galleryItems.filter(item => item.category === 'styles').length },
    { id: 'transformation', label: 'Transformations', count: galleryItems.filter(item => item.category === 'transformation').length }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsVideoPlaying(false);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = selectedImage;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(newIndex);
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateImage('prev');
        if (e.key === 'ArrowRight') navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
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
            <Camera className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-200">Our Portfolio</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Gallery of
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Witness the artistry and precision that defines our craft through our curated collection
          </motion.p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filters.map((filterItem) => (
            <motion.button
              key={filterItem.id}
              variants={itemVariants}
              onClick={() => setFilter(filterItem.id)}
              className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === filterItem.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{filterItem.label}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {filterItem.count}
                </span>
              </span>
              {filter === filterItem.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur opacity-75" />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          layout
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Card className="border-0 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4 text-red-400" />
                                <span className="text-sm text-gray-300">{item.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-gray-300">{item.views}</span>
                              </div>
                            </div>
                            
                            {item.type === 'video' && (
                              <div className="flex items-center space-x-2">
                                <Play className="w-4 h-4 text-white" />
                                <span className="text-sm text-gray-300">{item.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Type Indicator */}
                      {item.type === 'video' && (
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full p-2">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      )}

                      {/* Hover Actions */}
                      <div className="absolute top-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="bg-black/60 backdrop-blur-md border-0 text-white hover:bg-black/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle like
                          }}
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-black/60 backdrop-blur-md border-0 text-white hover:bg-black/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle share
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-6xl w-full max-h-full flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Buttons */}
              <Button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-md border-0 text-white hover:bg-black/80 z-10"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <Button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-md border-0 text-white hover:bg-black/80 z-10"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Close Button */}
              <Button
                className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border-0 text-white hover:bg-black/80 z-10"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Content */}
              <div className="relative bg-black rounded-2xl overflow-hidden max-w-4xl w-full">
                <div className="relative aspect-[4/5] md:aspect-video">
                  <img
                    src={filteredItems[selectedImage].image}
                    alt={filteredItems[selectedImage].title}
                    className="w-full h-full object-cover"
                  />
                  
                  {filteredItems[selectedImage].type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        className="bg-black/60 backdrop-blur-md border-0 text-white hover:bg-black/80 p-4 rounded-full"
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      >
                        {isVideoPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Info Panel */}
                <div className="p-6 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {filteredItems[selectedImage].title}
                      </h3>
                      <p className="text-gray-300">
                        {filteredItems[selectedImage].description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        className="bg-white/10 backdrop-blur-md border-0 text-white hover:bg-white/20"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/10 backdrop-blur-md border-0 text-white hover:bg-white/20"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span className="text-white font-medium">{filteredItems[selectedImage].likes}</span>
                      <span className="text-gray-400">likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">{filteredItems[selectedImage].views}</span>
                      <span className="text-gray-400">views</span>
                    </div>
                    {filteredItems[selectedImage].type === 'video' && (
                      <div className="flex items-center space-x-2">
                        <Play className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium">{filteredItems[selectedImage].duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PremiumGallerySection;