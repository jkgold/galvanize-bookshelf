'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.varchar('first_name').notNullable().defaultTo('');
    table.varchar('last_name').notNullable().defaultTo('');
    table.varchar('email').notNullable().unique();
    table.specificType('hashed_password','char(60)').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.droptTable('users');

};
