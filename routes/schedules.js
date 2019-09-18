const jwt = require('jsonwebtoken');
const schedules = require('express').Router();
const {Schedule, Restaurant} = require('../models');
const {validateUser} = require('./../middleware');

schedules.get('/', validateUser, async (req, res) => {
  let userId = req.body.userId;

  Restaurant.findOne({where: {id: userId}, include: 'schedule'}).then(
    result => {
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Schedule successfully fetched',
          data: result.schedule,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Schedule not found',
          data: {},
        });
      }
    },
  );
});

schedules.post('/', validateUser, async (req, res) => {
  req.body.restaurantId = req.body.userId;

  Schedule.create({...req.body})
    .then(result => {
      res.status(200).json({
        success: true,
        message: 'Successfully create new schedule',
        data: req.body,
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

schedules.delete('/:id', async (req, res) => {
  let id = req.params.id;

  Schedule.destroy({where: {id}})
    .then(result => {
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
          data: {},
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message,
        data: {},
      });
    });
});

module.exports = schedules;
