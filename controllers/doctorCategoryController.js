const DoctorCategory = require('../models').DoctorCategory;

const catchAsync = require('express-async-handler');

exports.createDoctorCategory = catchAsync( async (req, res) => {
    const doc = await DoctorCategory.create(req.body);

    res.status(201).json({
        status: 'success',
        data: doc,
    })
})

exports.findAllDoctorCategory = catchAsync( async (req, res) => {
    const doc = await DoctorCategory.findAll();

    res.status(200).json({
        status: 'success',
        data: doc,
    })
});

exports.findOneDoctorCategory = catchAsync( async (req, res) => {
    const doc = await DoctorCategory.findOne({where: {
        id: req.params.id,
    },
        include: 'doctors',
});

    if(!doc){
        res.status(404).json({
            status: 'failed',
            message: 'Wrong DoctorCategory ID!!',
        })
    }

    res.status(200).json({
        status: 'success',
        data: doc,
    })
})


exports.deleteDoctorCategory = catchAsync( async (req, res) => {
    const doc = await DoctorCategory.destroy({where: {
        id: req.params.id,
    }});

    if(!doc){
        res.status(404).json({
            status: 'failed',
            message: 'Wrong DoctorCategory ID!!',
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'DoctorCategory has been deleted successfully.',
    })
})