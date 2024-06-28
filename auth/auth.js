const bcrypt = require('bcrypt')
const User = require('../db/appModel')
// Function to verify a password
const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

  const generateToken = async (user) => {
    const token = jwt.sign({ _id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
    return token;
  };

   const authenticateUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }
    return generateToken(user);
  };
  module.exports = authenticateUser

  