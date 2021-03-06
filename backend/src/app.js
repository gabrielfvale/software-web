const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs");

const express = require("express");

const rootRouter = require("./routes/root.routes");
const movieRouter = require("./routes/movie.routes");
const listRouter = require("./routes/list.routes");
const reviewRouter = require("./routes/review.routes");
const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", rootRouter);
app.use("/movie", movieRouter);
app.use("/list", listRouter);
app.use("/review", reviewRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
