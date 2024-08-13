// /models/VitalSign.js
const mongoose = require('mongoose');

const VitalSignSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  respiratoryRate: { type: Number, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VitalSign', VitalSignSchema);