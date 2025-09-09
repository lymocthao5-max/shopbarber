const express = require('express');
const BookingController = require('../controllers/BookingController');
const { bookingValidation, paramValidation } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
const bookingController = new BookingController();

// Public routes
router.post('/', bookingValidation.create, bookingController.createBooking.bind(bookingController));
router.get('/available-slots', bookingController.getAvailableTimeSlots.bind(bookingController));

// Protected routes
router.use(authenticate);

// Customer routes
router.get('/my-bookings', bookingController.getUserBookings.bind(bookingController));

// Admin routes
router.get('/', authorize('admin'), bookingController.getAllBookings.bind(bookingController));
router.get('/stats', authorize('admin'), bookingController.getBookingStats.bind(bookingController));
router.get('/:id', paramValidation.uuid, bookingController.getBookingById.bind(bookingController));
router.put('/:id/status', 
  paramValidation.uuid, 
  bookingValidation.updateStatus, 
  authorize('admin'), 
  bookingController.updateBookingStatus.bind(bookingController)
);

module.exports = router;