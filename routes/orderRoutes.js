const express = require('express');

const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const historyController = require('../controllers/historyController');

const router = express.Router();

router.use(authController.protect);
router.route('/').post(orderController.createOrder).get(orderController.showOrders);

router.get('/history', historyController.showAllHistory);
module.exports = router;