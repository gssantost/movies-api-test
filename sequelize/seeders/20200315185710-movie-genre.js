"use strict";
const restartSequence = require("../data/restart-sequence");
const movieGenres = require("../data/movie-genre")();
const tableName = "movie_genre";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    await restartSequence(
      queryInterface.sequelize,
      tableName,
      movieGenres.length
    );
    return await queryInterface.bulkInsert(tableName, movieGenres);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("movie_genre", null, {});
  }
};
