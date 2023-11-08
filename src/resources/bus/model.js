const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  location: {
    type: String
  }
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;