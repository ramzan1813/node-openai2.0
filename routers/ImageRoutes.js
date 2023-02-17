const express = require("express");
const { img } = require("../controllers/ImageController");
const route = express.Router();

route.post("/Image-generation", img);

module.exports = route;
