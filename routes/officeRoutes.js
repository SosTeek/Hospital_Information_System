const express = require('express');

const officeController = require('../controllers/officeController');

const router = express.Router();

router.route('/').get(officeController.findAllOffice).post(officeController.createOffice);

router.route('/:id').get(officeController.findOneOffice).delete(officeController.deleteOffice);


module.exports = router;