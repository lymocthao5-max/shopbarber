import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Crown, 
  Star, 
  Gift, 
  Trophy, 
  Zap, 
  Calendar, 
  CreditCard,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Diamond,
  Heart,
  Target
} from 'lucide-react';

interface MembershipTier {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  minPoints: number;
  benefits: string[];
  discount: number;
  description: string;
}

interface UserStats {
  currentPoints: number;
  totalSpent: number;
  visitsThisYear: number;
  memberSince: string;
  currentTier: string;
  nextTier: string;
  pointsToNextTier: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'service' | 'product' | 'experience';
  image: string;
  available: boolean;
  expires?: string;
}

type TabType = 'overview' | 'rewards' | 'history';

const LoyaltyProgram = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    currentPoints: 2850,
    totalSpent: 15750000,
    visitsThisYear: 24,
    memberSince: '2022-03-15',
    currentTier: 'gold',
    nextTier: 'platinum',
    pointsToNextTier: 1150
  });

  const [selectedTab, setSelectedTab] = useState<TabType>('overview');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const membershipTiers: MembershipTier[] = [
    {
      id: 'bronze',
      name: 'Bronze Elite',
      icon: Award,
      color: 'text-amber-600',
      gradient: 'from-amber-600 to-amber-800',
      minPoints: 0,
      benefits: [
        'Tích điểm cho mỗi lần sử dụng dịch vụ',
        'Sinh nhật tặng voucher 100k',
        'Ưu tiên đặt lịch online'
      ],
      discount: 5,
      description: 'Thành viên mới của Elite Cuts'
    },
    {
      id: 'silver',
      name: 'Silver Elite',
      icon: Star,
      color: 'text-gray-400',
      gradient: 'from-gray-400 to-gray-600',
      minPoints: 1000,
      benefits: [
        'Tất cả quyền lợi Bronze',
        'Giảm giá 10% tất cả dịch vụ',
        'Tư vấn miễn phí với chuyên gia',
        'Ưu tiên hỗ trợ khách hàng'
      ],
      discount: 10,
      description: 'Khách hàng thân thiết'
    },
    {
      id: 'gold',
      name: 'Gold Elite',
      icon: Crown,
      color: 'text-yellow-500',
      gradient: 'from-yellow-500 to-yellow-700',
      minPoints: 2500,
      benefits: [
        'Tất cả quyền lợi Silver',
        'Giảm giá 15% tất cả dịch vụ',
        'Massage đầu miễn phí',
        'Tặng sản phẩm chăm sóc tóc',
        'Mời tham gia sự kiện VIP'
      ],
      discount: 15,
      description: 'Khách hàng VIP'
    }
  ];

  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Cắt tóc miễn phí',
      description: 'Một lần cắt tóc cơ bản hoàn toàn miễn phí',
      points: 500,
      category: 'service',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop',
      available: true
    },
    {
      id: '2',
      title: 'Gói VIP Premium',
      description: 'Trải nghiệm VIP đầy đủ với massage và styling',
      points: 1200,
      category: 'service',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop',
      available: true
    }
  ];

  const currentTierData = membershipTiers.find(tier => tier.id === userStats.currentTier);
  const nextTierData = membershipTiers.find(tier => tier.id === userStats.nextTier);
  const progressPercentage = currentTierData && nextTierData 
    ? ((userStats.currentPoints - currentTierData.minPoints) / (nextTierData.minPoints - currentTierData.minPoints)) * 100
    : 100;

  const handleRedeemReward = (reward: Reward) => {
    if (reward.points <= userStats.currentPoints && reward.available) {
      setSelectedReward(reward);
      setShowRedeemModal(true);
    }
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      setUserStats(prev => ({
        ...prev,
        currentPoints: prev.currentPoints - selectedReward.points
      }));
      setShowRedeemModal(false);
      setSelectedReward(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Elite Rewards
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Chương trình khách hàng thân thiết với những ưu đãi độc quyền
          </p>
        </motion.div>

        {/* User Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Tier */}
                <div className="text-center">
                  <div className="relative mb-4">
                    {currentTierData && (
                      <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${currentTierData.gradient} rounded-full flex items-center justify-center mb-4`}>
                        <currentTierData.icon className="w-10 h-10 text-white" />
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2">{currentTierData?.name}</h3>
                    <p className="text-gray-400">{currentTierData?.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Điểm hiện tại:</span>
                    <span className="text-2xl font-bold text-purple-400">{userStats.currentPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Tổng chi tiêu:</span>
                    <span className="text-xl font-semibold text-white">{userStats.totalSpent.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Lượt ghé thăm năm nay:</span>
                    <span className="text-xl font-semibold text-cyan-400">{userStats.visitsThisYear}</span>
                  </div>
                </div>

                {/* Progress to Next Tier */}
                <div>
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Tiến độ lên hạng</h4>
                    <p className="text-gray-400">Còn {userStats.pointsToNextTier} điểm để lên {nextTierData?.name}</p>
                  </div>
                  <Progress value={progressPercentage} className="mb-4" />
                  <div className="text-center">
                    <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
                      {progressPercentage.toFixed(0)}% hoàn thành
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex space-x-4 justify-center">
            {[
              { id: 'overview' as TabType, label: 'Tổng quan', icon: Trophy },
              { id: 'rewards' as TabType, label: 'Phần thưởng', icon: Gift },
              { id: 'history' as TabType, label: 'Lịch sử', icon: Calendar }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={selectedTab === id ? "default" : "outline"}
                onClick={() => setSelectedTab(id)}
                className={`${
                  selectedTab === id
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                    : 'border-purple-500/50 text-gray-300 hover:bg-purple-500/10'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Membership Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {membershipTiers.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className={`bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 ${
                      tier.id === userStats.currentTier ? 'ring-2 ring-purple-500' : ''
                    }`}>
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${tier.gradient} rounded-full flex items-center justify-center mb-4`}>
                          <tier.icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-white">{tier.name}</CardTitle>
                        <p className="text-gray-400 text-sm">{tier.description}</p>
                        <Badge className={`bg-gradient-to-r ${tier.gradient} text-white`}>
                          {tier.discount}% giảm giá
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {tier.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-gray-300 text-sm">{benefit}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <p className="text-gray-400 text-sm">
                            Từ {tier.minPoints.toLocaleString()} điểm
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                      <div className="relative">
                        <img
                          src={reward.image}
                          alt={reward.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                          {reward.category === 'service' ? 'Dịch vụ' : 
                           reward.category === 'product' ? 'Sản phẩm' : 'Trải nghiệm'}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{reward.title}</h3>
                        <p className="text-gray-300 mb-4">{reward.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span className="text-xl font-bold text-purple-400">{reward.points}</span>
                            <span className="text-gray-400">điểm</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRedeemReward(reward)}
                          disabled={!reward.available || reward.points > userStats.currentPoints}
                          className={`w-full ${
                            reward.available && reward.points <= userStats.currentPoints
                              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700'
                              : 'bg-gray-600 cursor-not-allowed'
                          }`}
                        >
                          {!reward.available ? 'Không khả dụng' :
                           reward.points > userStats.currentPoints ? 'Không đủ điểm' : 'Đổi thưởng'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-md border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Lịch sử giao dịch</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: '2024-03-15', action: 'Đổi thưởng: Cắt tóc miễn phí', points: -500, type: 'redeem' },
                      { date: '2024-03-10', action: 'Sử dụng dịch vụ: Premium Cut', points: +150, type: 'earn' },
                      { date: '2024-03-05', action: 'Bonus sinh nhật', points: +200, type: 'bonus' },
                      { date: '2024-02-28', action: 'Sử dụng dịch vụ: VIP Package', points: +250, type: 'earn' }
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{transaction.action}</p>
                          <p className="text-gray-400 text-sm">{transaction.date}</p>
                        </div>
                        <div className={`text-lg font-bold ${
                          transaction.type === 'redeem' ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {transaction.points > 0 ? '+' : ''}{transaction.points} điểm
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Redeem Modal */}
        <AnimatePresence>
          {showRedeemModal && selectedReward && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRedeemModal(false)}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8 max-w-md w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Xác nhận đổi thưởng</h3>
                <p className="text-gray-300 mb-6">
                  Bạn có chắc chắn muốn đổi {selectedReward.points} điểm để nhận "{selectedReward.title}"?
                </p>
                <div className="flex space-x-4">
                  <Button
                    onClick={confirmRedeem}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                  >
                    Xác nhận
                  </Button>
                  <Button
                    onClick={() => setShowRedeemModal(false)}
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Hủy
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoyaltyProgram;