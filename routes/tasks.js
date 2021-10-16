// file name => tasks
const {Task, validateTitle} = require("../models/task");
const {User} = require("../models/user")
const express = require('express');
const auth = require("./middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const find_task = await Task.find({users: req.user._id});
  if (!find_task) return res.status(404).send("this thask is not defined🦍")

  res.status(200).send(find_task)
});

router.post('/', auth, async (req, res) => {
  const { error } = validateTitle(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  newtask = new Task({
    done: req.body.done,
    title: req.body.title,
    users: req.user._id
  });
  await newtask.save(); 
  res.status(200).send(newtask);
  console.log(newtask.done);
});

module.exports = router;


// db.sales.insertOne({saleDate: new Date(),items: [{name: "printer paper", price: 40, quantity: 2}, {name: "notepad", price: 35, quantity: 5}],storeLocation: "Denver",customer: {gender: "male", age: 42, email: "mohammad@gmail.com"},couponUsed: true,purchasedMethod: "online",timestamp: new Timestamp(),longNumber: 123456789123456789})