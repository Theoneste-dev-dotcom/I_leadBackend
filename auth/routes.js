const mongoose = require('mongoose')
// Function to create a new user

const { User }  = require("../db/appModel.js");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const createUser = async (name, email, password, role, year) => {
  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword, role, year });
  await user.save();
  return generateToken(user);
};

const getAllUsers = async () => {
  return User.find();
};

const getUserById = async (id) => {
  return User.findById(id).exec();
};

const updateUser = async (id, name, email, role, year) => {
  const user = await User.findByIdAndUpdate(
    id,
    { name, email, role, year },
    { new: true }
  ).exec();
  return generateToken(user);
};

const deleteUser = async (id) => {
  await User.findByIdAndRemove(id).exec();
};

module.exports =  { createUser, getAllUsers, getUserById, updateUser, deleteUser };
