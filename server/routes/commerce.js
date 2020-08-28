const express = require('express');

let app = express();
let Commerce = require('../models/commerce');
let { verifyToken, verifyAdmin_Role } = require('../middlewares/autentication');


// ===========================
//  Obtener listado de comercio
// ===========================
app.get('/commerce', (req, res) => {
  // trae todos los comercios
  // populate: user category
  // paginate

  let since = req.query.since || 0;
  let limit = req.query.limit || 5;

  Commerce.find({ status: true })
    .skip(Number(since))
    .limit(Number(limit))
    .populate('user', 'name document')
    .populate('category', 'name')
    .exec((err, commerces) => {

      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        commerces
      });
    })
});

// ===========================
//  Obtener un comercio por ID categoria
// ===========================
app.get('/commerce/category/:id', (req, res) => {
  // populate: user category
  // paginate
 // let id = req.params.id;
 // let id_category = category._id;
    let id = req.params.id;
  Commerce.find({category: id}) 
    .populate('user', 'name email')
    .populate('category', 'name')
    .exec((err, commerceDB) => {

      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!commerceDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'ID no existe'
          }
        });
      }

      res.json({
        ok: true,
        commerce: commerceDB
      });
    });
});

// ===========================
//  Buscar comercios
// ===========================
app.get('/commerce/search/:search', (req, res) => {

  let search = req.params.search;
  let regex = new RegExp(search, 'i');

  Commerce.find({ name: regex })
    .populate('category', 'search')
    .exec((err, commerces) => {

      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        commerces
      })
    })
});



// ===========================
//  Crear un nuevo comercio
// ===========================
app.post('/commerce', [verifyToken, verifyAdmin_Role], (req, res) => {
  // grabar el usuario
  // grabar una categoria del listado 

  let body = req.body;

  let commerce = new Commerce({
    user: req.user._id,
    category: body.category,
    name: body.name,
    identification: body.identification,
    description: body.description,
    address: body.address,
    telephone: body.telephone,
    cellphone: body.cellphone,
    email: body.email
  });
  commerce.save((err, commerceDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.status(201).json({
      ok: true,
      commerce: commerceDB
    });
  });
});

// ===========================
//  Actualizar un comercio
// ===========================
app.put('/commerce/:id', [verifyToken, verifyAdmin_Role], (req, res) => {
  // grabar el usuario
  // grabar una categoria del listado 

  let id = req.params.id;
  let body = req.body;

  Commerce.findById(id, (err, commerceDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!commerceDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El ID no existe'
        }
      });
    }

    commerceDB.category = body.category;
    commerceDB.name = body.name;
    commerceDB.identification = body.identification;
    commerceDB.description = body.description;
    commerceDB.address = body.address;
    commerceDB.telephone = body.telephone;
    commerceDB.cellphone = body.cellphone;
    commerceDB.email = body.email;
    commerceDB.save((err, commerceSave) => {

      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        commerce: commerceSave
      });
    });
  });
});

// ===========================
//  Borrar un commerce
// ===========================
app.delete('/commerces/:id', [verifyToken, verifyAdmin_Role], (req, res) => {

  let id = req.params.id;
  Commerce.findById(id, (err, commerceDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!commerceDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'ID no existe'
        }
      });
    }

    commerceDB.status = false;

    commerceDB.save((err, commerceDelete) => {

      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        commerce: commerceDelete,
        mensaje: 'Comercio borrado'
      });
    })
  })
});

module.exports = app;