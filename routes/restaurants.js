const restaurants = require("express").Router();
const { Restaurant } = require("../models");

restaurants.get("/", async (req, res) => {
  try {
    let data = await Restaurant.findAll({});

    if (data.length) {
      res.status(200).json({
        success: true,
        message: "success",
        data
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Restaurant still empty",
        data: {}
      });
    }
  } catch (err) {
    res.status(404).json({
      success: true,
      message: err.message,
      data: {}
    });
  }
});

restaurants.post("/", async (req, res) => {
  try {
    let { name, avatar, street, userId } = req.body;
    let data = await Restaurant.create({ name, avatar, street, userId });

    if (data) {
      res.json({
        success: true,
        message: "Restaurant successfully created",
        data
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create restaurant",
      data: {}
    });
  }
});

module.exports = restaurants;
