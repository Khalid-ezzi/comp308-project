// /models/Patient.js

const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nurseId: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Patient', PatientSchema);
