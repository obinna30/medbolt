// importing
const express = require("express");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
const CORS = require("cors");
const { urlencoded, json } = require("body-parser");
const { resolve } = require("path");
const { cloudinaryConfig } = require("./cloudinaryConfig");

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 9001;

// middleware
app.use(express.json());
app.use(CORS());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(express.static(resolve(__dirname, "src/public")));
app.use("*", cloudinaryConfig);

// db config

// API routes
require("./routes")(app);

// listening
app.listen(port, async () => {
  console.log(`listening on localhost: ${port}`);
  await sequelize.authenticate();
  console.log("Database connected!!!");
});

module.exports = app;
