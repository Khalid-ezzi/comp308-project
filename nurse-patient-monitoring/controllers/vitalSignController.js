// /controllers/vitalSignController.js
const VitalSign = require('../models/VitalSign');

exports.addVitalSigns = async ({ userId, temperature, heartRate, bloodPressure, respiratoryRate }) => {
  try {
    const vitalSign = new VitalSign({ userId, temperature, heartRate, bloodPressure, respiratoryRate });
    await vitalSign.save();
    return vitalSign;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getVitalSigns = async (userId) => {
  try {
    return await VitalSign.find({ userId }).sort({ createdAt: -1 });
  } catch (err) {
    throw new Error('Failed to fetch vital signs');
  }
};