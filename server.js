const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const authRouter = require("./Auth/auth-router");
const usersRouter = require("./Users/user-router");

const server = express();

const sessionConfig = {
  name: "cookieCookie",
  secret: "open sesame",
  cookie: {
    maxAge: 1000 * 60 * 35,
    secure: false,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require("./Database/dbConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 35
  })
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("<h1> YO! </h1>");
});

module.exports = server;
