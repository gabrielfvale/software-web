const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const app = express();
app.use(express.json());

module.exports = app;
