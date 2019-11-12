const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const authRouter = require('./Auth/auth-router');
const usersRouter = require('./Users/user-router');

const Users = require("./Users/user-model");

const server = express();

server.use(helmet());
server.use(cors());
server.use(cookieParser());
server.use(express.json());


server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


server.get("/", (req, res) => {
  res.send("<h1> YO! </h1>");
});



module.exports = server;
