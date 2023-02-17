const express = require("express");
const openai = require("openai");
const dev = require("dotenv").config();
const post = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routers/openaiRouter"));
app.use("/api", require("./routers/ImageRoutes"));
// .json({
//     success: "yes",
//     data: "hello world",

//   });
// });
const hostname = process.env.Domain;

app.listen(post, (req, res) => {
  console.log(`the code is run at ${process.env.Domain}:${post}`);
});
