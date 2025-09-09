import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageCircle, TrendingUp, Award, Users, Calendar } from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

type FilterType = 'all' | 'positive' | 'neutral' | 'negative';

const CustomerReviewSystem = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const mockReviews: Review[] = [
    {
      id: '1',
      customerName: 'Nguyễn Minh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      service: 'Premium Cut + Styling',
      comment: 'Dịch vụ tuyệt vời! Thợ cắt tóc rất chuyên nghiệp và tận tâm. Không gian sang trọng, hiện đại. Tôi sẽ quay lại chắc chắn!',
      date: '2024-03-15',
      verified: true,
      helpful: 24,
      images: ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop'],
      sentiment: 'positive'
    },
    {
      id: '2',
      customerName: 'Trần Văn Hải',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      service: 'AI Style Consultation',
      comment: 'Công nghệ AI đề xuất kiểu tóc thật tuyệt vời! Kết quả vượt ngoài mong đợi. Đội ngũ rất chuyên nghiệp và thân thiện.',
      date: '2024-03-12',
      verified: true,
      helpful: 18,
      sentiment: 'positive'
    },
    {
      id: '3',
      customerName: 'Lê Thị Mai',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      service: 'Beard Grooming',
      comment: 'Dịch vụ chăm sóc râu rất tốt. Không gian thoải mái, nhân viên nhiệt tình. Giá cả hợp lý cho chất lượng dịch vụ.',
      date: '2024-03-10',
      verified: true,
      helpful: 12,
      sentiment: 'positive'
    }
  ];

  const services = ['all', 'Premium Cut + Styling', 'AI Style Consultation', 'Beard Grooming', 'VIP Package'];

  useEffect(() => {
    setReviews(mockReviews);
  }, []);

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = selectedFilter === 'all' || review.sentiment === selectedFilter;
    const matchesService = selectedService === 'all' || review.service === selectedService;
    return matchesFilter && matchesService;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const positivePercentage = (reviews.filter(r => r.sentiment === 'positive').length / totalReviews) * 100;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Khách Hàng Nói Gì
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hàng nghìn khách hàng tin tưởng và lựa chọn dịch vụ của chúng tôi
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-yellow-400 mr-2" />
                <span className="text-3xl font-bold text-white">{averageRating.toFixed(1)}</span>
              </div>
              <p className="text-gray-300">Đánh giá trung bình</p>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-cyan-400 mr-2" />
                <span className="text-3xl font-bold text-white">{totalReviews.toLocaleString()}</span>
              </div>
              <p className="text-gray-300">Tổng đánh giá</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-400 mr-2" />
                <span className="text-3xl font-bold text-white">{positivePercentage.toFixed(0)}%</span>
              </div>
              <p className="text-gray-300">Đánh giá tích cực</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-purple-400 mr-2" />
                <span className="text-3xl font-bold text-white">98%</span>
              </div>
              <p className="text-gray-300">Khách hàng quay lại</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          <div className="flex space-x-2">
            {(['all', 'positive', 'neutral', 'negative'] as FilterType[]).map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter)}
                className={`${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                    : 'border-purple-500/50 text-gray-300 hover:bg-purple-500/10'
                }`}
              >
                {filter === 'all' ? 'Tất cả' : 
                 filter === 'positive' ? 'Tích cực' :
                 filter === 'neutral' ? 'Trung tính' : 'Tiêu cực'}
              </Button>
            ))}
          </div>
          
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-black/50 border border-purple-500/50 text-white rounded-lg px-4 py-2"
          >
            {services.map((service) => (
              <option key={service} value={service}>
                {service === 'all' ? 'Tất cả dịch vụ' : service}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <AnimatePresence>
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.avatar} alt={review.customerName} />
                        <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-white font-semibold">{review.customerName}</h4>
                          {review.verified && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                              Đã xác thực
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-400 text-sm">{review.date}</span>
                        </div>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 mb-3">
                          {review.service}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">{review.comment}</p>
                    
                    {review.images && (
                      <div className="flex space-x-2 mb-4">
                        {review.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt="Review image"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Hữu ích ({review.helpful})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Trả lời
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Write Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Chia sẻ trải nghiệm của bạn
              </h3>
              <p className="text-gray-300 mb-6">
                Đánh giá của bạn giúp chúng tôi cải thiện dịch vụ và hỗ trợ khách hàng khác đưa ra lựa chọn tốt nhất
              </p>
              <Button
                onClick={() => setShowReviewForm(true)}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-full"
              >
                Viết đánh giá
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerReviewSystem;