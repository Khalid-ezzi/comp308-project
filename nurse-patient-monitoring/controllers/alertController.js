// /controllers/alertController.js
const Alert = require('../models/Alert');

exports.createAlert = async ({ userId, userName, userEmail, message }) => {
  try {
    console.log("Creating alert with:", { userId, userName, userEmail, message });
    
    const alert = new Alert({
      userId,
      userName,
      userEmail,
      message,
      createdAt: new Date().toISOString(),
    });
    
    await alert.save();
    return alert;
  } catch (err) {
    console.error("Error creating alert:", err.message);
    throw new Error('Failed to create alert');
  }
};


exports.getAlertsByUserId = async (userId) => {
  try {
    return await Alert.find({ userId }).sort({ createdAt: -1 });
  } catch (err) {
    throw new Error('Failed to fetch alerts');
  }
};

exports.getAllAlerts = async () => {
  try {
    return await Alert.find().sort({ createdAt: -1 });
  } catch (err) {
    throw new Error('Failed to fetch all alerts');
  }
};
