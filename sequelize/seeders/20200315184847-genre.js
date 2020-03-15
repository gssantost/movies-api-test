"use strict";
const restartSequence = require("../data/restart-sequence");
const genres = require("../data/genre")();
const tableName = "genre";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    await restartSequence(queryInterface.sequelize, tableName, genres.length);
    return await queryInterface.bulkInsert(tableName, genres);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete("genre", null, {});
  }
};
