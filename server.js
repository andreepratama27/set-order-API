const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

const api = require("./routes/api");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1", api);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;
