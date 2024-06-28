const mongoose = require( "mongoose");
const dotenv = require('dotenv')
dotenv.config()
const db =  async() => {
    //mongodb://loacalhost:27017/i_leadManagement
  try {
     mongoose
      .connect("mongodb://localhost:27017/i_leadManagement")
      .then(() => {
        console.log("connected to the database mongodb");
      })
      .catch((error) => {
        console.log("error while connecting");
      });
  } catch (error) {}
};

module.exports = db
