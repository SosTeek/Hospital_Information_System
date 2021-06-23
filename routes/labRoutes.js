const express = require('express');

const labController = require('../controllers/labController');

const router = express.Router();

router.route('/').get(labController.findAllLabs).post(labController.createLab);

router.route('/:id').get(labController.findOneLab).patch(labController.updateLab).delete(labController.deleteLab);


module.exports = router;