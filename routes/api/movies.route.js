const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Movie = require('../../models/movie.model');

const validateMovieInput = require('../../validation/movie.validation');

//@route    GET api/movies/tests
//@desc     Test movies route
//@access   Public
router.get('/tests', (req, res) => res.json({ msg: 'Movies WOrks' }));

//@route    POST api/movies
//@desc     Create or edit Movies
//@access   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMovieInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //GET FIELDS
    const movieFields = {};
    movieFields.movietitle = req.body.movietitle;
    if (req.body.movietitle) movieFields.movietitle = req.body.movietitle;
    if (req.body.director) movieFields.director = req.body.director;
    if (req.body.releasedate) movieFields.releasedate = req.body.releasedate;
    if (req.body.stars) movieFields.stars = req.body.stars;
    if (req.body.info) movieFields.info = req.body.info;

    movieFields.social = {};

    if (req.body.youtube) movieFields.social.youtube = req.body.youtube;
    if (req.body.twitter) movieFields.social.twitter = req.body.twitter;
    if (req.body.facebook) movieFields.social.facebook = req.body.facebook;
    if (req.body.instagram) movieFields.social.instagram = req.body.instagram;

    // new Movie(movieFields).save().then((movie) => res.json(movie));

    Movie.findOne({ movietitle: req.body.movietitle }).then((movie) => {
      if (movie) {
        //Update
        Movie.findOneAndUpdate(
          { movietitle: req.body.movietitle },
          { $set: movieFields },
          { new: true }
        ).then((movie) => res.json(movie));
      } else {
        //Create

        //Check if handle exists
        Movie.findOne({ movietitle: movieFields.movietitle }).then((movie) => {
          if (movie) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          //Save profile
          new Movie(movieFields).save().then((movie) => res.json(movie));
        });
      }
    });
  }
);

//@route    GET api/movies
//@desc     get one movie by name
//@access   Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Movie.findOne({ movietitle: req.body.movietitle })
      .then((movie) => {
        if (!movie) {
          errors.nomovie = 'There is no movie';
          return res.status(404).json(errors);
        }
        res.json(movie);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   GET api/movies/id/:id
// @desc    Get movies by id
// @access  Public
router.get('/id/:id', (req, res) => {
  const errors = {};

  Movie.findOne({ _id: req.params.id })
    .then((movie) => {
      if (!movie) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(movie);
    })
    .catch((err) => res.status(404).json(err));
});

//@route    GET api/movies/all
//@desc     Get all movies
//@access   Public
router.get('/all', (req, res) => {
  const errors = {};

  Movie.find()
    .then((movies) => {
      if (!movies) {
        errors.nomovie = 'There are no movie';
        return res.status(404).json(errors);
      }
      res.json(movies);
    })
    .catch((err) => res.status(404).json({ movie: 'There is no movies' }));
});

//@route    DELETE api/movies/
//@desc     Delete movies
//@access   Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Movie.findOneAndRemove({ movietitle: req.body.movietitle }).then(() =>
    Movie.findById({ _id: req.params.id })
      .then((movie) => {
        // Delete
        movie.remove().then(() => res.json({ success: true }));
      })
      .catch((err) =>
        res.status(404).json({ movieNotFound: 'No Movie found' })
      );
  }
);

module.exports = router;
