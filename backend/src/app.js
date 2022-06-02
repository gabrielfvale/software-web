const dotenv = require("dotenv");
dotenv.config();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const express = require("express");

const rootRouter = require("./routes/root.routes");
const movieRouter = require("./routes/movie.routes");
const listRouter = require("./routes/list.routes");
const reviewRouter = require("./routes/review.routes");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Filmit API",
    version: "1.0.0",
  },
};

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routes/*.js"],
});

const app = express();
app.use(express.json());

// Routes
app.use("/", rootRouter);
app.use("/movie", movieRouter);
app.use("/list", listRouter);
app.use("/review", reviewRouter);

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
