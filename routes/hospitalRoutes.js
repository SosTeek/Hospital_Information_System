const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const hospitalController = require('../controllers/hospitalController');

router.get('/:id', hospitalController.findOneHospital);

router.use(authController.protect);
router.route('/').get(hospitalController.findAllHospital).post(hospitalController.createHospital);

router.route('/:id').patch(hospitalController.updateHospital).delete(hospitalController.deleteHospital);

module.exports = router;