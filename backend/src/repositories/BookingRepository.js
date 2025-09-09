const BaseRepository = require('./BaseRepository');
const { Booking, User, Service, Barber } = require('../models');
const { Op } = require('sequelize');

class BookingRepository extends BaseRepository {
  constructor() {
    super(Booking);
  }

  async findWithDetails(options = {}) {
    return await this.model.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone'],
        },
        {
          model: Service,
          as: 'service',
          attributes: ['id', 'name', 'price', 'duration'],
        },
        {
          model: Barber,
          as: 'barber',
          attributes: ['id', 'name', 'image'],
        },
      ],
      order: [['booking_date', 'DESC'], ['booking_time', 'DESC']],
      ...options,
    });
  }

  async findByIdWithDetails(id) {
    return await this.model.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone'],
        },
        {
          model: Service,
          as: 'service',
          attributes: ['id', 'name', 'price', 'duration'],
        },
        {
          model: Barber,
          as: 'barber',
          attributes: ['id', 'name', 'image'],
        },
      ],
    });
  }

  async findByUserId(userId) {
    return await this.findWithDetails({
      where: { userId },
    });
  }

  async findByDateRange(startDate, endDate) {
    return await this.findWithDetails({
      where: {
        bookingDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
  }

  async findConflict(date, time, barberId) {
    return await this.model.findOne({
      where: {
        bookingDate: date,
        bookingTime: time,
        barberId: barberId,
        status: {
          [Op.in]: ['pending', 'confirmed'],
        },
      },
    });
  }

  async getAvailableTimeSlots(date, barberId) {
    const allSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
      '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
    ];

    const bookedSlots = await this.model.findAll({
      where: {
        bookingDate: date,
        barberId: barberId,
        status: {
          [Op.in]: ['pending', 'confirmed'],
        },
      },
      attributes: ['bookingTime'],
    });

    const bookedTimes = bookedSlots.map(slot => slot.bookingTime);
    return allSlots.filter(slot => !bookedTimes.includes(slot));
  }

  async getBookingStats() {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);

    const [totalBookings, todayBookings, monthlyBookings, pendingBookings] = await Promise.all([
      this.model.count(),
      this.model.count({ where: { bookingDate: today } }),
      this.model.count({ 
        where: { 
          bookingDate: {
            [Op.like]: `${thisMonth}%`
          }
        }
      }),
      this.model.count({ where: { status: 'pending' } }),
    ]);

    return {
      total: totalBookings,
      today: todayBookings,
      thisMonth: monthlyBookings,
      pending: pendingBookings,
    };
  }
}

module.exports = BookingRepository;