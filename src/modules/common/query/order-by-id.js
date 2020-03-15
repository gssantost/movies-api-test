const { EXCLUDE_DATES } = require("../../../constants/query-exclusions");

module.exports.orderById = () => {
  return {
    attributes: {
      exclude: EXCLUDE_DATES
    },
    order: ["id"]
  };
};
