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

    router.patch('/books/:id', (req, res, next) => {
      var body = req.body;
      var updateBook = {
        title: body.title,
        author: body.author,
        genre: body.genre,
        description: body.description,
        cover_url: body.coverUrl
      };
     knex('books')
     .where('id', req.params.id)
     .first()
     .then((data) => {

       if (!data) {
         return next();
       }
       return knex('books')
        .update(decamelizeKeys(updateBook) , "*")
        .where('id', req.params.id);
     })
     .then((data) => {
       const deCamelBook = data[0];
       delete deCamelBook.created_at;
       delete deCamelBook.updated_at;
       res.send(camelizeKeys(data[0]));
     })
     .catch((err) => {
       next(err);
     });
   });
//begin delete
router.delete('/books/:id', (req, res, next) => {
  let book;

  knex('books')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      book = row;
      if (!row) {
        return next();
      }


      return knex('books')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete book.id;
      res.send(camelizeKeys(book));
    })
    .catch((err) => {
      next(err);
    });
});







module.exports = router;
