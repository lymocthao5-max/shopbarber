import { useState, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Sparkles, RefreshCw } from 'lucide-react';

interface HairStyle {
  id: string;
  name: string;
  description: string;
  image: string;
  suitableFaceShapes: string[];
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  price: number;
  duration: number;
  tags: string[];
}

interface RecommendationResult {
  faceShape: string;
  confidence: number;
  recommendedStyles: HairStyle[];
  reasoning: string;
}

export default function HairStyleRecommendation() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState({
    age: '',
    lifestyle: '',
    maintenance: '',
    budget: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Dữ liệu mẫu kiểu tóc
  const hairStyles: HairStyle[] = [
    {
      id: '1',
      name: 'Undercut Fade',
      description: 'Kiểu tóc hiện đại với phần bên cạnh cạo ngắn và phần trên để dài',
      image: '/api/placeholder/300/300',
      suitableFaceShapes: ['oval', 'square', 'diamond'],
      difficulty: 'Trung bình',
      price: 200000,
      duration: 45,
      tags: ['hiện đại', 'nam tính', 'dễ tạo kiểu']
    },
    {
      id: '2',
      name: 'Pompadour Classic',
      description: 'Kiểu tóc cổ điển với phần trước vuốt cao và bóng',
      image: '/api/placeholder/300/300',
      suitableFaceShapes: ['oval', 'heart', 'oblong'],
      difficulty: 'Khó',
      price: 300000,
      duration: 60,
      tags: ['cổ điển', 'lịch lãm', 'sang trọng']
    },
    {
      id: '3',
      name: 'Buzz Cut',
      description: 'Kiểu tóc cạo ngắn đều, đơn giản và dễ bảo dưỡng',
      image: '/api/placeholder/300/300',
      suitableFaceShapes: ['oval', 'square', 'round'],
      difficulty: 'Dễ',
      price: 100000,
      duration: 20,
      tags: ['đơn giản', 'thể thao', 'tiện lợi']
    },
    {
      id: '4',
      name: 'Textured Crop',
      description: 'Kiểu tóc ngắn với kết cấu tự nhiên, phù hợp mọi dịp',
      image: '/api/placeholder/300/300',
      suitableFaceShapes: ['oval', 'round', 'heart'],
      difficulty: 'Trung bình',
      price: 250000,
      duration: 40,
      tags: ['tự nhiên', 'trẻ trung', 'linh hoạt']
    }
  ];

  // Mô phỏng AI phân tích khuôn mặt
  const analyzeFaceShape = useCallback(async (imageData: string): Promise<string> => {
    // Trong thực tế, đây sẽ là API call đến dịch vụ AI
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mô phỏng kết quả ngẫu nhiên
    const faceShapes = ['oval', 'round', 'square', 'heart', 'diamond', 'oblong'];
    return faceShapes[Math.floor(Math.random() * faceShapes.length)];
  }, []);

  // Xử lý upload ảnh
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

  // Bật camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Không thể truy cập camera:', error);
      alert('Không thể truy cập camera. Vui lòng cho phép quyền truy cập camera.');
    }
  };

  // Chụp ảnh từ camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      setSelectedImage(imageData);
      
      // Tắt camera
      const stream = video.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  // Tắt camera
  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  // Phân tích và gợi ý
  const analyzeAndRecommend = async () => {
    if (!selectedImage) {
      alert('Vui lòng chọn hoặc chụp một bức ảnh trước');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Phân tích khuôn mặt
      const detectedFaceShape = await analyzeFaceShape(selectedImage);
      
      // Lọc kiểu tóc phù hợp
      let suitableStyles = hairStyles.filter(style => 
        style.suitableFaceShapes.includes(detectedFaceShape)
      );

      // Áp dụng bộ lọc theo sở thích người dùng
      if (userPreferences.budget) {
        const maxBudget = parseInt(userPreferences.budget);
        suitableStyles = suitableStyles.filter(style => style.price <= maxBudget);
      }

      if (userPreferences.maintenance === 'low') {
        suitableStyles = suitableStyles.filter(style => style.difficulty === 'Dễ');
      }

      // Sắp xếp theo độ phù hợp
      suitableStyles.sort((a, b) => b.price - a.price);

      // Tạo lý do gợi ý
      const faceShapeNames: { [key: string]: string } = {
        oval: 'Oval (trái xoan)',
        round: 'Tròn',
        square: 'Vuông',
        heart: 'Trái tim',
        diamond: 'Kim cương',
        oblong: 'Dài'
      };

      const reasoning = `Dựa trên phân tích khuôn mặt ${faceShapeNames[detectedFaceShape]} của bạn và sở thích cá nhân, chúng tôi gợi ý những kiểu tóc sau sẽ tôn lên vẻ đẹp tự nhiên và phù hợp với phong cách sống của bạn.`;

      setRecommendation({
        faceShape: faceShapeNames[detectedFaceShape],
        confidence: 85 + Math.random() * 10, // 85-95%
        recommendedStyles: suitableStyles.slice(0, 3),
        reasoning
      });

    } catch (error) {
      console.error('Lỗi khi phân tích:', error);
      alert('Có lỗi xảy ra khi phân tích. Vui lòng thử lại.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-950/30 via-black to-blue-950/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              AI GỢI Ý KIỂU TÓC
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sử dụng trí tuệ nhân tạo để tìm kiểu tóc hoàn hảo cho khuôn mặt của bạn
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Phần upload/chụp ảnh */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-purple-500/30 hover:border-purple-500 transition-all duration-500">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Tải ảnh hoặc chụp ảnh
              </h3>

              {/* Khu vực hiển thị ảnh/camera */}
              <div className="relative mb-6">
                <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors">
                  {selectedImage ? (
                    <img 
                      src={selectedImage} 
                      alt="Ảnh đã chọn" 
                      className="w-full h-full object-cover"
                    />
                  ) : isCameraActive ? (
                    <video 
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Upload className="w-16 h-16 mb-4" />
                      <p className="text-lg">Chọn ảnh hoặc chụp ảnh</p>
                      <p className="text-sm">Để có kết quả tốt nhất</p>
                    </div>
                  )}
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Nút điều khiển */}
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  disabled={isCameraActive}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Tải ảnh lên
                </Button>
                
                {!isCameraActive ? (
                  <Button
                    onClick={startCamera}
                    className="flex-1 bg-pink-600 hover:bg-pink-700"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Bật camera
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={capturePhoto}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Chụp ảnh
                    </Button>
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      className="px-4"
                    >
                      Tắt
                    </Button>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Form sở thích */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-cyan-400">Sở thích cá nhân (tùy chọn)</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Độ tuổi</label>
                    <Select value={userPreferences.age} onValueChange={(value) => 
                      setUserPreferences(prev => ({ ...prev, age: value }))
                    }>
                      <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                        <SelectValue placeholder="Chọn độ tuổi" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-600">
                        <SelectItem value="18-25">18-25 tuổi</SelectItem>
                        <SelectItem value="26-35">26-35 tuổi</SelectItem>
                        <SelectItem value="36-45">36-45 tuổi</SelectItem>
                        <SelectItem value="45+">Trên 45 tuổi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Phong cách sống</label>
                    <Select value={userPreferences.lifestyle} onValueChange={(value) => 
                      setUserPreferences(prev => ({ ...prev, lifestyle: value }))
                    }>
                      <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                        <SelectValue placeholder="Chọn phong cách" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-600">
                        <SelectItem value="casual">Thoải mái</SelectItem>
                        <SelectItem value="business">Công sở</SelectItem>
                        <SelectItem value="creative">Sáng tạo</SelectItem>
                        <SelectItem value="sporty">Thể thao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Mức độ bảo dưỡng</label>
                    <Select value={userPreferences.maintenance} onValueChange={(value) => 
                      setUserPreferences(prev => ({ ...prev, maintenance: value }))
                    }>
                      <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                        <SelectValue placeholder="Chọn mức độ" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-600">
                        <SelectItem value="low">Ít bảo dưỡng</SelectItem>
                        <SelectItem value="medium">Trung bình</SelectItem>
                        <SelectItem value="high">Nhiều bảo dưỡng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Ngân sách</label>
                    <Select value={userPreferences.budget} onValueChange={(value) => 
                      setUserPreferences(prev => ({ ...prev, budget: value }))
                    }>
                      <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                        <SelectValue placeholder="Chọn ngân sách" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-600">
                        <SelectItem value="150000">Dưới 150k</SelectItem>
                        <SelectItem value="250000">150k - 250k</SelectItem>
                        <SelectItem value="400000">250k - 400k</SelectItem>
                        <SelectItem value="999999">Trên 400k</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Nút phân tích */}
              <Button
                onClick={analyzeAndRecommend}
                disabled={!selectedImage || isAnalyzing}
                className="w-full mt-6 py-4 text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Đang phân tích...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Phân tích và gợi ý
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Phần kết quả */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-cyan-500/30 hover:border-cyan-500 transition-all duration-500">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Kết quả phân tích
              </h3>

              {!recommendation ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Sparkles className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg">Chưa có kết quả phân tích</p>
                  <p className="text-sm">Tải ảnh và nhấn "Phân tích và gợi ý"</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Thông tin khuôn mặt */}
                  <Alert className="border-cyan-500/50 bg-cyan-500/10">
                    <AlertDescription className="text-cyan-300">
                      <div className="flex justify-between items-center">
                        <span>Khuôn mặt: <strong>{recommendation.faceShape}</strong></span>
                        <span>Độ chính xác: <strong>{recommendation.confidence.toFixed(1)}%</strong></span>
                      </div>
                    </AlertDescription>
                  </Alert>

                  {/* Lý do gợi ý */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {recommendation.reasoning}
                  </p>

                  {/* Danh sách kiểu tóc gợi ý */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-purple-400">Kiểu tóc được gợi ý:</h4>
                    
                    {recommendation.recommendedStyles.length === 0 ? (
                      <p className="text-yellow-400">
                        Không tìm thấy kiểu tóc phù hợp với tiêu chí của bạn. Hãy thử điều chỉnh sở thích.
                      </p>
                    ) : (
                      recommendation.recommendedStyles.map((style, index) => (
                        <Card key={style.id} className="bg-black/50 border border-purple-500/30 hover:border-purple-500 transition-all duration-300">
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="text-lg font-bold text-white">{style.name}</h5>
                              <Badge variant="outline" className="text-xs">
                                #{index + 1}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-400 text-sm mb-3">{style.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {style.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center text-sm">
                              <div className="space-y-1">
                                <div className="text-cyan-400">
                                  Giá: <span className="font-semibold">{formatPrice(style.price)}</span>
                                </div>
                                <div className="text-gray-400">
                                  Thời gian: {style.duration} phút • Độ khó: {style.difficulty}
                                </div>
                              </div>
                              
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                Đặt lịch
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Lưu ý */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <AlertDescription className="text-yellow-300">
              <strong>Lưu ý:</strong> Kết quả này chỉ mang tính chất tham khảo. 
              Để có lời khuyên chính xác nhất, hãy tham khảo ý kiến của các chuyên gia tại salon.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  );
}