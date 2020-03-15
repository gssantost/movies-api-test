const genreService = require("./genre.service");
const send = require("../../utils/send");
const HttpStatus = require("../../constants/http-status");
const { CreateGenreDTO } = require("./dto/create-genre");
const { NOT_FOUND, DELETE_SUCCESS } = require("./../../constants/message");

const create = async (req, res) => {
  try {
    const genreDTO = new CreateGenreDTO(req.body);
    const genre = await genreService.create(genreDTO);
    send(res, HttpStatus.CREATED, { genre });
  } catch (err) {
    console.log("Error: ", err);
    send(res, HttpStatus.BAD_REQUEST, { error: err });
  }
};

const getAll = async (req, res) => {
  try {
    const genres = await genreService.getAll();
    send(res, HttpStatus.OK, { genres });
  } catch (err) {
    console.log("Error: ", err.message);
    send(res, HttpStatus.BAD_REQUEST, { error: err });
  }
};

const getById = async (req, res) => {
  try {
    const genre = await genreService.getById(req.params.id);
    const data = !genre ? { message: NOT_FOUND("Genre") } : { genre };
    send(res, HttpStatus.OK, data);
  } catch (err) {
    console.log("Error: ", err.message);
    send(res, HttpStatus.BAD_REQUEST, { error: err });
  }
};

const remove = async (req, res) => {
  try {
    const removed = await genreService.remove(req.params.id);
    const message = removed > 0 ? DELETE_SUCCESS("Genre") : NOT_FOUND("Genre");
    send(res, HttpStatus.OK, { message });
  } catch (err) {
    console.log("Error: ", err.message);
    send(res, HttpStatus.BAD_REQUEST, { error: err });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove
};
