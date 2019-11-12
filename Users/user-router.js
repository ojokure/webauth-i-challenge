const express = require("express");

const validate = require("../Auth/validate-session");

const userRouter = express.Router();

const Users = require("./user-model");

userRouter.get("/", validate, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err =>
      res.status(500).json({
        message: err.message
      })
    );
});

module.exports = userRouter;
