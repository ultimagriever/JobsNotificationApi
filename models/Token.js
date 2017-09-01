const mongoose = require('../database/connect');

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('token', TokenSchema);
