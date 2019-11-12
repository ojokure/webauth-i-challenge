const express = require("express");

const bcrypt = require("bcryptjs");

const Users = require("../Users/user-model");

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  if (req.body.username && req.body.password) {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const newUser = {
      username,
      password: hash
    };
    Users.add(newUser)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json({
          message: error.message
        });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password"
    });
  }
});

authRouter.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findByUsername({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome back ${user.username}!` });
      } else {
        res
          .status(401)
          .json({ message: "You cannot pass" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

module.exports = authRouter;
