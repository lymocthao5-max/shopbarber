const BarberRepository = require('../repositories/BarberRepository');

class BarberService {
  constructor() {
    this.barberRepository = new BarberRepository();
  }

  async getAllBarbers(availableOnly = true) {
    if (availableOnly) {
      return await this.barberRepository.findAvailableBarbers();
    }
    return await this.barberRepository.findAll({
      order: [['created_at', 'DESC']],
    });
  }

  async getBarberById(id) {
    const barber = await this.barberRepository.findWithWorkingHours(id);
    if (!barber) {
      throw new Error('Barber not found');
    }
    return barber;
  }

  async createBarber(barberData) {
    return await this.barberRepository.create(barberData);
  }

  async updateBarber(id, barberData) {
    const barber = await this.barberRepository.update(id, barberData);
    if (!barber) {
      throw new Error('Barber not found');
    }
    return barber;
  }

  async deleteBarber(id) {
    const deleted = await this.barberRepository.delete(id);
    if (!deleted) {
      throw new Error('Barber not found');
    }
    return true;
  }

  async getAvailableBarbersForDateTime(date, time) {
    return await this.barberRepository.findAvailableForDateTime(date, time);
  }

  async updateBarberAvailability(id, isAvailable) {
    return await this.barberRepository.update(id, { isAvailable });
  }

  async getBarberStats(barberId) {
    return await this.barberRepository.getBarberStats(barberId);
  }
}

module.exports = BarberService;