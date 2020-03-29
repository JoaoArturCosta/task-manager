const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

module.exports = {
    registerUser (req, res) {
        const { email, password } = req.body;
        const user = new User({ email, password });
        user.save(function(err) {
          if (err) {
            res.status(500)
              .send("Error registering new user please try again.");
          } else {
            res.status(200).send("Welcome to the club!");
          }
        });
      },
    authenticate (req, res) {
        const { email, password } = req.body;
        User.findOne({ email }, function(err, user) {
          if (err) {
            console.error(err);
            res.status(500)
              .json({
              error: 'Internal error please try again'
            });
          } else if (!user) {
            res.status(401)
              .json({
                error: 'Incorrect email'
              });
          } else {
            user.isCorrectPassword(password, function(err, same) {
              if (err) {
                res.status(500)
                  .json({
                    error: 'Internal error please try again'
                });
              } else if (!same) {
                res.status(401)
                  .json({
                    error: 'Incorrect password'
                });
              } else {
                const payload = { email };
                const token = jwt.sign(payload, secret, {
                  expiresIn: '1h'
                });
                res.cookie('token', token, { httpOnly: true })
                  .sendStatus(200);
              }
            });
          }
        });
    },
    getByEmail (req, res) {
        User.findOne({email: req.params.userEmail})
            .populate({
                path: "projects",
                select: ["title"],
                model: "Project",
                populate: {
                    path: "tasks",
                    select: ["title", "body"],
                    model: "Task"
                }
            })
            .exec((err, project) => {
                this._handleResponse(err, project, res)
            })
    },
    _handleResponse (err, data, res) {
        if (err) {
            res.status(400).end()
        } else {
            res.send(data)
        }
    },
}
