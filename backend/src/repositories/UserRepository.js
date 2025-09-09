const BaseRepository = require('./BaseRepository');
const { User } = require('../models');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findOne({
      where: { email },
    });
  }

  async findActiveUsers() {
    return await this.model.findAll({
      where: { isActive: true },
      order: [['created_at', 'DESC']],
    });
  }

  async updateLoyaltyPoints(userId, points) {
    return await this.model.increment('loyaltyPoints', {
      by: points,
      where: { id: userId },
    });
  }

  async findCustomers() {
    return await this.model.findAll({
      where: { role: 'customer' },
      order: [['created_at', 'DESC']],
    });
  }

  async updateLastLogin(userId) {
    return await this.model.update(
      { lastLogin: new Date() },
      { where: { id: userId } }
    );
  }
}

module.exports = UserRepository;