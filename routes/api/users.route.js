const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../../validation/register.validation');
const validateLoginInput = require('../../validation/login.validation');

const keys = require('../../config/keys.config');

const User = require('../../models/user.model');

//@route    GET api/users/tests
//@dest     Test users route
//@access   Public
router.get('/tests', (req, res) => res.json({ msg: 'users WOrks' }));

//@route    POST api/users/register
//@dest     Register user
//@access   Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //Size
        r: 'pg', //Rating
        d: 'mm', //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/users/login
//@dest     Login User / Returning JWT
//@access   Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check Validdation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then((user) => {
    //check for user
    if (!user) {
      errors.email = 'User not Found!';
      return res.status(404).json(errors);
    }

    //Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        errors.password = 'Password Incorect!';
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    GET api/users/current
//@dest     Return Current User
//@access   Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      Name: req.user.name,
      Email: req.user.email,
    });
  }
);

module.exports = router;
