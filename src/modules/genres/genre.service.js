const { Genre } = require("../../models").models;
const { orderById } = require("../common/query/order-by-id");
/**
 * Adds a new Genre.
 * @param {createGenreDTO} createGenreDTO - DTO for creating a genre
 */
module.exports.create = async createGenreDTO => {
  try {
    const genre = await Genre.create(createGenreDTO);
    return genre;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

/**
 * Retrieves all genres ordered by ID.
 */
module.exports.getAll = async () => {
  try {
    const movies = await Genre.findAll(orderById());
    return movies;
  } catch (err) {
    throw err;
  }
};

/**
 * Retrieves details from a genre with the provided ID.
 * @param {number} genreId
 */
module.exports.getById = async genreId => {
  try {
    const movie = await Genre.findByPk(genreId);
    return movie;
  } catch (err) {
    throw err;
  }
};

/**
 * Deletes a genre with the provided ID.
 * @param {number} genreId
 */
module.exports.remove = async genreId => {
  try {
    const removed = await Genre.destroy({
      where: {
        id: genreId
      }
    });
    return removed;
  } catch (err) {
    throw err;
  }
};
