const { body, param, query } = require('express-validator');

const authValidation = {
  register: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('phone')
      .optional()
      .isMobilePhone('vi-VN')
      .withMessage('Please provide a valid Vietnamese phone number'),
  ],
  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
};

const bookingValidation = {
  create: [
    body('serviceId')
      .isUUID()
      .withMessage('Valid service ID is required'),
    body('barberId')
      .isUUID()
      .withMessage('Valid barber ID is required'),
    body('customerName')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Customer name must be between 2 and 100 characters'),
    body('customerEmail')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('customerPhone')
      .isMobilePhone('vi-VN')
      .withMessage('Please provide a valid Vietnamese phone number'),
    body('bookingDate')
      .isDate()
      .withMessage('Please provide a valid date'),
    body('bookingTime')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage('Please provide a valid time in HH:MM format'),
    body('notes')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Notes cannot exceed 500 characters'),
  ],
  updateStatus: [
    body('status')
      .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
      .withMessage('Invalid status'),
  ],
};

const serviceValidation = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Service name must be between 2 and 100 characters'),
    body('description')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('duration')
      .isInt({ min: 15, max: 300 })
      .withMessage('Duration must be between 15 and 300 minutes'),
    body('category')
      .trim()
      .notEmpty()
      .withMessage('Category is required'),
  ],
  update: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Service name must be between 2 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters'),
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('duration')
      .optional()
      .isInt({ min: 15, max: 300 })
      .withMessage('Duration must be between 15 and 300 minutes'),
  ],
};

const barberValidation = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Barber name must be between 2 and 100 characters'),
    body('experience')
      .trim()
      .notEmpty()
      .withMessage('Experience is required'),
    body('image')
      .isURL()
      .withMessage('Please provide a valid image URL'),
    body('specialties')
      .optional()
      .isArray()
      .withMessage('Specialties must be an array'),
  ],
  update: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Barber name must be between 2 and 100 characters'),
    body('rating')
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage('Rating must be between 0 and 5'),
  ],
};

const paramValidation = {
  uuid: [
    param('id')
      .isUUID()
      .withMessage('Invalid ID format'),
  ],
};

module.exports = {
  authValidation,
  bookingValidation,
  serviceValidation,
  barberValidation,
  paramValidation,
};