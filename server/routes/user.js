const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
const { verifyToken, verifyAdmin_Role } = require('../middlewares/autentication');

const app = express();

// list everyone user paginate
app.get('/user', (req, res) => {
  let since = req.query.since || 0;
  let limit = req.query.limit || 5;

  User.find({}, 'name last_name document email role status')
    .skip(Number(since))
    .limit(Number(limit))
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      User.count({}, (err, count) => {
        res.json({
          ok: true,
          users,
          count
        });
      });
    });
});

// Save user
app.post('/user', [verifyToken, verifyAdmin_Role], function (req, res) {
  let body = req.body;
  let user = new User({
    name: body.name,
    last_name: body.last_name,
    document: body.document,
    type_document: body.type_document,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

// Update User
app.put('/user/:id', [verifyToken, verifyAdmin_Role], function (req, res) {

  let id = req.params.id;
  // TODO: se debe validar que el id no llegue vacio.
  let body = _.pick(req.body, ['name', 'last_name', 'document', 'type_document', 'email', 'password', 'role', 'status']);

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  })
});

//Delete User
app.delete('/user/:id', [verifyToken, verifyAdmin_Role], function (req, res) {
  let id = req.params.id;

  // TODO: borrado fisico: User.findByIdAndRemove(id, (err, userDelete) => {
  let updateStatus = {
    status: false
  };
  User.findByIdAndUpdate(id, updateStatus, { new: true }, (err, userDelete) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    };

    if (!userDelete) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }
      });
    }

    res.json({
      ok: true,
      user: userDelete
    });
  });
});

module.exports = app;