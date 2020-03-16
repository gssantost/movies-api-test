require("dotenv").config();
const createDB = require("./create-db");
const dropDB = require("./drop-db");

const SENTENCE = process.env.SENTENCE;

(async function() {
  switch (SENTENCE) {
    case "db:create":
      await createDB();
      break;

    case "db:drop":
      await dropDB();
      break;
  }

  return;
})();
