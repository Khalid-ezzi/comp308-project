// /controllers/dailyLogController.js
const DailyLog = require('../models/DailyLog');

exports.addDailyLog = async ({ pulseRate, bloodPressure, weight, temperature, respiratoryRate, userId }) => {
  try {
    const dailyLog = new DailyLog({
      pulseRate,
      bloodPressure,
      weight,
      temperature,
      respiratoryRate,
      userId,
    });
    await dailyLog.save();
    return dailyLog;
  } catch (err) {
    throw new Error('Failed to add daily log');
  }
};

exports.getDailyLog = async (userId) => {
  try {
    return await DailyLog.find({ userId });
  } catch (err) {
    throw new Error(err);
  }
};