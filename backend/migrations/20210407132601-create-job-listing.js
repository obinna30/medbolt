'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobListings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      jobDescription: {
        type: Sequelize.TEXT
      },
      nameOfInstitution: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      remote: {
        type: Sequelize.BOOLEAN
      },
      yearsOfExperience: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('jobListings');
  }
};