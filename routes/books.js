'use strict';

const express = require('express');
const boom = require('boom')
const knex = require('../knex');
const router = express.Router();
const { camelizeKeys, decamelizeKeys } = require('humps');

router.get('/books', (_req, res, next) => {
  knex('books')
    .orderBy('title')
    .then((book) => {
      var result = camelizeKeys(book)
      res.send(result);
    })
    .catch((err) => {
      next(err);
    });
});
 router.get('/books/:id', (req, res, next) => {
   knex('books')
   .where('id', req.params.id)
   .first()
   .then((book) => {
      const bookCamel = camelizeKeys(book);
     if (!book) {
       return next();
     }
     res.send(bookCamel);
   })
   .catch((err) => {
     next(err);
      });
    });

  router.post('/books', (req,res, next) => {
    knex('books')
    .insert({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      cover_url: req.body.coverUrl

    }, '*')

   .then((book) => {
     const bookCamel = camelizeKeys(book);
     res.send(bookCamel[0]);
   })
   .catch((err) => {
     next(err);
      });
    });





  //  router.patch('/books/:id', (req, res, next) => {
  //    knex('books')
  //    .where('id', req.params.id)
  //    .first()
  //    .then((book) => {
  //     const bookCamel = camelizeKeys(book);
  //      if (!book) {
  //        return next();
  //      }
   //
  //      return knex('books')
  //       .update({ name: req.body.name }, "*")
  //       .where('id', req.params.id);
  //    })
  //    .then((bookCamel) => {
  //      res.send(bookCamel[0]);
  //    })
  //    .catch((err) => {
  //      next(err);
  //    });
  //  });





module.exports = router;
