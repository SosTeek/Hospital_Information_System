'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    phone: {
      type: DataTypes.STRING,
      // allowNull: false,
    //   validate: {
    //     isValidPhoneNo: function(value) {
    //         if (!value) return value;

    //         var regexp = /^[0-9]+$/;
    //         var values = (Array.isArray(value)) ? value : [value];

    //         values.forEach(function(val) {
    //             if (!regexp.test(val)) {
    //                 throw new Error("Number only is allowed.");
    //             }
    //         });
    //         return value;
    //     }
    // }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 64],
          msg: "At least 8 characters required for password"
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      enum: ['superAdmin','admin', 'user'],
      defaultValue: 'user',
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};