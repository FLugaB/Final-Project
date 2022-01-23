if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require('cors')
const route = require("./routes");

app.use(cors())
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", route);

module.exports = app