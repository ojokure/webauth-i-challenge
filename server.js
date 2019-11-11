const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const Users = require('./Users/user-model')

const db = require("./Database/dbConfig");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1> YO! </h1>");
});

server.post("/api/register", (req, res) => {
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

server.post('/api/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findByUsername({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome back ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Please provide correct username and password' });
        }
      })
      .catch(error => {
        res.status(500).json(error); 
      });
  });

  server.get('/api/users', (req, res) => {
   
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

module.exports = server;
