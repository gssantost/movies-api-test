const app = require("./app");
const { sequelize } = require("./models");
const PORT = +process.env.PORT;

(async function() {
  await sequelize.sync({ alter: true });
})();

app.listen(PORT, () => {
  console.log(`Application listening on port:::${PORT}`);
});
