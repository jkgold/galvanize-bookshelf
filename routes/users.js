'use strict';
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const boom = require('boom')
const knex = require('../knex');
const router = express.Router();
const { camelizeKeys, decamelizeKeys } = require('humps');

// YOUR CODE HERE


router.post('/users', (req,res,next) => {

  var hash =bcrypt.hashSync(req.body.password, 12);
  res.set('Application', 'application/json');
  knex('users')
  .insert({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
    hashed_password: hash

  }, '*')

  .then((user) => {
    console.log(user);
    var updateUser = {
      id: user[0].id,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email
    };
    const userCamel =
    camelizeKeys(updateUser);
    delete user.hashedPassword;
console.log(userCamel);
    res.send(userCamel);

  })
  .catch((err) => {
    console.log(err);
    next(err);
    });
  });


module.exports = router;
