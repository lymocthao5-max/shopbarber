const BaseRepository = require('./BaseRepository');
const { Barber, WorkingHours } = require('../models');

class BarberRepository extends BaseRepository {
  constructor() {
    super(Barber);
  }

  async findAvailableBarbers() {
    return await this.model.findAll({
      where: { isAvailable: true },
      include: [
        {
          model: WorkingHours,
          as: 'workingHours',
        },
      ],
      order: [['rating', 'DESC'], ['name', 'ASC']],
    });
  }

  async findWithWorkingHours(id) {
    return await this.model.findByPk(id, {
      include: [
        {
          model: WorkingHours,
          as: 'workingHours',
        },
      ],
    });
  }

  async findAvailableForDateTime(date, time) {
    // This would need more complex logic to check working hours
    // For now, return all available barbers
    return await this.findAvailableBarbers();
  }

  async updateRating(barberId, newRating) {
    return await this.model.update(
      { rating: newRating },
      { where: { id: barberId } }
    );
  }

  async getBarberStats(barberId) {
    const { Booking } = require('../models');
    
    const totalBookings = await Booking.count({
      where: { barberId }
    });

    const completedBookings = await Booking.count({
      where: { 
        barberId,
        status: 'completed'
      }
    });

    const completionRate = totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0;

    return {
      totalBookings,
      completedBookings,
      completionRate: Math.round(completionRate * 100) / 100
    };
  }
}

module.exports = BarberRepository;