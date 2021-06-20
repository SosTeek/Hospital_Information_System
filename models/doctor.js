'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsToMany(models.Hospital, {
        through: 'Timings',
        as: 'hospitals',
        foreignKey: 'doctorId',
        otherKey: 'hospitalId',
      })
      
    }
  };
  Doctor.init({
    doctorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctorPhone: {
      type: DataTypes.STRING,
    },
    specialOn: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};