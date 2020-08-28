const express = require('express');

let { verifyToken, verifyAdmin_Role } = require('../middlewares/autentication');

let app = express();

let Product = require('../models/product');

// ============================
// Mostrar todas los productos
// ============================
app.get('/product', (req, res) => {

  Product.find({})
    .sort('name')
    .exec((err, products) => {

      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        products
      });
    })
});

// ============================
// Mostrar un producto por ID
// ============================
app.get('/product/:id', (req, res) => {
  let id = req.params.id;

  Product.findById(id, (err, productDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productDB) {
      return res.status(500).json({
        ok: false,
        err: {
          message: 'El ID no es correcto'
        }
      });
    }

    res.json({
      ok: true,
      product: productDB
    });
  });
});

// ============================
// Crear nuevo producto
// ============================
app.post('/product', [verifyToken, verifyAdmin_Role], (req, res) => {
  // regresa el nuevo producto
  // req.usuario._id
  let body = req.body;

  let product = new Product({
    name: body.name,
    description: body.description,
    basePrice: body.basePrice,
    taxRate: body.taxRate,
    inventoryQuantity: body.inventoryQuantity,
    status: body.status
  });


  product.save((err, productDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productDB) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      product: productDB
    });
  });
});

// ============================
// Actualizar producto por ID
// ============================
app.put('/product/:id', [verifyToken, verifyAdmin_Role], (req, res) => {

  let id = req.params.id;
  let body = req.body;

  let descProduct = {
    name: body.name,
    description: body.description,
    basePrice: body.basePrice,
    taxRate: body.taxRate,
    inventoryQuantity: body.inventoryQuantity,
    status: body.status
  };

  Product.findByIdAndUpdate(id, descProduct, { new: true, runValidators: true }, (err, productDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productDB) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      product: productDB
    });
  });
});

// ============================
// Eliminar un producto
// ============================
app.delete('/product/:id', [verifyToken, verifyAdmin_Role], (req, res) => {
  // solo un administrador puede borrar categorias
  // Product.findByIdAndRemove
  let id = req.params.id;

  Product.findByIdAndRemove(id, (err, productDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!productDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El id no existe'
        }
      });
    }

    res.json({
      ok: true,
      message: 'Producto Borrado'
    });
  });
});

module.exports = app;