const roles = require("express").Router();
const { Role } = require("../models/index.js");

roles.get("/", (req, res) => {
  Role.findAll({})
    .then(data => {
      res.json({
        success: true,
        message: "success",
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

roles.post("/", async (req, res) => {
  try {
    let { name } = req.body;

    let data = Role.create({
      name
    });

    if (data) {
      res.json({
        success: true,
        message: "Data successfully created",
        data
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

module.exports = roles;
