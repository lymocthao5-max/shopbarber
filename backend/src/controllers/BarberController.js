const { validationResult } = require('express-validator');
const BarberService = require('../services/BarberService');

class BarberController {
  constructor() {
    this.barberService = new BarberService();
  }

  async getAllBarbers(req, res) {
    try {
      const availableOnly = req.query.available !== 'false';
      const barbers = await this.barberService.getAllBarbers(availableOnly);

      res.json({
        success: true,
        data: barbers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getBarberById(req, res) {
    try {
      const barber = await this.barberService.getBarberById(req.params.id);

      res.json({
        success: true,
        data: barber,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createBarber(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const barber = await this.barberService.createBarber(req.body);

      res.status(201).json({
        success: true,
        message: 'Barber created successfully',
        data: barber,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateBarber(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const barber = await this.barberService.updateBarber(req.params.id, req.body);

      res.json({
        success: true,
        message: 'Barber updated successfully',
        data: barber,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteBarber(req, res) {
    try {
      await this.barberService.deleteBarber(req.params.id);

      res.json({
        success: true,
        message: 'Barber deleted successfully',
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getBarberStats(req, res) {
    try {
      const stats = await this.barberService.getBarberStats(req.params.id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = BarberController;