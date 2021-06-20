'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ambulance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ambulance.belongsTo(models.Hospital, {
        foreignKey: 'hospitalId',
        as: 'hospital',
      })
    }
  };
  Ambulance.init({
    driverName: DataTypes.STRING,
    driverPhone: DataTypes.STRING,
    ambulanceNumber: DataTypes.STRING,
    hospitalId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Ambulance',
  });
  return Ambulance;
};