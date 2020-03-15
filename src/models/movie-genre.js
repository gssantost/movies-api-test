const { Model } = require("sequelize");

class MovieGenre extends Model {
  static associate(models) {
    this.belongsTo(models.Genre, {
      as: "genre",
      foreignKey: { allowNull: false }
    });
    this.belongsTo(models.Genre, {
      as: "movie",
      foreignKey: { allowNull: false }
    });
  }
}

function movieGenre(sequelize, dataTypes) {
  MovieGenre.init(
    {},
    {
      sequelize,
      modelName: "movieGenre",
      tableName: "movie_genre",
      underscored: true
    }
  );

  return MovieGenre;
}

module.exports = movieGenre;
module.exports.MovieGenre = MovieGenre;
