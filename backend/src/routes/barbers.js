const express = require('express');
const BarberController = require('../controllers/BarberController');
const { barberValidation, paramValidation } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
const barberController = new BarberController();

// Public routes
router.get('/', barberController.getAllBarbers.bind(barberController));
router.get('/:id', paramValidation.uuid, barberController.getBarberById.bind(barberController));
router.get('/:id/stats', paramValidation.uuid, barberController.getBarberStats.bind(barberController));

// Admin routes
router.use(authenticate);
router.use(authorize('admin'));

router.post('/', barberValidation.create, barberController.createBarber.bind(barberController));
router.put('/:id', 
  paramValidation.uuid, 
  barberValidation.update, 
  barberController.updateBarber.bind(barberController)
);
router.delete('/:id', paramValidation.uuid, barberController.deleteBarber.bind(barberController));

module.exports = router;