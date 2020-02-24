const express = require('express');
const app = express();
const gameRoute = express.Router();

// Student model
let Game = require('../database/model/game');

// Get all student
gameRoute.route('/').get((req, res) => {
    Game.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

module.exports = gameRoute;