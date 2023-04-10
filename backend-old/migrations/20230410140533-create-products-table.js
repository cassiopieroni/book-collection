'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      bookPublisher: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      totalPages: {
        type: Sequelize.INTEGER(),
        allowNull: false,
      },
      isFinishedReading: {
        type: Sequelize.BOOLEAN(),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('books');
  },
};
