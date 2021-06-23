'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodBank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BloodBank.hasMany(models.BloodDetail, {
        as: 'bloodDetails',
      })
    }
  };
  BloodBank.init({
    bloodBankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodBankPhone: {
      type: DataTypes.STRING,
    },
    bloodBankPhoto: {
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
    modelName: 'BloodBank',
  });
  return BloodBank;
};