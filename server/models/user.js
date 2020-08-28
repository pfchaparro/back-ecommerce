const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const copies = require('../utils/copies');

let roleValid = {
  values: ['ADMINISTRADOR', 'EMPLEADO', 'CLIENTE'],
  message: copies.rol_value
};

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, copies.role]
  },
  document: {
    type: String,
    unique: true,
    required: [true, copies.document]
  },
  email: {
    type: String,
    unique: true,
    required: [true, copies.email]
  },
  password: {
    type: String,
    required: [true, copies.password]
  },
  role: {
    type: String,
    enum: roleValid
  },
  status: {
    type: Boolean,
    default: true
  }
});

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

userSchema.plugin(uniqueValidator, { message: copies.value_unique });

module.exports = mongoose.model('User', userSchema);