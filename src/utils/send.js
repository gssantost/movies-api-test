// function as a helper for controller responses

module.exports = (res, status, data) => {
  res.status(status).send({ status, ...data });
};
