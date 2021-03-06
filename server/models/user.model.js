const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Types = Schema.Types;
const Project = require('./project.model')

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projects: [
        {type: Types.ObjectId, ref: "Project", default: []}
    ]
  });

  UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
      const document = this;
      bcrypt.hash(document.password, saltRounds,
        function(err, hashedPassword) {
        if (err) {
          next(err);
        }
        else {
          document.password = hashedPassword;
          next();
        }
      });
    } else {
      next();
    }
  });

  UserSchema.methods.isCorrectPassword = function(password, callback) {
      bcrypt.compare(password, this.password, function(err,same){
          if(err){
              callback(err);
          } else {
              callback(err,same);
          }
      })
  }
  
module.exports = mongoose.model('User', UserSchema, "users");