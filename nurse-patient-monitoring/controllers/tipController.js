// /controllers/tipController.js
const Tip = require('../models/Tip');

exports.sendTip = async ({ message, nurseId, patientId }) => {
  try {
    const tip = new Tip({
      message,
      nurseId,
      patientId,
    });
    await tip.save();
    return tip;
  } catch (err) {
    console.error("Error sending tip:", err.message);
    throw new Error('Failed to send tip');
  }
};


// /controllers/tipController.js
exports.getTips = async (userId) => {
  try {
    console.log('Fetching tips for user:', userId);
    const tips = await Tip.find({ patientId: userId }).sort({ createdAt: -1 });
    console.log('Fetched tips:', tips);
    return tips;
  } catch (err) {
    console.error('Failed to fetch tips:', err.message);
    throw new Error('Failed to fetch tips');
  }
};


