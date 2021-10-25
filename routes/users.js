const auth = require("./middleware/auth");
const admin = require("./middleware/admin")
const generateAuthToken = require("./auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {User, validateUser} = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
        const user = await User.findById(req.user._id).select("-password");
        res.send(user);
});
router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("this user is already registered");
    user = new User(_.pick(req.body, ["password", "name", "email", "isAdmin"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
});
router.delete("/:id", [auth, admin], async (req, res) => {
    const removeUser = await User.findByIdAndRemove(req.params.id).select("-password");

    if (!removeUser) return res.status(404).send('The user with the given ID was not found.');

    if (removeUser.isAdmin === true) return res.status(400).send("this user is admin🗿");
  
    res.send(removeUser);
});
router.put("/id", [auth, admin], async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const putUser = await User.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  
    if (!putUser) return res.status(404).send('The genre with the given ID was not found.');
    
    res.send(putUser);
});

module.exports = router;