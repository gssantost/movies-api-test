class CreateMovieDTO {
  constructor({ name, description, releaseDate, duration, rating, genreIds }) {
    this.name = name;
    this.description = description;
    this.releaseDate = new Date(releaseDate);
    this.duration = duration;
    this.rating = rating;
    this.genreIds = genreIds;
  }
}

module.exports.CreateMovieDTO = CreateMovieDTO;
