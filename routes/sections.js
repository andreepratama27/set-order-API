const jwt = require('jsonwebtoken');
const sections = require('express').Router();
const {Section, Restaurant} = require('../models');
const {validateUser} = require('./../middleware');

sections.get('/', validateUser, async (req, res) => {
  let userId = req.body.userId;

  Restaurant.findOne({where: {id: userId}, include: 'section'}).then(result => {
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Section successfully fetched',
        data: result.section,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Section not found',
        data: {},
      });
    }
  });
});

sections.post('/', validateUser, async (req, res) => {
  req.body.restaurantId = req.body.userId;

  Section.create({...req.body})
    .then(result => {
      res.status(200).json({
        success: true,
        message: 'Successfully create new section',
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

sections.delete('/:id', async (req, res) => {
  let id = req.params.id;

  Section.destroy({where: {id}})
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

module.exports = sections;
