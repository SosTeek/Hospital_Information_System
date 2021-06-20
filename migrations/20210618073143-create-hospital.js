'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Hospitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hospitalName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
      },
      hospitalAddress: {
        type: Sequelize.STRING,
      },
      hospitalImage: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.INTEGER,
      },
      longitude: {
        type: Sequelize.INTEGER,
      },
      // doctorId: {
      //   type: Sequelize.INTEGER,
      //   // references:{
      //   //   model: Doctor,
      //   //   key: 'id'
      //   // }
      // },
      // ambulanceId: {
      //   type: Sequelize.INTEGER,
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Hospitals');
  }
};