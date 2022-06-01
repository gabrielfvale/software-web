const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const movieRouter = require("./routes/movie.routes");

const app = express();
app.use(express.json());

// Routes
app.use("/movie", movieRouter);

module.exports = app;
