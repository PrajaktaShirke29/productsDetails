const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});
const productModel = mongoose.model('productModel', productSchema);
module.exports = productModel;