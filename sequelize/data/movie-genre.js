const mapper = require("./map-seeder")();

const movieGenres = [
  {
    movie_id: 1,
    genre_id: 1
  },
  {
    movie_id: 1,
    genre_id: 2
  },
  {
    movie_id: 2,
    genre_id: 3
  },
  {
    movie_id: 2,
    genre_id: 4
  }
];

const mapMovieGenres = () => {
  return mapper(movieGenres);
};

module.exports = mapMovieGenres;
