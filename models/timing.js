'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Timing.init({
    hospitalId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Timing',
  });
  return Timing;
};