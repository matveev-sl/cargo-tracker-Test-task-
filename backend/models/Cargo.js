const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'Ожидает отправки' },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true }
});

module.exports = mongoose.model('Cargo', cargoSchema);
