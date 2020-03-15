"use strict";
const restartSequence = require("../data/restart-sequence");
const movies = require("../data/movie")();
const tableName = "movie";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    await restartSequence(queryInterface.sequelize, tableName, movies.length);
    return await queryInterface.bulkInsert(tableName, movies);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("movie", null, {});
  }
};
