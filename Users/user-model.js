const db = require("../Database/dbConfig");

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db("users").select("id", "username", "password");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function add(user) {
  db("Users")
    .insert(user, "id")
    .then(([id]) => {
      return findById(id);
    });
}
