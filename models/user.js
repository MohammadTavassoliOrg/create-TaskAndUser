const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: {type: Boolean, default: false}
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.jwtPrivateKey);
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean()
  };

  return Joi.validate(user, schema);
}
exports.User = User;
exports.validateUser = validateUser;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY1YThhOGVjMGYxNTE0NjA4NTY1NWYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MzQwNTI0NjB9.Tzb0iBNVQHL_9eriD-g04IVpAlQUYDtU72yZlsts1GQ