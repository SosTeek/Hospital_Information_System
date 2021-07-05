const catchAsync = require('express-async-handler');

const AppError = require('../utils/AppError');

exports.deleteOne = Model =>
    catchAsync (async (req, res, next) =>{
    const doc = await Model.destroy({
        where: {
            id: req.params.id,
        }
    })
    if(!doc) return next( new AppError('No document found with that ID!!', 404));

    res.status(204).json({
        status: 'success',
        message: `${Model} deleted successfully!!`,
    })
});

exports.updateOne = Model =>
    catchAsync (async (req, res, next) =>{
        const doc = await Model.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if(!doc) return next( new AppError('No document found with that ID!!',404));
        const updatedDoc = await Model.findOne({
            where: {
              id: id,
            },
          });
          res.status(200).json({
            status: 'success',
            data: updatedDoc,
          });
    })

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: doc,
        })
    })

// exports.getOne = (Model) =>
exports.getOne = (Model, property) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findOne({
            where: {id: req.params.id},
            // include: `${property}`
            include: property
        })
        if(!doc) return next( new AppError('No document found with that ID!!', 404));

        res.status(200).json({
            status: 'success',
            data: doc,
        })
    });

exports.getAll = Model => 
    catchAsync(async (req, res, next)=> {
        const doc = await Model.findAll();

        res.status(200).json({
            status: 'status',
            results: doc.length,
            data: {
                doc,
            },
        })
    })