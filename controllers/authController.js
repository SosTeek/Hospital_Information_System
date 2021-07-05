const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const catchAsync = require('express-async-handler');
const { promisify } = require('util')

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
    createSendToken(user, 200, res)
})

exports.logOut = catchAsync(async (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() * 10 * 1000),
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({ status: 'success' });
  });


// Check if the USER is logged in or not
exports.protect = catchAsync( async (req, res, next) => {
    
    // Get token and check if it is there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }
    console.log(token);
    if(token === undefined || token === 'loggedout'){
        return next(
            res.status(400).json({
                status: 'failed',
                message: 'You are not logged in !! Please log in and continue!!',
            })
        );
    }

    // Verify the token 
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    
    //Cheeck if the user still exists
    const currentUser = await User.findByPk(decoded.id);

    if(!currentUser){
        return next(
            res.status(400).json({
                status: 'failed',
                message: 'The user belonging to this token no longer exists!!',
            })
        );
    }

    // Grant Access to the protected route
    req.user = currentUser;
    res.locals.user = currentUser;

    next();

});

// Role based authentication    
exports.restrictTo = (...roles) => (req, res, next) => {
    console.log(req.user);
    // console.log(req.user);
    console.log(roles)
    if(!roles.includes(req.user.role)){
        return next(
            res.status(403).json({
                status: 'failed',
                message: `Yoy don't have permission to do this task!!!`,
            })
        )
    }

    return next();
}

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))