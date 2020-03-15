const { Model } = require("sequelize");

class Movie extends Model {
  static associate(models) {
    this.hasMany(models.MovieGenre, {
      as: "movieGenres",
      foreignKey: { allowNull: false }
    });
  }
}

function movie(sequelize, dataTypes) {
  Movie.init(
    {
      name: {
        type: dataTypes.STRING(64),
        allowNull: false,
        unique: {
          name: "name",
          msg: "Genre with this name already exists."
        }
      },
      description: {
        type: dataTypes.STRING(128),
        allowNull: false
      },
      releaseDate: {
        type: dataTypes.DATE,
        allowNull: false
      },
      duration: {
        type: dataTypes.STRING(8),
        allowNull: false
      },
      rating: {
        type: dataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "movie",
      tableName: "movie",
      underscored: true
    }
  );

  return Movie;
}

module.exports = movie;
module.exports.Movie = Movie;
