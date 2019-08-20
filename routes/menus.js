const menus = require('express').Router();
const jwt = require('jsonwebtoken');
const {Menu} = require('../models');

menus.get('/', async (req, res) => {
  // get id user who login with token
  try {
    let data = await Menu.findAll({});

    res.status(200).json({
      success: true,
      message: 'success',
      data,
    });
  } catch (err) {
    res.status(404).json({
      success: true,
      message: err.message,
      data: {},
    });
  }
});

menus.post('/', async (req, res) => {
  Menu.create({...req.body})
    .then(result => {
      res.json({
        success: true,
        message: 'success',
        data: result,
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: err.message,
        data: {},
      });
    });
});

module.exports = menus;
