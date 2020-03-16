const app = require("./app");
const { sequelize } = require("./models");
const PORT = +process.env.PORT;

(async function() {
  try {
    await sequelize.sync({ alter: true });
  } catch (err) {
    console.log(err);
    throw err;
  }
})();

app.listen(PORT, () => {
  console.log(`Application listening on port:::${PORT}`);
});
