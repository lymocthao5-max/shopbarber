const BookingRepository = require('../repositories/BookingRepository');
const ServiceRepository = require('../repositories/ServiceRepository');
const BarberRepository = require('../repositories/BarberRepository');
const UserRepository = require('../repositories/UserRepository');

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
    this.serviceRepository = new ServiceRepository();
    this.barberRepository = new BarberRepository();
    this.userRepository = new UserRepository();
  }

  async createBooking(bookingData) {
    try {
      // Validate service exists
      const service = await this.serviceRepository.findById(bookingData.serviceId);
      if (!service || !service.isActive) {
        throw new Error('Service not found or inactive');
      }

      // Validate barber exists and is available
      const barber = await this.barberRepository.findById(bookingData.barberId);
      if (!barber || !barber.isAvailable) {
        throw new Error('Barber not found or unavailable');
      }

      // Check for time conflicts
      const conflict = await this.bookingRepository.findConflict(
        bookingData.bookingDate,
        bookingData.bookingTime,
        bookingData.barberId
      );

      if (conflict) {
        throw new Error('Time slot already booked');
      }

      // Set total price from service
      bookingData.totalPrice = service.price;

      // Create booking
      const booking = await this.bookingRepository.create(bookingData);

      // Award loyalty points if user is registered
      if (bookingData.userId) {
        const pointsToAward = Math.floor(service.price / 10000); // 1 point per 10,000 VND
        await this.userRepository.updateLoyaltyPoints(bookingData.userId, pointsToAward);
      }

      return await this.bookingRepository.findByIdWithDetails(booking.id);
    } catch (error) {
      throw error;
    }
  }

  async getAllBookings(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    
    return await this.bookingRepository.findAndCountAll({
      include: [
        {
          model: require('../models').User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone'],
        },
        {
          model: require('../models').Service,
          as: 'service',
          attributes: ['id', 'name', 'price', 'duration'],
        },
        {
          model: require('../models').Barber,
          as: 'barber',
          attributes: ['id', 'name', 'image'],
        },
      ],
      order: [['booking_date', 'DESC'], ['booking_time', 'DESC']],
      limit,
      offset,
    });
  }

  async getBookingById(id) {
    const booking = await this.bookingRepository.findByIdWithDetails(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  async updateBookingStatus(id, status) {
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const booking = await this.bookingRepository.update(id, { status });
    if (!booking) {
      throw new Error('Booking not found');
    }

    return booking;
  }

  async getUserBookings(userId) {
    return await this.bookingRepository.findByUserId(userId);
  }

  async getAvailableTimeSlots(date, barberId) {
    return await this.bookingRepository.getAvailableTimeSlots(date, barberId);
  }

  async getBookingStats() {
    return await this.bookingRepository.getBookingStats();
  }

  async getBookingsByDateRange(startDate, endDate) {
    return await this.bookingRepository.findByDateRange(startDate, endDate);
  }
}

module.exports = BookingService;