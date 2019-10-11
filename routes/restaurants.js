const config = require('../config/keys');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const s3 = new aws.S3({
  accessKeyId: config.AWSAccessKeyId,
  secretAccessKey: config.AWSSecretKey,
});

const imgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'img-upload-test27',
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname),
      );
    },
  }),
  limits: {fileSize: 2000000},
  fileFilter: function(req, file, cb) {},
}).single('image');

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

restaurants.get('/:id', validateUser, async (req, res) => {
  let restaurantId = req.params.id;

  try {
    let data = await Restaurant.findAll({
      where: {
        id: restaurantId,
      },
    }).then(result => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: 'success',
          result,
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Restaurant not found',
          data: {},
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
      data: {},
    });
  }
});

restaurants.get('/:id/menu', validateUser, async (req, res) => {
  let restaurantId = req.params.id;

  try {
    let data = await Restaurant.findOne({
      where: {
        id: restaurantId,
      },
      include: 'menu',
    }).then(result => {
      res.status(200).json({
        success: true,
        message: 'Success',
        data: result.menu,
      });
    });
  } catch (err) {
    res.status(404).json({
      success: false,
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

module.exports = restaurants;
