const pg = require("pg");
const { logger, logWrapper } = require("../src/utils/logger");

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT
} = process.env;

let client = null;

getClient = async (database = "template1") => {
  const log = logWrapper({
    package: "sequelize/psql-client",
    method: "getClient"
  });
  try {
    if (!client) {
      client = new pg.Client({
        user: DATABASE_USER,
        host: DATABASE_HOST,
        database: database,
        password: DATABASE_PASSWORD,
        port: +DATABASE_PORT
      });
      await client.connect();
      logger.info(log(`Psql client created`));
    }
    return client;
  } catch (err) {
    logger.error(log(err));
    return null;
  }
};

endConnection = async () => {
  const log = logWrapper({
    package: "sequelize/psql-client",
    method: "endConnection"
  });
  if (client) {
    client.end();
    client = null;
    logger.info(log(`Psql client connection terminated`));
  }
};

module.exports.getClient = getClient;
module.exports.endConnection = endConnection;
