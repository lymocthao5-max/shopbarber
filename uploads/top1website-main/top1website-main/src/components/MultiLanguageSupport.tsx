import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Check, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const languages: Language[] = [
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' }
];

const translations: Translations = {
  vi: {
    'hero.title': 'ELITE CUTS',
    'hero.subtitle': 'Trải nghiệm tương lai của việc chăm sóc tóc với công nghệ AI tiên tiến và dịch vụ cao cấp định nghĩa lại sự sang trọng trong nghề cắt tóc.',
    'hero.cta.book': 'Đặt Lịch Trải Nghiệm Cao Cấp',
    'hero.cta.video': 'Xem Video Giới Thiệu',
    'nav.home': 'Trang Chủ',
    'nav.about': 'Giới Thiệu',
    'nav.services': 'Dịch Vụ',
    'nav.gallery': 'Thư Viện',
    'nav.booking': 'Đặt Lịch',
    'nav.contact': 'Liên Hệ',
    'services.title': 'Dịch Vụ Cao Cấp',
    'booking.title': 'Đặt Lịch Hẹn',
    'contact.title': 'Liên Hệ Với Chúng Tôi'
  },
  en: {
    'hero.title': 'ELITE CUTS',
    'hero.subtitle': 'Experience the future of hair care with advanced AI technology and premium services that redefine luxury in barbering.',
    'hero.cta.book': 'Book Premium Experience',
    'hero.cta.video': 'Watch Introduction Video',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.booking': 'Booking',
    'nav.contact': 'Contact',
    'services.title': 'Premium Services',
    'booking.title': 'Book Appointment',
    'contact.title': 'Contact Us'
  },
  zh: {
    'hero.title': '精英剪发',
    'hero.subtitle': '体验未来的头发护理，采用先进的AI技术和高端服务，重新定义理发的奢华。',
    'hero.cta.book': '预约高端体验',
    'hero.cta.video': '观看介绍视频',
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.services': '服务',
    'nav.gallery': '作品集',
    'nav.booking': '预约',
    'nav.contact': '联系我们',
    'services.title': '高端服务',
    'booking.title': '预约服务',
    'contact.title': '联系我们'
  }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('vi');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations['vi'][key] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage } = useLanguage();
  
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="border-purple-500/50 text-gray-300 hover:bg-purple-500/10 flex items-center space-x-2"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 right-0 z-50 min-w-[200px]"
            >
              <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md border border-purple-500/30 shadow-2xl">
                <CardContent className="p-2">
                  {languages.map((language) => (
                    <Button
                      key={language.code}
                      variant="ghost"
                      onClick={() => {
                        setLanguage(language.code);
                        setIsOpen(false);
                      }}
                      className="w-full justify-start text-left hover:bg-purple-500/10 text-gray-300 hover:text-white"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{language.flag}</span>
                        <div className="flex-1">
                          <div className="font-medium">{language.nativeName}</div>
                          <div className="text-xs text-gray-500">{language.name}</div>
                        </div>
                        {currentLanguage === language.code && (
                          <Check className="w-4 h-4 text-purple-400" />
                        )}
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;