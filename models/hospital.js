'use strict';
const {
  Model
} = require('sequelize');
// const doctor = require('./doctor');
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hospital.hasMany(models.Ambulance, {
        as: 'ambulances',
      });
      
      Hospital.belongsToMany(models.Doctor, {
        through: 'Timings',
        as: 'doctors',
        foreignKey: 'hospitalId',
        otherKey: 'doctorId',
      })
    }
  };
  Hospital.init({
    hospitalName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    hospitalAddress: {
      type: DataTypes.STRING,
    },
    hospitalImage: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.INTEGER,
      validate: {
        min: -90,
        max: 90
      }
    },
    longitude: {
      type: DataTypes.INTEGER,
      validate: {
        min: -180,
        max: 180
      }
    },
  }, {
    sequelize,
    modelName: 'Hospital',
  });
  return Hospital;
};