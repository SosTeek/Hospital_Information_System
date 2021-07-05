const express = require('express');

const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

const router = express.Router();
// const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.route('/').get(cartController.showCart).post(cartController.createCart);

router.delete('/:id', cartController.deleteCartItem);

module.exports = router;

