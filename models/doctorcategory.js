'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DoctorCategory.hasMany(models.Doctor, {
        as: 'doctors',
      })
    }
  };
  DoctorCategory.init({
    doctorCategoryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DoctorCategory',
  });
  return DoctorCategory;
};