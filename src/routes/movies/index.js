const express = require("express");
const movieController = require("../../modules/movies/movie.controller");
const router = express.Router();

router.get("/:id", movieController.getById);
router.get("/", movieController.getAll);
router.post("/", movieController.create);
router.delete("/:id", movieController.remove);

module.exports = router;
