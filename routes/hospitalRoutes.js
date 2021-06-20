const express = require('express');

const router = express.Router();

const hospitalController = require('../controllers/hospitalController');

router.route('/').get(hospitalController.findAllHospital).post(hospitalController.createHospital);

router.route('/:id').get(hospitalController.findOneHospital).patch(hospitalController.updateHospital).delete(hospitalController.deleteHospital);

module.exports = router;