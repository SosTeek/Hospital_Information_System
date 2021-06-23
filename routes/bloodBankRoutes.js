const express = require('express');
const bloodBankController = require('../controllers/bloodBankController');

const router = express.Router();

router.route('/').get(bloodBankController.findAllBloodBanks).post(bloodBankController.createBloodBank);

router.route('/:id').get(bloodBankController.findOneBloodBank).patch(bloodBankController.updateBloodBank).delete(bloodBankController.deleteBloodBank);

module.exports = router;
