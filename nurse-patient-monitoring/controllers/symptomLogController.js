// /controllers/symptomLogController.js
const SymptomLog = require('../models/SymptomLog');

exports.submitSymptoms = async ({ userId, symptoms }) => {
  try {
    const symptomLog = new SymptomLog({
      userId,
      symptoms,
      createdAt: new Date().toISOString(),
    });
    await symptomLog.save();
    return symptomLog;
  } catch (err) {
    throw new Error('Failed to submit symptoms');
  }
};