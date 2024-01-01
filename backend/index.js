const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const informationRoute = require("./src/information");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/information", informationRoute);

module.exports = app;
