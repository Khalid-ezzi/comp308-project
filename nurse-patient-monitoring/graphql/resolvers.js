// Import the necessary models
const VitalSign = require('../models/VitalSign');
const Tip = require('../models/Tip');
const userController = require('../controllers/userController');
const vitalSignController = require('../controllers/vitalSignController');
const dailyLogController = require('../controllers/dailyLogController');
const tipController = require('../controllers/tipController');
const alertController = require('../controllers/alertController');
const conditionController = require('../controllers/conditionController');
const patientController = require('../controllers/patientController'); 
const symptomLogController = require('../controllers/symptomLogController');
const mongoose = require('mongoose');
const User = require('../models/User');
const Patient = require('../models/Patient');

const resolvers = {
  Query: {
    getUser: (_, { userId }) => userController.getUser(userId),
    getDailyLog: (_, { userId }) => dailyLogController.getDailyLog(userId),
    getTips: async (_, { userId }) => {
      return await tipController.getTips(userId);
    },
    getVitalSigns: async (_, { userId }) => {
      return await vitalSignController.getVitalSigns(userId);
    },    
    getAlerts: (_, { userId }) => alertController.getAlerts(userId),
    getAllAlerts: () => alertController.getAllAlerts(),
    getAlertsByUserId: (_, { userId }) => alertController.getAlertsByUserId(userId),
    getConditions: (_, { userId }) => conditionController.getConditions(userId),
    getPatients: (_, { nurseId }) => patientController.getPatientsByNurseId(nurseId),
    getPatient: (_, { id }) => patientController.getPatientById(id),
    generateConditions: (_, { symptoms }) => conditionController.generateConditions({ symptoms }),
    getPatientOperations: async (_, { userId }) => {
      return await VitalSign.find({ userId }).exec();
    },
    getPatientTips: async (_, { userId }) => {
      return await Tip.find({ userId }).exec();
    },
    getUsersByRole: async (_, { role }) => {
      return await User.find({ role });
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password, role, firstName, lastName }) => {
      return await userController.createUser({ username, email, password, role, firstName, lastName });
    },
    loginUser: async (_, { email, password }) => {
      const user = await userController.loginUser({ email, password });
      return {
        token: user.token,
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      };
    },
    updateUserProfile: async (_, { userId, firstName, lastName, email, username }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { userId },
          { firstName, lastName, email, username },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error('User not found');
        }
        return updatedUser;
      } catch (err) {
        console.error('Error updating user profile:', err);
        throw new Error('Failed to update user profile');
      }
    },
    assignPatientToNurse: async (_, { patientId, nurseId }) => {
      try {
        // Find the patient by ID
        let patient = await Patient.findById(patientId);

        if (!patient) {
          const user = await User.findById(patientId);
          if (!user) {
            throw new Error('User not found');
          }

          patient = new Patient({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            nurseId,
            userId: user.userId,
          });

          await patient.save();
        } else {
          patient.nurseId = nurseId;
          await patient.save();
        }

        return patient;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addVitalSigns: async (_, { temperature, heartRate, bloodPressure, respiratoryRate, userId }) => {
      return await vitalSignController.addVitalSigns({ temperature, heartRate, bloodPressure, respiratoryRate, userId });
    },
    addDailyLog: async (_, { pulseRate, bloodPressure, weight, temperature, respiratoryRate, userId }) => {
      return await dailyLogController.addDailyLog({ pulseRate, bloodPressure, weight, temperature, respiratoryRate, userId });
    },
    sendTip: async (_, { message, nurseId, patientId }) => {
      return await tipController.sendTip({ message, nurseId, patientId });
    },
    createAlert: (_, { userId, userName, userEmail, message }) => {
      return alertController.createAlert({ userId, userName, userEmail, message });
    },
    generateConditions: async (_, { symptoms }) => conditionController.generateConditions({ symptoms }),
    submitSymptoms: async (_, { userId, symptoms }) => {
      return await symptomLogController.submitSymptoms({ userId, symptoms });
    },
    createPatient: async (_, { firstName, lastName, email, nurseId }) => {
      return await patientController.createPatient({ firstName, lastName, email, nurseId });
    },
    updatePatient: async (_, { id, firstName, lastName, email }) => {
      return await patientController.updatePatient({ id, firstName, lastName, email });
    },
  }
};

module.exports = resolvers;
