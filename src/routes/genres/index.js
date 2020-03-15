const express = require("express");
const genreController = require("../../modules/genres/genre.controller");
const router = express.Router();

router.get("/:id", genreController.getById);
router.get("/", genreController.getAll);
router.post("/", genreController.create);
router.delete("/:id", genreController.remove);

module.exports = router;
