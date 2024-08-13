// /models/SymptomLog.js
const mongoose = require('mongoose');

const SymptomLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  symptoms: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SymptomLog', SymptomLogSchema);