const express = require('express');

const authController = require('../controllers/authController');
const favouriteController = require('../controllers/favouriteController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(favouriteController.showFavouriteProducts).post(favouriteController.createFavourite);

router.delete('/:id', favouriteController.removeFavouriteProduct);

module.exports = router;

