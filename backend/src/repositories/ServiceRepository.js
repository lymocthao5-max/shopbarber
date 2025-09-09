const BaseRepository = require('./BaseRepository');
const { Service } = require('../models');

class ServiceRepository extends BaseRepository {
  constructor() {
    super(Service);
  }

  async findActiveServices() {
    return await this.model.findAll({
      where: { isActive: true },
      order: [['isPopular', 'DESC'], ['name', 'ASC']],
    });
  }

  async findPopularServices() {
    return await this.model.findAll({
      where: { 
        isActive: true,
        isPopular: true 
      },
      order: [['name', 'ASC']],
    });
  }

  async findByCategory(category) {
    return await this.model.findAll({
      where: { 
        category,
        isActive: true 
      },
      order: [['name', 'ASC']],
    });
  }

  async updatePopularStatus(id, isPopular) {
    return await this.model.update(
      { isPopular },
      { where: { id } }
    );
  }

  async softDelete(id) {
    return await this.model.update(
      { isActive: false },
      { where: { id } }
    );
  }
}

module.exports = ServiceRepository;