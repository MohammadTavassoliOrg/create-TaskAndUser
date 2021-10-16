// file name => task
const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 1024,
  },
  done: {
    type: Boolean,
    default: false
  },
  users: {
    type: mongoose.Schema.Types.ObjectId
  }
});
const Task = mongoose.model('Task', taskSchema);

function validateTitle (task) {
  const schema = {
    title: Joi.string().min(1).max(1024),
    users: Joi.objectId(),
    done : Joi.boolean()
  }
  return Joi.validate(task, schema);
};

exports.validateTitle = validateTitle;
exports.Task = Task;