const mapper = require("./map-seeder")();

const genres = [
  {
    name: "Horror",
    description: "Horror movie"
  },
  {
    name: "Psychological thriller",
    description: "Psychological thriller movie"
  },
  {
    name: "Thriller",
    description: "Thriller movie"
  },
  {
    name: "Action",
    description: "Action movie"
  }
];

const mapGenres = () => {
  return mapper(genres);
};

module.exports = mapGenres;
