'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'user'
    });

    await queryInterface.addColumn('Users', 'businessName', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'licenseNumber', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'yearsOfExperience', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'department', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'employeeId', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Add yearsOfExperience to Agents table
    await queryInterface.addColumn('Agents', 'yearsOfExperience', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    // Add employeeId to Admins table
    await queryInterface.addColumn('Admins', 'employeeId', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'businessName');
    await queryInterface.removeColumn('Users', 'licenseNumber');
    await queryInterface.removeColumn('Users', 'yearsOfExperience');
    await queryInterface.removeColumn('Users', 'department');
    await queryInterface.removeColumn('Users', 'employeeId');
    await queryInterface.removeColumn('Agents', 'yearsOfExperience');
    await queryInterface.removeColumn('Admins', 'employeeId');
  }
};
