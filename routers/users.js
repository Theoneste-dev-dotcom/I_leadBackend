const express = require('express')
const router = express.Router()
const bcrypt  = require( 'bcrypt')
const _ = require('lodash')
const  authenticateUser  =  require('../auth/auth.js')



const {createUser, getAllUsers, getUserById, updateUser, deleteUser} = require('../auth/routes.js')
const { model } = require('mongoose')
// Create a new user

  // Get all users
router.get('/users', async (req, res) => {
    // try {
    //   const users = await getAllUsers();
    //   res.status(200).json(users);
    // } catch (error) {
    //   res.status(500).json({ message: 'Failed to get users', error });
    // }
  console.log("get your contents")
  });




// Create a new user
router.post('/user', async(req, res) => {
  // console.log('hellow rold')
  //   console.log(req.body)
  try {
    const { name, email, password, role, year } = req.body;
    const user = await createUser(name, email, password, role, year);
    if(user){
      console.log(user);
    
    res.status(201).json({ message: 'User created successfully', user });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
     const picked = _.pick(user, ['name', "email","role","year"]);
     res.status(200).json({message: "user found", user: picked});
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user', error });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, role, year } = req.body;
      const user = await updateUser(id, name, email, role, year);
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error });
    }
  });

  // Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await deleteUser(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error });
    }
  });
  

  // Authenticate a user
router.post('/user/login', async (req, res) => {
  //console.log("hello logged in user")
    try {
      const { email, password } = req.body;
       
      const token = await authenticateUser(email, password);
      console.log(token)
      res.status(200).json({ message: 'Logged in successfully', token });
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to log in' });
    }
  });
  module.exports = router