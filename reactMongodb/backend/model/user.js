const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  email: String,
  pw: String
});
const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;