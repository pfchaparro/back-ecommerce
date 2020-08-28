const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const app = express();
const login_error = 'Documento ó contraseña incorrectos'

app.post('/login', (req, res) => {
  let body = req.body;
  User.findOne({ document: body.document }, (err, userDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: login_error
        }
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: login_error
        }
      });
    }

    let token = jwt.sign({
      user: userDB
    }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN });

    res.json({
      ok: true,
      user: userDB,
      token
    });
  });
});

app.post('/logout', (req, res) => {
  res.redirect('/');
});

module.exports = app;