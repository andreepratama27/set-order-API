const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

const { users, roles, restaurants } = require("./routes/api");

const validateUser = (req, res, next) => {
  console.log(req.headers);
  let token = req.headers["authorization"] || req.headers["x-access-token"];

  if (token.startsWith("Bearer")) {
    token = token.substr(7, token.length);
  }

  if (token) {
    jwt.verify(req.headers["authorization"], "secret_key", (err, decoded) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: err.message, data: {} });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } else {
    res
      .status(500)
      .json({ success: false, message: "Token not provided", data: {} });
  }
};

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/users/", users);
app.use("/api/v1/roles/", roles);
app.use("/api/v1/restaurants", validateUser, restaurants);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;
