// /models/Tip.js
const mongoose = require('mongoose');

const TipSchema = new mongoose.Schema({
  message: { type: String, required: true },
  nurseId: { type: String, required: true },
  patientId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tip', TipSchema);
