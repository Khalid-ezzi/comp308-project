const Patient = require('../models/Patient');
const User = require('../models/User'); // Import the User model
const { createUser } = require('./userController');

exports.getPatientsByNurseId = async (nurseId) => {
  try {
    return await Patient.find({ nurseId });
  } catch (err) {
    throw new Error('Failed to fetch patients');
  }
};

exports.getPatientById = async (id) => {
  try {
    return await Patient.findById(id);
  } catch (err) {
    throw new Error('Failed to fetch patient');
  }
};

exports.createPatient = async ({ firstName, lastName, email, nurseId }) => {
  try {
    let user = await User.findOne({ email });

    // If the user doesn't exist, create a new one
    if (!user) {
      user = await createUser({
        username: email,
        email,
        password: '12345',
        role: 'patient',
        firstName,
        lastName,
      });
    }

    // Create the patient record with the existing or new userId
    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      nurseId,
      userId: user._id,
    });

    return await newPatient.save();
  } catch (err) {
    throw new Error('Failed to create patient');
  }
};

exports.updatePatient = async ({ id, firstName, lastName, email }) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true }
    );
    return updatedPatient;
  } catch (err) {
    throw new Error('Failed to update patient');
  }
};
