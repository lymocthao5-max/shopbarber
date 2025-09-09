import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Premium Vietnamese Barbershop',
  description = 'Trải nghiệm cắt tóc cao cấp với công nghệ AI và dịch vụ chuyên nghiệp tại Premium Vietnamese Barbershop',
  keywords = 'barbershop, cắt tóc, premium, AI styling, Vietnamese barbershop',
  canonicalUrl = 'https://premiumbarbershop.vn',
  ogImage = 'https://premiumbarbershop.vn/og-image.jpg',
  ogType = 'website'
}) => {
  // Fallback to document.title if Helmet fails
  React.useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  try {
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Premium Vietnamese Barbershop" />
        <meta httpEquiv="Content-Language" content="vi" />
      </Helmet>
    );
  } catch (error) {
    console.warn('SEOHead: Helmet error, falling back to basic title setting', error);
    return null;
  }
};

export default SEOHead;