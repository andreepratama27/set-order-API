const api = require("express").Router();
const { User, Role } = require("../models/index.js");
const models = require("../models");

api.get("/users", (req, res) => {
  User.findAll()
    .then(data => {
      console.log("data", data.User);
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

api.post("/users", (req, res) => {
  let { name, email, password, roleId } = req.body;

  User.create({ name, email, password, roleId })
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

api.get("/roles", (req, res) => {
  Role.findAll({ include: "user" })
    .then(data => {
      res.json({
        success: true,
        message: "successfully created",
        data
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: "failed",
        data: err.message
      });
    });
});

api.post("/roles", async (req, res) => {
  try {
    let { name } = req.body;
    let roles = Role.create({
      name
    });

    if (roles) {
      res.json({
        success: true,
        message: "Data successfully created",
        roles
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
      data: {}
    });
  }
});
module.exports = api;
