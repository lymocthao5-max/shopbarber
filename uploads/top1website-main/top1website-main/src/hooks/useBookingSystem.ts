import { useState, useEffect, useCallback } from 'react';

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  barber: string;
  bookingDate: string;
  bookingTime: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

export interface Barber {
  id: string;
  name: string;
  nickname: string;
  specialties: string[];
  isAvailable: boolean;
}

const STORAGE_KEYS = {
  BOOKINGS: 'barbershop_bookings',
  SERVICES: 'barbershop_services',
  BARBERS: 'barbershop_barbers'
};

// Initial data
const initialServices: Service[] = [
  {
    id: '1',
    name: 'Cắt tóc cổ điển',
    price: 500000,
    duration: 60,
    description: 'Cắt tóc theo phong cách cổ điển với kỹ thuật chuyên nghiệp'
  },
  {
    id: '2',
    name: 'Cạo râu hoàng gia',
    price: 350000,
    duration: 45,
    description: 'Dịch vụ cạo râu cao cấp với dao cạo truyền thống'
  },
  {
    id: '3',
    name: 'Tạo hình râu',
    price: 400000,
    duration: 30,
    description: 'Tạo kiểu râu theo yêu cầu khách hàng'
  },
  {
    id: '4',
    name: 'Cắt tóc trẻ em',
    price: 300000,
    duration: 45,
    description: 'Cắt tóc dành riêng cho trẻ em với không gian thân thiện'
  },
  {
    id: '5',
    name: 'Gói VIP toàn diện',
    price: 900000,
    duration: 120,
    description: 'Gói dịch vụ cao cấp bao gồm cắt tóc, cạo râu và massage đầu'
  },
  {
    id: '6',
    name: 'Tạo kiểu nhanh',
    price: 150000,
    duration: 30,
    description: 'Dịch vụ tạo kiểu nhanh cho những ai bận rộn'
  }
];

const initialBarbers: Barber[] = [
  {
    id: '1',
    name: 'Minh Nguyễn',
    nickname: 'Razor',
    specialties: ['Cắt tóc cổ điển', 'Cạo râu hoàng gia'],
    isAvailable: true
  },
  {
    id: '2',
    name: 'Tuấn Trần',
    nickname: 'Fade',
    specialties: ['Tạo kiểu hiện đại', 'Fade cuts'],
    isAvailable: true
  },
  {
    id: '3',
    name: 'Hùng Lê',
    nickname: 'Beard',
    specialties: ['Tạo hình râu', 'Chăm sóc râu'],
    isAvailable: true
  }
];

export const useBookingSystem = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize data
  useEffect(() => {
    const storedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
    const storedBarbers = localStorage.getItem(STORAGE_KEYS.BARBERS);

    setBookings(storedBookings ? JSON.parse(storedBookings) : []);
    setServices(storedServices ? JSON.parse(storedServices) : initialServices);
    setBarbers(storedBarbers ? JSON.parse(storedBarbers) : initialBarbers);

    // Initialize services and barbers if not exists
    if (!storedServices) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServices));
    }
    if (!storedBarbers) {
      localStorage.setItem(STORAGE_KEYS.BARBERS, JSON.stringify(initialBarbers));
    }
  }, []);

  // Save bookings to localStorage
  const saveBookings = useCallback((newBookings: Booking[]) => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(newBookings));
    setBookings(newBookings);
  }, []);

  // Create a new booking
  const createBooking = useCallback(async (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; message: string; booking?: Booking }> => {
    setLoading(true);
    
    try {
      // Get current bookings from localStorage to ensure we have the latest data
      const currentBookingsStr = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      const currentBookings = currentBookingsStr ? JSON.parse(currentBookingsStr) : [];
      
      // Check for conflicts
      const conflict = currentBookings.find((booking: Booking) => 
        booking.bookingDate === bookingData.bookingDate &&
        booking.bookingTime === bookingData.bookingTime &&
        booking.barber === bookingData.barber &&
        booking.status !== 'cancelled'
      );

      if (conflict) {
        setLoading(false);
        return {
          success: false,
          message: `Thời gian này đã được đặt bởi ${conflict.customerName}. Vui lòng chọn thời gian khác.`
        };
      }

      // Create new booking
      const newBooking: Booking = {
        ...bookingData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const updatedBookings = [...currentBookings, newBooking];
      saveBookings(updatedBookings);

      setLoading(false);
      return {
        success: true,
        message: 'Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn để xác nhận.',
        booking: newBooking
      };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: 'Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.'
      };
    }
  }, [saveBookings]);

  // Get available time slots for a specific date and barber
  const getAvailableTimeSlots = useCallback((date: string, barber: string): string[] => {
    const allTimeSlots = [
      "09:00", "10:00", "11:00", "12:00", "13:00", 
      "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
    ];

    // Get current bookings from localStorage to ensure we have the latest data
    const currentBookingsStr = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    const currentBookings = currentBookingsStr ? JSON.parse(currentBookingsStr) : [];

    const bookedSlots = currentBookings
      .filter((booking: Booking) => 
        booking.bookingDate === date &&
        booking.barber === barber &&
        booking.status !== 'cancelled'
      )
      .map((booking: Booking) => booking.bookingTime);

    return allTimeSlots.filter(slot => !bookedSlots.includes(slot));
  }, []);

  // Get bookings for a specific date
  const getBookingsByDate = useCallback((date: string): Booking[] => {
    return bookings.filter(booking => booking.bookingDate === date);
  }, [bookings]);

  // Update booking status
  const updateBookingStatus = useCallback((bookingId: string, status: Booking['status']): boolean => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    saveBookings(updatedBookings);
    return true;
  }, [bookings, saveBookings]);

  // Get booking statistics - memoized to prevent infinite loops
  const getBookingStats = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);

    return {
      total: bookings.length,
      today: bookings.filter(b => b.bookingDate === today).length,
      thisMonth: bookings.filter(b => b.bookingDate.startsWith(thisMonth)).length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length
    };
  }, [bookings]);

  return {
    bookings,
    services,
    barbers,
    loading,
    createBooking,
    getAvailableTimeSlots,
    getBookingsByDate,
    updateBookingStatus,
    getBookingStats
  };
};