const express = require("express");
const { APIResult } = require("../controllers/openaiControllerText");
const route = express.Router();

route.post("/Text-generation", APIResult);
//  (req, res) => {
//   console.log("api call");
//   res.status(200).json({
//     success: true,
//   });
// });

module.exports = route;
