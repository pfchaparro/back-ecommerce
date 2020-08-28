const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const copies = require('../utils/copies');

let Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
    type: String,
    required: [true, copies.name_required]
  },
  description: {
    type: String,
    unique: false,
    required: [true, copies.description]
  },
  basePrice: {
    type: Number,
    unique: false,
    required: [true, copies.price]
  },
  taxRate: {
    type: Number,
    required: [true, copies.taxRate]
  },
  inventoryQuantity: {
    type: Number,
    required: [true, copies.taxRate]
  },
  status: {
    type: String,
    required: [true, copies.status]
  }
});

productSchema.methods.toJSON = function () {
  let product = this;
  let productObject = product.toObject();

  return productObject;
}

productSchema.plugin(uniqueValidator, { message: copies.value_unique });

module.exports = mongoose.model('Product', productSchema);