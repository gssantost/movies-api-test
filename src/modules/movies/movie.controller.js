const movieService = require("./movie.service");
const send = require("../../utils/send");
const HttpStatus = require("../../constants/http-status");
const { CreateMovieDTO } = require("./dto/create-movie.dto");
const { NOT_FOUND, DELETE_SUCCESS } = require("./../../constants/message");
const { logger, logWrapper } = require("../../utils/logger");

const create = async (req, res) => {
  const log = logWrapper({ package: "movie.controller", method: "create" });
  logger.info(log("POST /movies"));
  try {
    const movieDTO = new CreateMovieDTO(req.body);
    const movie = await movieService.create(movieDTO);
    send(res, HttpStatus.CREATED, { movie });
  } catch (err) {
    logger.error(log(err.message));
    send(res, HttpStatus.BAD_REQUEST, { error: err.message });
  }
};

const getAll = async (req, res) => {
  const log = logWrapper({ package: "movie.controller", method: "getAll" });
  logger.info(log("GET /movies"));
  try {
    const movies = await movieService.getAll();
    send(res, HttpStatus.OK, { movies });
  } catch (err) {
    logger.error(log(err.message));
    send(res, HttpStatus.BAD_REQUEST, { error: err.message });
  }
};

const getById = async (req, res) => {
  const log = logWrapper({ package: "movie.controller", method: "getById" });
  logger.info(log(`GET /movies${req.params.id}`));
  try {
    const movie = await movieService.getById(req.params.id);
    const data = !movie ? { message: NOT_FOUND("Movie") } : { movie };
    send(res, HttpStatus.OK, data);
  } catch (err) {
    logger.error(log(err.message));
    send(res, HttpStatus.BAD_REQUEST, { error: err.message });
  }
};

const remove = async (req, res) => {
  const log = logWrapper({ package: "movie.controller", method: "remove" });
  logger.info(log(`DELETE /movies${req.params.id}`));
  try {
    const removed = await movieService.remove(req.params.id);
    const message = removed > 0 ? DELETE_SUCCESS("Movie") : NOT_FOUND("Movie");
    send(res, HttpStatus.OK, { message });
  } catch (err) {
    logger.error(log(err.message));
    send(res, HttpStatus.BAD_REQUEST, { error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove
};
