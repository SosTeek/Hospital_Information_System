'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BloodDetail.belongsTo(models.BloodBank, {
        foreignKey: 'bloodBankId',
        as: 'bloodBank',
      })
    }
  };
  BloodDetail.init({
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: DataTypes.INTEGER,
    bloodBankId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BloodDetail',
  });
  return BloodDetail;
};