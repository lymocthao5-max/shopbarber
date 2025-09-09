import React, { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Bot, 
  Wand2, 
  RotateCcw,
  Zap,
  Star,
  Scissors,
  Eye,
  Brain,
  Palette,
  Target,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  ChevronRight,
  Download,
  Share2
} from 'lucide-react';

interface StyleRecommendation {
  id: number;
  name: string;
  vietnameseName: string;
  confidence: number;
  description: string;
  vietnameseDescription: string;
  image: string;
  tags: string[];
  price: number;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  trendScore: number;
  faceShapeMatch: number;
  maintenanceLevel: 'Low' | 'Medium' | 'High';
  seasonalRecommendation: string;
}

interface FaceAnalysisResult {
  faceShape: string;
  skinTone: string;
  hairTexture: string;
  jawlineStrength: string;
  foreheadSize: string;
  confidence: number;
}

const EnhancedAIStyleRecommendation = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [faceAnalysis, setFaceAnalysis] = useState<FaceAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const recommendations: StyleRecommendation[] = [
    {
      id: 1,
      name: "Modern Fade",
      vietnameseName: "Fade Hiện Đại",
      confidence: 94,
      description: "A contemporary fade that complements your face shape perfectly",
      vietnameseDescription: "Kiểu fade hiện đại phù hợp hoàn hảo với khuôn mặt của bạn",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=400&fit=crop&crop=face",
      tags: ["Trendy", "Professional", "Low Maintenance"],
      price: 85,
      duration: 60,
      difficulty: 'Easy',
      trendScore: 95,
      faceShapeMatch: 92,
      maintenanceLevel: 'Low',
      seasonalRecommendation: 'All Season'
    },
    {
      id: 2,
      name: "Textured Quiff",
      vietnameseName: "Quiff Có Texture",
      confidence: 89,
      description: "Adds volume and texture while maintaining a sophisticated look",
      vietnameseDescription: "Tăng độ phồng và texture trong khi vẫn giữ vẻ lịch lãm",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
      tags: ["Stylish", "Versatile", "Medium Maintenance"],
      price: 95,
      duration: 75,
      difficulty: 'Medium',
      trendScore: 88,
      faceShapeMatch: 87,
      maintenanceLevel: 'Medium',
      seasonalRecommendation: 'Spring/Fall'
    },
    {
      id: 3,
      name: "Classic Pompadour",
      vietnameseName: "Pompadour Cổ Điển",
      confidence: 87,
      description: "Timeless elegance with a modern twist for your features",
      vietnameseDescription: "Vẻ đẹp vượt thời gian với nét hiện đại phù hợp với đặc điểm khuôn mặt",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
      tags: ["Classic", "Elegant", "High Impact"],
      price: 110,
      duration: 90,
      difficulty: 'Hard',
      trendScore: 82,
      faceShapeMatch: 85,
      maintenanceLevel: 'High',
      seasonalRecommendation: 'Winter/Summer'
    }
  ];

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const simulateAdvancedAnalysis = async () => {
    const steps = [
      { progress: 20, message: "Phát hiện khuôn mặt...", analysis: "face_detection" },
      { progress: 40, message: "Phân tích đặc điểm khuôn mặt...", analysis: "feature_analysis" },
      { progress: 60, message: "Đánh giá texture tóc...", analysis: "hair_analysis" },
      { progress: 80, message: "Tính toán độ phù hợp...", analysis: "compatibility" },
      { progress: 100, message: "Hoàn thành phân tích!", analysis: "complete" }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(step.progress);
      
      if (step.progress === 100) {
        setFaceAnalysis({
          faceShape: "Oval",
          skinTone: "Medium",
          hairTexture: "Straight",
          jawlineStrength: "Strong",
          foreheadSize: "Medium",
          confidence: 94
        });
      }
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    await simulateAdvancedAnalysis();
    
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setShowResults(false);
    setSelectedStyle(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setFaceAnalysis(null);
  };

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

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
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-600/5 to-orange-600/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
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
            <Brain className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-200">AI Thông Minh Nâng Cao</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Gợi Ý Kiểu Tóc
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Thông Minh
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Công nghệ AI tiên tiến phân tích khuôn mặt và đề xuất kiểu tóc phù hợp nhất với bạn
          </motion.p>
        </motion.div>

        {/* Enhanced Main Content */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Upload Section */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center space-x-2">
                    <Camera className="w-6 h-6 text-purple-400" />
                    <span>Tải Ảnh Của Bạn</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!selectedImage ? (
                    <div
                      className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-purple-500 transition-all duration-300 group"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-purple-400 transition-colors" />
                        <p className="text-gray-300 mb-2">Nhấp để tải ảnh của bạn</p>
                        <p className="text-sm text-gray-500">JPG, PNG tối đa 10MB</p>
                      </motion.div>
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
                        
                        {/* Enhanced Analysis Overlay */}
                        {isAnalyzing && (
                          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                            <div className="text-center">
                              <div className="relative mb-6">
                                <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
                                <Brain className="w-10 h-10 text-purple-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                              </div>
                              <div className="w-64 bg-gray-800 rounded-full h-2 mb-4">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${analysisProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-white font-medium">Đang phân tích đặc điểm khuôn mặt...</p>
                              <p className="text-gray-400 text-sm mt-2">{analysisProgress}% hoàn thành</p>
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
                              Đang phân tích...
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4 mr-2" />
                              Phân Tích AI
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

                  {/* Enhanced Features List */}
                  <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                      Tính Năng AI Nâng Cao
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">Nhận diện khuôn mặt</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-cyan-400" />
                        <span className="text-gray-300">Phân tích màu da</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-pink-400" />
                        <span className="text-gray-300">Đo độ phù hợp</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Xu hướng thời trang</span>
                      </div>
                    </div>
                  </div>

                  {/* Face Analysis Results */}
                  {faceAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-500/20"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Award className="w-5 h-5 text-green-400 mr-2" />
                        Kết Quả Phân Tích
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Khuôn mặt:</span>
                          <span className="text-white ml-2">{faceAnalysis.faceShape}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Màu da:</span>
                          <span className="text-white ml-2">{faceAnalysis.skinTone}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Texture tóc:</span>
                          <span className="text-white ml-2">{faceAnalysis.hairTexture}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Độ tin cậy:</span>
                          <span className="text-green-400 ml-2">{faceAnalysis.confidence}%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Results Section */}
            <motion.div variants={itemVariants}>
              <Card className="border-0 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-md h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <span>Gợi Ý Kiểu Tóc</span>
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
                          <p className="text-gray-400 text-lg">Tải ảnh để xem gợi ý AI</p>
                          <p className="text-gray-500 text-sm mt-2">AI sẽ phân tích và đề xuất kiểu tóc phù hợp nhất</p>
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
                            transition={{ delay: index * 0.15 }}
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
                                  className="w-20 h-24 object-cover rounded-lg"
                                />
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                  {style.confidence}%
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <h3 className="font-semibold text-white">{style.vietnameseName}</h3>
                                    <p className="text-sm text-gray-400">{style.name}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-white flex items-center">
                                      <DollarSign className="w-4 h-4" />
                                      {style.price}
                                    </div>
                                    <div className="text-xs text-gray-400 flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {style.duration} phút
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-gray-400 mb-3">{style.vietnameseDescription}</p>
                                
                                {/* Enhanced Style Metrics */}
                                <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                                  <div className="bg-purple-900/30 rounded px-2 py-1 text-center">
                                    <div className="text-purple-300">Xu hướng</div>
                                    <div className="text-white font-bold">{style.trendScore}%</div>
                                  </div>
                                  <div className="bg-cyan-900/30 rounded px-2 py-1 text-center">
                                    <div className="text-cyan-300">Phù hợp</div>
                                    <div className="text-white font-bold">{style.faceShapeMatch}%</div>
                                  </div>
                                  <div className="bg-green-900/30 rounded px-2 py-1 text-center">
                                    <div className="text-green-300">Bảo trì</div>
                                    <div className="text-white font-bold">{style.maintenanceLevel}</div>
                                  </div>
                                </div>
                                
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
                                    className="border-t border-gray-700 pt-3 space-y-3"
                                  >
                                    <div className="flex space-x-2">
                                      <Button
                                        onClick={scrollToBooking}
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                                      >
                                        <Scissors className="w-4 h-4 mr-2" />
                                        Đặt Lịch Ngay
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                      >
                                        <Share2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                    
                                    {/* Additional Style Info */}
                                    <div className="bg-gray-800/50 rounded-lg p-3 text-sm">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400">Độ khó thực hiện:</span>
                                        <span className={`font-medium ${
                                          style.difficulty === 'Easy' ? 'text-green-400' :
                                          style.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                                        }`}>{style.difficulty}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Phù hợp mùa:</span>
                                        <span className="text-white">{style.seasonalRecommendation}</span>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Enhanced AI Confidence Info */}
                        <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 rounded-xl p-4 border border-purple-500/20 mt-6">
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <span className="font-semibold text-white">Độ Tin Cậy AI</span>
                          </div>
                          <p className="text-sm text-gray-400">
                            AI đã phân tích {faceAnalysis ? '15+ đặc điểm khuôn mặt' : 'các đặc điểm'} của bạn để đưa ra những gợi ý cá nhân hóa với độ chính xác cao.
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

export default EnhancedAIStyleRecommendation;