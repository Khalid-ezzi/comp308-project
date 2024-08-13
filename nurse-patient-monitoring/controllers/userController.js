const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async ({ username, email, password, role, firstName, lastName }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
    });
    await user.save();
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
      token,
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      username: user.username,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};
