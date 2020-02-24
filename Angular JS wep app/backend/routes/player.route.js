const express = require('express');
const app = express();
const playerRoute = express.Router();

// Student model
let Player = require('../database/model/player');

// Add Student
playerRoute.route('/add-player').post((req, res, next) => {
  Player.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all student
playerRoute.route('/').get((req, res) => {
  Player.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})




// Update student
playerRoute.route('/update-player/:id').put((req, res, next) => {
  Player.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Player successfully updated!')
    }
  })
})

// Delete student
playerRoute.route('/delete-player/:id').delete((req, res, next) => {
  Player.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = playerRoute;