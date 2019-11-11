const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
    res.send('<h1> YO! </h1>')
})

server.get("/api/register", (req, res) => {
    
})


module.exports = server;