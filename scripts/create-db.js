const { logger, logWrapper } = require("../src/utils/logger");
const { getClient, endConnection } = require("./psql-client");
const dropDB = require("./drop-db");

const { DATABASE } = process.env;

async function createDB() {
  const log = logWrapper({ package: "sequelize/create-db", method: "default" });
  const client = await getClient();
  if (!client) {
    logger.info(log(`Client is null`));
    return;
  }
  try {
    await dropDB(client);
    await client.query(`CREATE DATABASE ${DATABASE}`);
    logger.info(log(`DB created`));
  } catch (err) {
    logger.error(log(err));
  } finally {
    await endConnection();
  }
}

module.exports = createDB;
