'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    total: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};