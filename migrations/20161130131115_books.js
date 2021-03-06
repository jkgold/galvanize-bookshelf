'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments();
    table.varchar('title').notNullable().defaultTo('');
    table.varchar('author').notNullable().defaultTo('');
    table.varchar('genre').notNullable().defaultTo('');
    table.text('description').notNullable().defaultTo('');
    table.text('cover_url').notNullable().defaultTo('');
    table.timestamps(true, true);
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};

// exports.up = function(knex, Promise) {
//
// };
//
// exports.down = function(knex, Promise) {
//
// };
