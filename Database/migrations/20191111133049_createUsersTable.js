exports.up = function(knex) {
  return knex.schema.createTable("Users", table => {
    table.increments();

    table
      .string("username", 56)
      .notNullable()
      .unique();
    table.string("password", 56).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
