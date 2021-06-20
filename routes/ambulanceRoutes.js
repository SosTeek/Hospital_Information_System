const express = require('express');

const ambulanceController = require('../controllers/ambulanceController');

const router = express.Router();

router.route('/').get(ambulanceController.findAllAmbulance).post(ambulanceController.createAmbulance);

router.route('/:id').get(ambulanceController.findOneAmbulance).patch(ambulanceController.updateAmbulance).delete(ambulanceController.deleteAmbulance);

module.exports = router;