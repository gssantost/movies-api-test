"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.createTable("movie_genre", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      // Relations
      movie_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "movie",
          key: "id"
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      genre_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "genre",
          key: "id"
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
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
    return queryInterface.dropTable("movie_genre");
  }
};
