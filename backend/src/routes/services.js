const express = require('express');
const ServiceController = require('../controllers/ServiceController');
const { serviceValidation, paramValidation } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
const serviceController = new ServiceController();

// Public routes
router.get('/', serviceController.getAllServices.bind(serviceController));
router.get('/popular', serviceController.getPopularServices.bind(serviceController));
router.get('/category/:category', serviceController.getServicesByCategory.bind(serviceController));
router.get('/:id', paramValidation.uuid, serviceController.getServiceById.bind(serviceController));

// Admin routes
router.use(authenticate);
router.use(authorize('admin'));

router.post('/', serviceValidation.create, serviceController.createService.bind(serviceController));
router.put('/:id', 
  paramValidation.uuid, 
  serviceValidation.update, 
  serviceController.updateService.bind(serviceController)
);
router.delete('/:id', paramValidation.uuid, serviceController.deleteService.bind(serviceController));

module.exports = router;