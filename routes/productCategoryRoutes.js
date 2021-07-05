const express = require('express');

const router = express.Router();

const productCategoryController = require('../controllers/productCategoryController');

router.route('/').get(productCategoryController.findAllProductCategory).post(productCategoryController.createProductCategory);

router.route('/:id').get(productCategoryController.findOneProductCategory)
// .patch(productCategoryController.updateProduct).delete(productCategoryController.deleteProduct);

module.exports = router;
