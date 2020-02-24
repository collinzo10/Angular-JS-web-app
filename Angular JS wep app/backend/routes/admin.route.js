const express = require('express');
const app = express();
const adminRoute = express.Router();

// Student model
let Admin = require('../database/model/admin');

// Add Student
adminRoute.route('/admin-login').post((req, res, next) => {
    if (req.body.userName && req.body.password) {
        Admin.authenticate(req.body.userName, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                return res.json(user);
            }
        });
    }
});

module.exports = adminRoute;