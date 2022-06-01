const app = require("./src/app");
const port = process.env.APP_PORT || 8080;

app.listen(port, () => {
  console.log(`API Running on ${port}`);
});
