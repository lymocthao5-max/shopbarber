import React from 'react';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import EnhancedAIStyleRecommendation from '../components/EnhancedAIStyleRecommendation';

const AIStylePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="AI Style Recommendation"
        description="Sử dụng công nghệ AI để tìm kiểu tóc phù hợp nhất với khuôn mặt của bạn. Tư vấn style cá nhân hóa và chuyên nghiệp."
        keywords="AI tư vấn kiểu tóc, style recommendation, face analysis, hairstyle AI"
        canonicalUrl="https://premiumbarbershop.vn/ai-style"
      />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              AI Style Recommendation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Khám phá kiểu tóc hoàn hảo cho bạn với công nghệ AI tiên tiến. Phân tích khuôn mặt và đưa ra gợi ý phù hợp nhất.
            </p>
          </div>

          <EnhancedAIStyleRecommendation />
        </div>
      </div>
    </>
  );
};

export default AIStylePage;