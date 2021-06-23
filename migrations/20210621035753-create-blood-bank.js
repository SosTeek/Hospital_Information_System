'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BloodBanks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bloodBankName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bloodBankPhone: {
        type: Sequelize.STRING
      },
      bloodBankPhoto: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.INTEGER,
      },
      longitude: {
        type: Sequelize.INTEGER
      },
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
    await queryInterface.dropTable('BloodBanks');
  }
};