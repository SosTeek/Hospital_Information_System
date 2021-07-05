const express = require('express');

const router = express.Router();

const doctorCategoryController = require('../controllers/doctorCategoryController');

router.route('/').get(doctorCategoryController.findAllDoctorCategory).post(doctorCategoryController.createDoctorCategory);

router.route('/:id').get(doctorCategoryController.findOneDoctorCategory).delete(doctorCategoryController.deleteDoctorCategory);

module.exports = router;
