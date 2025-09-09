const ServiceRepository = require('../repositories/ServiceRepository');

class ServiceService {
  constructor() {
    this.serviceRepository = new ServiceRepository();
  }

  async getAllServices(activeOnly = true) {
    if (activeOnly) {
      return await this.serviceRepository.findActiveServices();
    }
    return await this.serviceRepository.findAll({
      order: [['created_at', 'DESC']],
    });
  }

  async getServiceById(id) {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  }

  async createService(serviceData) {
    return await this.serviceRepository.create(serviceData);
  }

  async updateService(id, serviceData) {
    const service = await this.serviceRepository.update(id, serviceData);
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  }

  async deleteService(id) {
    // Soft delete
    const deleted = await this.serviceRepository.softDelete(id);
    if (!deleted) {
      throw new Error('Service not found');
    }
    return true;
  }

  async getPopularServices() {
    return await this.serviceRepository.findPopularServices();
  }

  async getServicesByCategory(category) {
    return await this.serviceRepository.findByCategory(category);
  }

  async togglePopularStatus(id) {
    const service = await this.serviceRepository.findById(id);
    if (!service) {
      throw new Error('Service not found');
    }

    return await this.serviceRepository.updatePopularStatus(id, !service.isPopular);
  }
}

module.exports = ServiceService;