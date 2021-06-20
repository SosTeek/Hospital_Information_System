const express = require('express');

const router = express.Router();

const doctorController = require('../controllers/doctorController');

router.route('/').get(doctorController.findAllDoctor).post(doctorController.createDoctor);

router.route('/:id').get(doctorController.findOneDoctor).patch(doctorController.updateDoctor).delete(doctorController.deleteDoctor);

module.exports = router;
