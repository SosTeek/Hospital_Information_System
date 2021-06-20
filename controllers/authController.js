const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const catchAsync = require('express-async-handler');

const User = require('../models').User;

const signInToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  
const createSendToken = (user, statusCode, res)=> {
    const token = signInToken(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + `90d` * 24 * 60 * 60 * 1000),
    }
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        user,
    })
}

exports.signUp = catchAsync(async(req, res)=>{
    if(req.body.password === req.body.passwordConfirm){
        const newUser = await User.create({
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12),
            role: req.body.role,
        })
        createSendToken(newUser, 201, res);
    } else {
        res.status(400).json({
            status: 'failed',
            message: 'Password doesnot match!!',
        })
    }

})

exports.logIn = catchAsync(async(req, res)=> {
    const email = req.body.email;
    const password = req.body.password;

    //Check if the email and password exists
    if(!email || !password) {
        res.status(400).json({
            status: 'failed',
            message: 'Please provide Email and Password!!',
        })
    }

    //Check if the USER exists and the password is correct
    const user = await User.findOne({
        where: {
            email: req.body.email,
        }
    })
    if(!user){
        res.status(404).json({
            status: 'failed',
            message: 'Please provide a valid email address!!',
        })
    }
    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isValidPassword) {
        return res.status(401).send({
          status: 'fail',
          message: 'Invalid Password!',
        });
      }
    
    //Send tokem to the USER
    createSendToken(user, 201, res)
})

exports.logOut = catchAsync(async (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() * 10 * 1000),
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ status: 'success' });
  });