const express = require("express");
const openai = require("openai");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const post = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", require("./routers/openaiRouter"));
app.use("/api", require("./routers/ImageRoutes"));

app.listen(post, (req, res) => {
  console.log(`the code is run at ${process.env.Domain}:${post}`);
});
