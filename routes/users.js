const users = require("express").Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

const bcrypt = require("bcrypt");
const saltRound = 10;

users.get("/", (req, res) => {
  User.findAll()
    .then(data => {
      res.json({
        message: "success",
        success: true,
        data
      });
    })
    .catch(err => {
      res.json({
        message: "failed",
        success: false,
        data: err.message
      });
    });
});

users.post("/", (req, res) => {
  let { name, email, password, roleId } = req.body;

  bcrypt.genSalt(saltRound, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      User.create({ name, email, password: hash, roleId })
        .then(result => {
          res.json({
            success: true,
            message: "success",
            data: result
          });
        })
        .catch(err => {
          res.json({
            success: false,
            message: err.message,
            data: {}
          });
        });
    });
  });
});

users.post("/signin", async (req, res) => {
  let { email, password } = req.body;

  User.findAll({
    where: {
      email
    }
  })
    .then(result => {
      let [data] = result;

      bcrypt.compare(password, data.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { id: data.id, email: data.email, name: data.name },
            "secret_key"
          );

          res.status(200).json({
            success: true,
            message: "authenticated",
            data,
            token
          });
        } else {
          res.status(401).json({
            success: false,
            message: "not authenticated",
            data: {},
            token: null
          });
        }
      });
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "not found",
        data: {}
      });
    });
});

module.exports = users;
