const express = require("express");

const userRouter = express.Router();

const Users = require("./user-model");

userRouter.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = userRouter;

