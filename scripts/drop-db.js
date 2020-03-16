const { logger, logWrapper } = require("../src/utils/logger");
const { getClient, endConnection } = require("./psql-client");

const { DATABASE } = process.env;

async function dropDB(_client = null) {
  const log = logWrapper({ package: "sequelize/drop-db", method: "default" });
  try {
    const client = _client ? _client : await getClient();
    const result = await client.query(
      `SELECT datname FROM pg_database WHERE datname = '${DATABASE}';`
    );
    if (result.rowCount > 0) {
      logger.info(log(`Droping ${DATABASE} database`));
      await client.query(`DROP DATABASE ${DATABASE};`);
    } else {
      logger.info(log(`${DATABASE} did not exists`));
    }
    return {};
  } catch (err) {
    logger.error(log(err));
    return null;
  } finally {
    if (!_client) {
      await endConnection();
    }
  }
}

module.exports = dropDB;
