import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Bot, 
  Wand2, 
  Eye, 
  Heart, 
  Share2,
  Download,
  RotateCcw,
  Zap,
  Star,
  Crown,
  Scissors
} from 'lucide-react';

const AIStyleRecommendation = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const recommendations = [
    {
      id: 1,
      name: "Modern Fade",
      confidence: 94,
      description: "A contemporary fade that complements your face shape perfectly",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3EModern Fade%3C/text%3E%3C/svg%3E",
      tags: ["Trendy", "Professional", "Low Maintenance"],
      price: 85,
      duration: 60
    },
    {
      id: 2,
      name: "Textured Quiff",
      confidence: 89,
      description: "Adds volume and texture while maintaining a sophisticated look",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3ETextured Quiff%3C/text%3E%3C/svg%3E",
      tags: ["Stylish", "Versatile", "Medium Maintenance"],
      price: 95,
      duration: 75
    },
    {
      id: 3,
      name: "Classic Pompadour",
      confidence: 87,
      description: "Timeless elegance with a modern twist for your features",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3EClassic Pompadour%3C/text%3E%3C/svg%3E",
      tags: ["Classic", "Elegant", "High Impact"],
      price: 110,
      duration: 90
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setShowResults(false);
    setSelectedStyle(null);
    setIsAnalyzing(false);
  };

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

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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
            <Bot className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-200">AI-Powered Styling</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Style
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Recommendations
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Upload your photo and let our advanced AI analyze your features to recommend the perfect hairstyle
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center space-x-2">
                    <Camera className="w-6 h-6 text-purple-400" />
                    <span>Upload Your Photo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!selectedImage ? (
                    <div
                      className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500 transition-colors duration-300"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Click to upload your photo</p>
                      <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative aspect-[3/4] bg-black rounded-xl overflow-hidden">
                        <img
                          src={selectedImage}
                          alt="Uploaded photo"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Analysis Overlay */}
                        {isAnalyzing && (
                          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                            <div className="text-center">
                              <div className="relative">
                                <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                                <Bot className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                              </div>
                              <p className="text-white font-medium">Analyzing your features...</p>
                              <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          onClick={analyzeImage}
                          disabled={isAnalyzing}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4 mr-2" />
                              Analyze Style
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={resetAnalysis}
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Features List */}
                  <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                      AI Analysis Features
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">Face Shape Detection</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">Hair Texture Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <span className="text-gray-300">Style Compatibility</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">Maintenance Level</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <span>Style Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {!showResults ? (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center h-96 text-center"
                      >
                        <div>
                          <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400 text-lg">Upload a photo to see AI recommendations</p>
                          <p className="text-gray-500 text-sm mt-2">Our AI will analyze your features and suggest perfect styles</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {recommendations.map((style, index) => (
                          <motion.div
                            key={style.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`group cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                              selectedStyle === style.id
                                ? 'border-purple-500 bg-gradient-to-r from-purple-900/30 to-cyan-900/30'
                                : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                            }`}
                            onClick={() => setSelectedStyle(style.id)}
                          >
                            <div className="flex items-start space-x-4">
                              <div className="relative">
                                <img
                                  src={style.image}
                                  alt={style.name}
                                  className="w-16 h-20 object-cover rounded-lg"
                                />
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                  {style.confidence}%
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-semibold text-white">{style.name}</h3>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-white">${style.price}</div>
                                    <div className="text-xs text-gray-400">{style.duration} min</div>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-gray-400 mb-3">{style.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {style.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                {selectedStyle === style.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="border-t border-gray-700 pt-3"
                                  >
                                    <Button
                                      onClick={scrollToBooking}
                                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                                    >
                                      <Scissors className="w-4 h-4 mr-2" />
                                      Book This Style
                                    </Button>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-xl p-4 border border-purple-500/20 mt-6">
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span className="font-semibold text-white">AI Confidence Score</span>
                          </div>
                          <p className="text-sm text-gray-400">
                            Our AI analyzed your facial features, hair type, and bone structure to provide these personalized recommendations with confidence scores.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIStyleRecommendation;