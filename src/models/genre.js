const { Model } = require("sequelize");

class Genre extends Model {}

function genre(sequelize, dataTypes) {
  Genre.init(
    {
      name: {
        type: dataTypes.STRING(32),
        validate: {
          notEmpty: true,
          len: [1, 32]
        },
        allowNull: false,
        unique: {
          name: "name",
          msg: "Genre with this name already exists."
        }
      },
      description: {
        type: dataTypes.STRING(64),
        validate: {
          notEmpty: true,
          len: [1, 64]
        },
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "genre",
      tableName: "genre",
      underscored: true
    }
  );

  return Genre;
}

module.exports = genre;
module.exports.Genre = Genre;
