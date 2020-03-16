const { createLogger, format, transports } = require("winston");

const { printf, combine, prettyPrint } = format;

const customFormat = printf(({ level, message }) => {
  if (typeof message === "string") {
    return `${level}: ${message}`;
  }
  const { package, method, log } = message;
  return `${level}:
    package: ${package}
    method: ${method}
    message: ${log}`;
});

const logger = createLogger({
  level: "debug", // What else?
  format: combine(prettyPrint(), customFormat),
  transports: [
    new transports.File({
      filename: "./logs/debug.log",
      level: "debug"
    }),
    new transports.File({
      filename: "./logs/error.log",
      level: "error"
    }),
    new transports.File({
      filename: "./logs/all.log"
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console());
}

/**
 * Function that return an function that returns a JSON
 * with the valid format for the logger
 * @param {string} package to register the package where the log was emmited
 * @param {string} method to register the exact method where the log was emitted
 * @return {function} a funcion that accepts a message as an argument and returns the log message's format
 */
const logWrapper = ({ package, method }) => _log => {
  const log = typeof _log === "object" ? JSON.stringify(_log) : _log;
  return { package, method, log };
};

module.exports.logger = logger;
module.exports.logWrapper = logWrapper;
