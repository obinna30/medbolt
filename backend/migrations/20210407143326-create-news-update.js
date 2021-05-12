'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('newsUpdates', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING
      },
      article: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.UUID,
        references: {model:"Users", key: "id" },
        onDelete: "CASCADE",
      },
      author: {
        type: Sequelize.STRING
      },
      articleReference: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('newsUpdates');
  }
};