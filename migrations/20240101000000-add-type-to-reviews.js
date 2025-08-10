'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reviews', 'type', {
      type: Sequelize.ENUM('property', 'agent'),
      allowNull: false,
      defaultValue: 'property'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reviews', 'type');
  }
};
