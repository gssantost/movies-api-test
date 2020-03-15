const { Movie, MovieGenre } = require("../../models").models;
const sequelize = require("../../models").sequelize;
const { joinMovieGenres } = require("./query/join-movie-genres");
const { orderById } = require("../common/query/order-by-id");
/**
 * Adds a new Movie.
 * @param {CreateMovieDTO} createMovieDTO - DTO for creating a movie
 */
module.exports.create = async createMovieDTO => {
  let transaction = null;
  try {
    transaction = await sequelize.transaction();
    const { genreIds, ...values } = createMovieDTO;
    const movie = await Movie.create(values, { transaction });
    if (genreIds.length > 0) {
      const movieGenres = genreIds.map(genreId => {
        return {
          movieId: movie.id,
          genreId
        };
      });
      await MovieGenre.bulkCreate(movieGenres, { transaction });
    }
    await transaction.commit();
    return movie;
  } catch (err) {
    if (transaction) await transaction.rollback();
    throw err;
  }
};

/**
 * Retrieves all movies ordered by ID.
 */
module.exports.getAll = async () => {
  try {
    const movies = await Movie.findAll(orderById());
    return movies;
  } catch (err) {
    throw err;
  }
};

/**
 * Retrieves details from a movie with the provided ID.
 * @param {number} movieId
 */
module.exports.getById = async movieId => {
  try {
    const movie = await Movie.findOne(joinMovieGenres(movieId));
    return movie;
  } catch (err) {
    throw err;
  }
};

/**
 * Deletes a movie with the provided ID.
 * @param {number} movieId
 */
module.exports.remove = async movieId => {
  let transaction = null;
  try {
    transaction = await sequelize.transaction();
    const movie = await Movie.findByPk(movieId);
    if (!movie) return 0;
    await MovieGenre.destroy({
      where: {
        movieId
      },
      transaction
    });
    const removed = await Movie.destroy({
      where: {
        id: movieId
      },
      transaction
    });
    await transaction.commit();
    return removed;
  } catch (err) {
    if (transaction) await transaction.rollback();
    throw err;
  }
};
