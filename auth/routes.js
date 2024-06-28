const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const authenticateUser = require("../auth/auth");
// Function to create a new user

const { User } = require("../db/appModel.js");

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const createUser = async (name, email, password, role, year) => {
  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword, role, year });
  await user.save();
  return user;
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
  );
  return user;
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
