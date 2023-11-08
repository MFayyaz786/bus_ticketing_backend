const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  startingPoint: {
    type: String,
    required: true
  },
  endingPoint: {
    type: String,
    required: true
  },
  stops: [String]
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;