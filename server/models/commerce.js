var mongoose = require('mongoose');
const copies = require('../utils/copies');
var Schema = mongoose.Schema;


var commerceSchema = new Schema({
    name: { type: String, required: [true, copies.name] },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    identification: { type: String, required: false },
    description: { type: String, required: false },
    address: { type: String, required: false },
    telephone: { type: String, required: false },
    cellphone: { type: String, unique: true, required: [true, copies.email] },
    email: { type: String, unique: true, required: [true, copies.email] },
    location: { type: Object, required: false },
    img: { type: String, required: false },
    status: { type: Boolean, default: true },
});


module.exports = mongoose.model('Commerce', commerceSchema);