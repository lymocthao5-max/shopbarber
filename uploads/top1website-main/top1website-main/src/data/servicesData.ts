import { Scissors, Sparkles, Crown, Zap, Star, Heart, Palette, LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category?: string;
  icon: LucideIcon;
  features: string[];
  popular?: boolean;
  color?: string;
  image?: string;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  image: string;
}

export interface AddOn {
  name: string;
  price: string;
}

// Centralized services data
export const servicesData: Service[] = [
  {
    id: 'signature',
    name: 'Cắt Tóc & Tạo Kiểu Đặc Biệt',
    description: 'Dịch vụ hàng đầu kết hợp kỹ thuật cắt tóc chính xác với tạo kiểu tiên tiến',
    price: 850000,
    duration: 60,
    category: 'Tạo kiểu',
    icon: Scissors,
    features: ['Phân Tích Tóc AI', 'Xem Trước 3D', 'Sản Phẩm Cao Cấp', 'Điều Trị Da Đầu'],
    color: 'from-purple-600 to-pink-600',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    popular: false
  },
  {
    id: 'royal',
    name: 'Liệu Trình Hoàng Gia',
    description: 'Trải nghiệm sang trọng tối thượng với dịch vụ khăn nóng và chăm sóc cao cấp',
    price: 1500000,
    duration: 90,
    category: 'Chăm sóc',
    icon: Crown,
    features: ['Dịch Vụ Khăn Nóng', 'Tạo Hình Râu', 'Massage Mặt', 'Chăm Sóc Sau Cao Cấp'],
    color: 'from-yellow-600 to-orange-600',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    popular: true
  },
  {
    id: 'express',
    name: 'Tạo Kiểu Nhanh',
    description: 'Tạo kiểu nhanh chóng và hiệu quả cho các chuyên gia hiện đại',
    price: 450000,
    duration: 30,
    category: 'Tạo kiểu',
    icon: Zap,
    features: ['Cắt Nhanh', 'Hoàn Thiện Kiểu', 'Ứng Dụng Sản Phẩm', 'Dịch Vụ Nhanh'],
    color: 'from-cyan-600 to-blue-600',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    popular: false
  },
  {
    id: 'vip',
    name: 'Trải Nghiệm VIP',
    description: 'Dịch vụ độc quyền với tư vấn cá nhân và tiện nghi cao cấp',
    price: 2000000,
    duration: 120,
    category: 'VIP',
    icon: Sparkles,
    features: ['Tư Vấn Cá Nhân', 'Phòng Suite Cao Cấp', 'Đồ Uống Miễn Phí', 'Bộ Chăm Sóc Sau'],
    color: 'from-purple-600 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    popular: false
  }
];

// Services for ServicesPage (with different pricing format for display)
export const servicesPageData = [
  {
    id: 1,
    name: "Cắt Tóc Classic",
    description: "Kiểu cắt tóc truyền thống với kỹ thuật chuyên nghiệp",
    price: "450,000₫",
    duration: "30 phút",
    icon: Scissors,
    features: ["Tư vấn kiểu tóc", "Cắt tóc chuyên nghiệp", "Gội đầu massage", "Tạo kiểu cơ bản"],
    popular: false
  },
  {
    id: 2,
    name: "Premium Styling",
    description: "Tạo kiểu cao cấp với sản phẩm nhập khẩu",
    price: "850,000₫",
    duration: "60 phút",
    icon: Sparkles,
    features: ["AI tư vấn kiểu tóc", "Cắt tóc cao cấp", "Gội đầu thảo dược", "Tạo kiểu chuyên nghiệp", "Chăm sóc da đầu"],
    popular: true
  },
  {
    id: 3,
    name: "Gentleman Package",
    description: "Gói dịch vụ toàn diện cho quý ông",
    price: "1,500,000₫",
    duration: "90 phút",
    icon: Heart,
    features: ["Cắt tóc + tạo kiểu", "Chăm sóc da mặt", "Massage thư giãn", "Cạo râu chuyên nghiệp", "Đồ uống miễn phí"],
    popular: false
  },
  {
    id: 4,
    name: "Color & Highlights",
    description: "Nhuộm tóc và tạo highlights chuyên nghiệp",
    price: "2,000,000₫",
    duration: "120 phút",
    icon: Palette,
    features: ["Tư vấn màu tóc", "Nhuộm tóc cao cấp", "Highlights chuyên nghiệp", "Dưỡng tóc sau nhuộm", "Bảo hành màu tóc"],
    popular: false
  }
];

// Centralized barbers data
export const barbersData: Barber[] = [
  {
    id: 'alex',
    name: 'Nguyễn Minh Tuấn',
    specialty: 'Chuyên Gia Cắt Tóc Hiện Đại',
    rating: 4.9,
    experience: '8 năm kinh nghiệm',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='12'%3ETuấn%3C/text%3E%3C/svg%3E"
  },
  {
    id: 'maria',
    name: 'Trần Thị Lan',
    specialty: 'Kiểu Tóc Cổ Điển',
    rating: 4.8,
    experience: '6 năm kinh nghiệm',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='12'%3ELan%3C/text%3E%3C/svg%3E"
  },
  {
    id: 'david',
    name: 'Lê Văn Hùng',
    specialty: 'Chuyên Gia Râu Mép',
    rating: 4.9,
    experience: '10 năm kinh nghiệm',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23999'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='12'%3EHùng%3C/text%3E%3C/svg%3E"
  },
  {
    id: 'sarah',
    name: 'Phạm Thị Mai',
    specialty: 'Chuyên Gia Màu Tóc',
    rating: 4.7,
    experience: '7 năm kinh nghiệm',
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23555'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='12'%3EMai%3C/text%3E%3C/svg%3E"
  }
];

// Add-on services
export const addOnsData: AddOn[] = [
  { name: "Gội đầu thảo dược", price: "50,000₫" },
  { name: "Massage da đầu", price: "80,000₫" },
  { name: "Chăm sóc da mặt cơ bản", price: "100,000₫" },
  { name: "Cạo râu", price: "60,000₫" },
  { name: "Tạo kiểu đặc biệt", price: "120,000₫" }
];

// Time slots
export const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
];

// Helper functions
export const getServiceById = (id: string): Service | undefined => {
  return servicesData.find(service => service.id === id);
};

export const getBarberById = (id: string): Barber | undefined => {
  return barbersData.find(barber => barber.id === id);
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN') + '₫';
};