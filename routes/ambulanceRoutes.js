const express = require('express');

const ambulanceController = require('../controllers/ambulanceController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
    .route('/')
    .get(authController.restrictTo('admin', 'superAdmin') , ambulanceController.findAllAmbulance)
    .post(ambulanceController.createAmbulance);

router
    .route('/:id')
    .get(ambulanceController.findOneAmbulance)
    .patch(ambulanceController.updateAmbulance)
    .delete(ambulanceController.deleteAmbulance);

module.exports = router;