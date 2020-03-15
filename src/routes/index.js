const express = require("express");
const router = express.Router();

router.use("/genres", require("./genres"));
router.use("/movies", require("./movies"));

module.exports = router;
