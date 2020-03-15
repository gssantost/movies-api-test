const movieService = require("./movie.service");
const send = require("../../utils/send");
const HttpStatus = require("../../constants/http-status");
const { CreateMovieDTO } = require("./dto/create-movie.dto");
const { NOT_FOUND, DELETE_SUCCESS } = require("./../../constants/message");

const create = async (req, res) => {
  try {
    const movieDTO = new CreateMovieDTO(req.body);
    const movie = await movieService.create(movieDTO);
    send(res, HttpStatus.CREATED, { movie });
  } catch (err) {
    send(res, HttpStatus.BAD_REQUEST, { error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const movies = await movieService.getAll();
    send(res, HttpStatus.OK, { movies });
  } catch (err) {
    send(res, HttpStatus.BAD_REQUEST, { error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const movie = await movieService.getById(req.params.id);
    const data = !movie ? { message: NOT_FOUND("Movie") } : { movie };
    send(res, HttpStatus.OK, data);
  } catch (err) {
    send(res, HttpStatus.BAD_REQUEST, { error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const removed = await movieService.remove(req.params.id);
    const message = removed > 0 ? DELETE_SUCCESS("Movie") : NOT_FOUND("Movie");
    send(res, HttpStatus.OK, { message });
  } catch (err) {
    console.log("error:", err);
    send(res, HttpStatus.BAD_REQUEST, { error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove
};
