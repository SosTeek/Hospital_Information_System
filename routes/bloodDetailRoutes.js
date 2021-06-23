const express = require('express');
const bloodDetailController = require('../controllers/bloodDetailController');

const router = express.Router();

router.route('/').get(bloodDetailController.findAllBloodDetails).post(bloodDetailController.createBloodDetail);

router.route('/:id').get(bloodDetailController.findOneBloodDetail).patch(bloodDetailController.updateBloodDetail).delete(bloodDetailController.deleteBloodDetail);

module.exports = router;
