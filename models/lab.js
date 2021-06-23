'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lab.init({
    labName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    labPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidPhoneNo: function(value) {
            if (!value) return value;

            var regexp = /^[0-9]+$/;
            var values = (Array.isArray(value)) ? value : [value];

            values.forEach(function(val) {
                if (!regexp.test(val)) {
                    throw new Error("Number only is allowed.");
                }
            });
            return value;
        }
    }
    },
    labPhoto: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.INTEGER,
      validate: {
        min: -90,
        max: 90
      },
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
    modelName: 'Lab',
  });
  return Lab;
};