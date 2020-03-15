const { MovieGenre, Genre } = require("../../../models").models;
const { EXCLUDE_DATES } = require("../../../constants/query-exclusions");

module.exports.joinMovieGenres = movieId => {
  return {
    where: {
      id: movieId
    },
    include: [
      {
        model: MovieGenre,
        as: "movieGenres",
        attributes: {
          exclude: EXCLUDE_DATES
        },
        include: [
          {
            model: Genre,
            as: "genre",
            attributes: {
              exclude: EXCLUDE_DATES
            }
          }
        ]
      }
    ],
    attributes: {
      exclude: EXCLUDE_DATES
    }
  };
};
