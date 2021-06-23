'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Labs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      labName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      labPhone: {
        type: Sequelize.STRING
      },
      labPhoto: {
        type: Sequelize.STRING,
      },
      latitude: Sequelize.INTEGER,
      longitude: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Labs');
  }
};