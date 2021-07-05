const catchAsync = require('express-async-handler');

const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

const models = require('../models');
const Doctor = require('../models').Doctor;
const Hospital = require('../models').Hospital;
const Timing = require('../models').Timing;



exports.createDoctor = catchAsync( async (req, res, next) => {
  const t = await models.sequelize.transaction();

  //Create and save DOCTOR
    const newDoctor = await Doctor.create(req.body, {transaction: t});
    // console.log(newDoctor);
  
  // Loop thorugh all the TIMINGS in array of req.body.hospitals
  await Promise.all(
    req.body.hospitals.map(async (el)=> {
      try {

      //Search for the hospital with the given ID and make sure it exists. If not respind with error 404.
      const hospital = await Hospital.findByPk(el.hospitalId, {
        transaction: t,
      });

      if(hospital){

        //Create an object to create the TIMING
        const tim = {
          doctorId: newDoctor.id,
          hospitalId: el.hospitalId,
          from: el.from,
          to: el.to,
        }

        // Create and save the TIMING
        const newTiming = await Timing.create(tim, { transaction: t });

        //If everything goes well, respond with DOCTOR
        await t.commit();
        res.status(201).json({
          status: 'success',
          data: {
            newDoctor,
          }
        })
      }
      } catch (error) {
        // await t.rollback();
        console.log(error);
      }
    })
  );
  return res.status(400).json({
    status: 'fail',
    message: 'Please try a valid Hospital ID!!',
  });

    
})

exports.findOneDoctor = catchAsync(async (req, res, next) => {
    const doc =  await Doctor.findOne({
        where: {
            id: req.params.id,
        },
        include: [
          {
            model: Hospital,
            as: 'hospitals',
            attributes: ['id', 'hospitalName'],
            through: {
              model: Timing,
              as: 'timings',
              attributes: ['from', 'to'],
            }
          },
        'category',
        ]
    })
    if(!doc){
        return next( new AppError('No Doctor found with that ID!!', 404))
    }
    res.status(200).json({
        status: 'status',
        Doctor: doc,
    })
})

exports.findAllDoctor = factory.getAll(Doctor);
// exports.findAllDoctor = catchAsync(async (req, res, next) => {
//     const doc =  await Doctor.findAll();

//     res.status(200).json({
//         status: 'status',
//         results: doc.length,
//         data: {
//             doc,
//         },
//     })
// });

exports.updateDoctor = factory.updateOne(Doctor);
// exports.updateDoctor = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const doc = await Doctor.update(req.body, {
//       where: {
//         id: id,
//       },
//     });
//     if (!doc) {
//       res.status(404).json({
//         status: 'fail',
//         message: 'No Doctor. found with that id!!',
//       });
//     }
//     const updatedUser = await Doctor.findOne({
//       where: {
//         id: id,
//       },
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: updatedUser,
//       },
//     });
//   });
  
exports.deleteDoctor = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Doctor.destroy({
      where: {
        id: id,
      },
    });
    if (!doc) {
      return new AppError('There is no any Doctor. with that ID!!', 404);
    }

    const deleteTimings = await Timing.destroy({
      where: {
        doctorId: id,
      }
    });
    res.status(404).json({
      status: 'success',
      message: 'Doctor. has been deleted successfully.',
    });
})
