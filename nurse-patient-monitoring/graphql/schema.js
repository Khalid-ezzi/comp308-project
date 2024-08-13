// /graphql/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    userId: String!
    username: String!
    email: String!
    role: String!
    firstName: String!
    lastName: String!
  }

  type VitalSign {
    id: ID!
    temperature: Float
    heartRate: Int
    bloodPressure: String
    respiratoryRate: Int
    userId: String!
    createdAt: String!
  }

  type DailyLog {
    id: ID!
    pulseRate: Int
    bloodPressure: String
    weight: Float
    temperature: Float
    respiratoryRate: Int
    userId: String!
    createdAt: String

  }

  type Tip {
    id: ID!
    message: String!
    nurseId: String!
    patientId: String!
    createdAt: String!
  }

  type Alert {
    id: ID!
    userId: String!
    userName: String
    userEmail: String
    message: String!
    createdAt: String!
  }

  type Condition {
    name: String!
    matchCount: Int!
  }

  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    nurseId: String!
    userId: String!
  }

  type SymptomLog {
    id: ID!
    userId: String!
    symptoms: [String!]!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    userId: String!
    firstName: String!
    lastName: String!
    role: String!
    username: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsersByRole(role: String!): [User!]!
    getVitalSigns(userId: String!): [VitalSign]
    getDailyLog(userId: String!): [DailyLog]
    getTips(userId: String!): [Tip!]!
    getAlertsByUserId(userId: String!): [Alert!]!
    getAllAlerts: [Alert!]!
    getAlerts(userId: String!): [Alert!]!
    getConditions(userId: String!): [Condition]
    getPatients(nurseId: String!): [Patient!]!
    getPatient(id: ID!): Patient
    generateConditions(symptoms: [String!]!): [Condition!]!
    getPatientOperations(userId: String!): [VitalSign]
    getPatientTips(userId: String!): [Tip]
  }

type Mutation {
  createUser(username: String!, email: String!, password: String!, role: String!, firstName: String!, lastName: String!): User
  loginUser(email: String!, password: String!): AuthPayload
  addVitalSigns(temperature: Float, heartRate: Int, bloodPressure: String, respiratoryRate: Int, userId: String!): VitalSign
  addDailyLog(pulseRate: Int, bloodPressure: String, weight: Float, temperature: Float, respiratoryRate: Int, userId: String!): DailyLog
  sendTip(message: String!, nurseId: String!, patientId: String!): Tip
  createAlert(userId: String!, userName: String!, userEmail: String!, message: String!): Alert!
  generateConditions(symptoms: [String!]!): [Condition]
  createPatient(firstName: String!, lastName: String!, email: String!, nurseId: String!): Patient!
  updatePatient(id: ID!, firstName: String, lastName: String, email: String): Patient!
  submitSymptoms(userId: String!, symptoms: [String!]!): SymptomLog!
  addPatient(firstName: String!, lastName: String!, email: String!, nurseId: String!): Patient!
  assignPatientToNurse(patientId: String!, nurseId: String!): Patient!
}
`;

module.exports = typeDefs;
