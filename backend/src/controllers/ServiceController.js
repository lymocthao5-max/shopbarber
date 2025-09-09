const { validationResult } = require('express-validator');
const ServiceService = require('../services/ServiceService');

class ServiceController {
  constructor() {
    this.serviceService = new ServiceService();
  }

  async getAllServices(req, res) {
    try {
      const activeOnly = req.query.active !== 'false';
      const services = await this.serviceService.getAllServices(activeOnly);

      res.json({
        success: true,
        data: services,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getServiceById(req, res) {
    try {
      const service = await this.serviceService.getServiceById(req.params.id);

      res.json({
        success: true,
        data: service,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createService(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const service = await this.serviceService.createService(req.body);

      res.status(201).json({
        success: true,
        message: 'Service created successfully',
        data: service,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateService(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const service = await this.serviceService.updateService(req.params.id, req.body);

      res.json({
        success: true,
        message: 'Service updated successfully',
        data: service,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteService(req, res) {
    try {
      await this.serviceService.deleteService(req.params.id);

      res.json({
        success: true,
        message: 'Service deleted successfully',
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getPopularServices(req, res) {
    try {
      const services = await this.serviceService.getPopularServices();

      res.json({
        success: true,
        data: services,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getServicesByCategory(req, res) {
    try {
      const { category } = req.params;
      const services = await this.serviceService.getServicesByCategory(category);

      res.json({
        success: true,
        data: services,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = ServiceController;