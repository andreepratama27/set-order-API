const restaurants = require('express').Router();
const jwt = require('jsonwebtoken');
const {Restaurant} = require('../models');
const {validateUser} = require('../middleware');

const bcrypt = require('bcrypt');
const saltRound = 10;

restaurants.get('/', validateUser, async (req, res) => {
  try {
    let data = await Restaurant.findAll({include: 'menu'});

    if (data.length) {
      res.status(200).json({
        success: true,
        message: 'success',
        data,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Restaurant still empty',
        data: {},
      });
    }
  } catch (err) {
    res.status(404).json({
      success: true,
      message: err.message,
      data: {},
    });
  }
});

restaurants.post('/signin', (req, res) => {
  let {email, password} = req.body;

  Restaurant.findAll({where: {email}})
    .then(result => {
      let [data] = result;

      bcrypt.compare(password, data.password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            {id: data.id, email: data.email, name: data.name},
            'secret_key',
          );

          res.status(200).json({
            success: true,
            message: 'Successfully login',
            data,
            token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Restaurant not authenticated',
            data: {},
            token: null,
          });
        }
      });
    })
    .catch(err => {
      res.status(401).json({
        success: false,
        message: err.message,
        data: {},
      });
    });
});

restaurants.post('/signup', async (req, res) => {
  let {name, avatar, street, email, password, phone} = req.body;

  bcrypt.genSalt(saltRound, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      Restaurant.create({
        name,
        avatar,
        street,
        email,
        password: hash,
        phone,
      })
        .then(result => {
          res.json({
            success: true,
            message: 'Restaurant successfully created',
            data: result,
          });
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            message: err.message,
            data: {},
          });
        });
    });
  });
});

restaurants.get('/me', validateUser, async (req, res) => {
  let userId = req.body.userId;
  Restaurant.findOne({where: {id: userId}}).then(result => {
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Profile successfully fetched',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
        data: {},
      });
    }
  });
});

restaurants.post;

module.exports = restaurants;
