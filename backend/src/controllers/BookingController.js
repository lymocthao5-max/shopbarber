const { validationResult } = require('express-validator');
const BookingService = require('../services/BookingService');

class BookingController {
  constructor() {
    this.bookingService = new BookingService();
  }

  async createBooking(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const booking = await this.bookingService.createBooking(req.body);

      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: booking,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllBookings(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;

      const result = await this.bookingService.getAllBookings(page, limit);

      res.json({
        success: true,
        data: result.rows,
        pagination: {
          total: result.count,
          page,
          limit,
          totalPages: Math.ceil(result.count / limit),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getBookingById(req, res) {
    try {
      const booking = await this.bookingService.getBookingById(req.params.id);

      res.json({
        success: true,
        data: booking,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateBookingStatus(req, res) {
    try {
      const { status } = req.body;
      const booking = await this.bookingService.updateBookingStatus(req.params.id, status);

      res.json({
        success: true,
        message: 'Booking status updated successfully',
        data: booking,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserBookings(req, res) {
    try {
      const bookings = await this.bookingService.getUserBookings(req.user.id);

      res.json({
        success: true,
        data: bookings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAvailableTimeSlots(req, res) {
    try {
      const { date, barberId } = req.query;
      
      if (!date || !barberId) {
        return res.status(400).json({
          success: false,
          message: 'Date and barberId are required',
        });
      }

      const timeSlots = await this.bookingService.getAvailableTimeSlots(date, barberId);

      res.json({
        success: true,
        data: timeSlots,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getBookingStats(req, res) {
    try {
      const stats = await this.bookingService.getBookingStats();

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = BookingController;