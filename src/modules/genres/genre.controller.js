const genreService = require("./genre.service");
const send = require("../../utils/send");
const HttpStatus = require("../../constants/http-status");
const { CreateGenreDTO } = require("./dto/create-genre");
const { NOT_FOUND, DELETE_SUCCESS } = require("./../../constants/message");
const { logger, logWrapper } = require("../../utils/logger");

const create = async (req, res) => {
  const log = logWrapper({ package: "genre.controller", method: "create" });
  logger.info(log(`POST /genres`));
  try {
    const genreDTO = new CreateGenreDTO(req.body);
    const genre = await genreService.create(genreDTO);
    send(res, HttpStatus.CREATED, { genre });
  } catch (err) {
    logger.error(log(err.message));
    send(res, HttpStatus.BAD_REQUEST, { error: err });
  }
};

const getAll = async (req, res) => {
  const log = logWrapper({ package: "genre.controller", method: "getAll" });
  logger.info(log(`GET /genres`));
  try {
    const genres = await genreService.getAll();
    send(res, HttpStatus.OK, { genres });
  } catch (err) {
    logger.error(log(err.message));
    send(res, HttpStatus.BAD_REQUEST, { error: err });
  }
};

const getById = async (req, res) => {
  const log = logWrapper({ package: "genre.controller", method: "getById" });
  logger.info(log(`GET /genres${req.params.id}`));
  try {
    const genre = await genreService.getById(req.params.id);
    const data = !genre ? { message: NOT_FOUND("Genre") } : { genre };
    send(res, HttpStatus.OK, data);
  } catch (err) {
    logger.error(log(err.message));
    send(res, HttpStatus.BAD_REQUEST, { error: err });
  }
};

const remove = async (req, res) => {
  const log = logWrapper({ package: "genre.controller", method: "remove" });
  logger.info(log(`DELETE /genres${req.params.id}`));
  try {
    const removed = await genreService.remove(req.params.id);
    const message = removed > 0 ? DELETE_SUCCESS("Genre") : NOT_FOUND("Genre");
    send(res, HttpStatus.OK, { message });
  } catch (err) {
    logger.error(log(err.message));
    send(res, HttpStatus.BAD_REQUEST, { error: err });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove
};
