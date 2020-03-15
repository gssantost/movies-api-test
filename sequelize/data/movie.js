const mapper = require("./map-seeder")();

const movies = [
  {
    name: "Rosemary's Baby",
    description:
      "A young couple moves in to an apartment only to be surrounded by peculiar neighbors and occurrences",
    release_date: "June 12, 1968",
    duration: "136",
    rating: 4
  },
  {
    name: "The Girl with the Dragon Tattoo",
    description:
      "Journalist Mikael Blomkvist is aided in his search for a woman who has been missing for forty years by Lisbeth Salander",
    release_date: "December 20, 2011",
    duration: "158",
    rating: 5
  }
];

const mapMovies = () => {
  return mapper(movies);
};

module.exports = mapMovies;
