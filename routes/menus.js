const jwt = require('jsonwebtoken');
const menus = require('express').Router();
const {Menu, Restaurant} = require('../models');
const multerConfig = require('../utils/multer');
const {validateUser} = require('./../middleware');

const upload = require('../services/image-upload.js');

menus.get('/', validateUser, async (req, res) => {
  let userId = req.body.userId;

  Restaurant.findOne({where: {id: userId}, include: 'menu'}).then(result => {
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Menu successfully fetched',
        data: result.menu,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Menu not found',
        data: {},
      });
    }
  });
});

menus.post('/', multerConfig.saveToUploads, validateUser, async (req, res) => {
  req.body.restaurantId = req.body.userId;
  req.body.avatar = req.file.originalname;

  Menu.create({...req.body})
    .then(result => {
      res.json({
        success: true,
        message: 'success',
        data: req.body,
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

menus.delete('/:id', async (req, res) => {
  let id = req.params.id;

  Menu.destroy({
    where: {
      id,
    },
  }).then(result => {
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Successfully deleted',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Data not found',
        data: result,
      });
    }
  });
});

menus.post('/image-upload', (req, res) => {
  res.json({
    success: true,
  });
});

module.exports = menus;
