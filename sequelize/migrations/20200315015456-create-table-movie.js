"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.createTable("movie", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      duration: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      duration: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.dropTable("movie");
  }
};
