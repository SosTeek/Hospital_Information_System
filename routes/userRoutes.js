var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', userController.findAllUsers);

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.get('/logout', authController.logOut);

router.route('/:id').get(userController.findOneUser).patch(userController.updateUser);

module.exports = router;
