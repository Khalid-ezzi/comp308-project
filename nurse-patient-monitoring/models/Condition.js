// /models/Condition.js
const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Condition', ConditionSchema);