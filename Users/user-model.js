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
  return db("Users")
    .where({ id })
    .first();
}

function add(user) {
    return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findById(id);
      });
  }
