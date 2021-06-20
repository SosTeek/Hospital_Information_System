const User = require('../models').User;
const catchAsync = require('express-async-handler');

const AppError = require('../utils/AppError');

exports.findOneUser = catchAsync(async (req, res, next) => {
    const doc =  await User.findOne({
        where: {
            id: req.params.id,
        }
    })
    if(!doc){
        return next( new AppError('No user found with that ID!!', 404))
    }
    res.status(200).json({
        status: 'status',
        user: doc,
    })
})

exports.findAllUsers = catchAsync(async (req, res, next) => {
    const doc =  await User.findAll();

    res.status(200).json({
        status: 'status',
        results: doc.length,
        data: {
            doc,
        },
    })
});

exports.updateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const doc = await User.update(req.body, {
      where: {
        id: id,
      },
    });
    if (!doc) {
      res.status(404).json({
        status: 'fail',
        message: 'No User found with that id!!',
      });
    }
    const updatedUser = await User.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: updatedUser,
      },
    });
  });
  