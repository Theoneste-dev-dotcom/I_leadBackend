const bcrypt = require("bcrypt");
const { User } = require("../db/appModel");
require('dotenv').config
const jwt = require('jsonwebtoken')
// Function to verify a password
const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateToken = async (user) => {
  const token = await jwt.sign({ email:user.email }, process.env.key, {
    expiresIn: "1h",
  });
 
  return token;
};
const authenticateUser = async (email, password) => {
  try {
    console.log('Authenticating user:', email);
    const user = await User.findOne({ email: email });
    console.log('Found user:', user);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    return generateToken(user);
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication failed');
  }
};

module.exports = authenticateUser;
