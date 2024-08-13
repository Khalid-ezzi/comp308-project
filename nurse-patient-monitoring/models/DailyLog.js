// /models/DailyLog.js
const mongoose = require('mongoose');

const DailyLogSchema = new mongoose.Schema({
  pulseRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  weight: { type: Number, required: true },
  temperature: { type: Number, required: true },
  respiratoryRate: { type: Number, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DailyLog', DailyLogSchema);