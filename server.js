
const express  = require('express')

const dotenv  =require('dotenv')

const app = express();

app.use(express.json());


dotenv.config()

const db  = require("./db/connection.js");

const router  = require('./routers/users.js')
const groupRouter  = require("./routers/groups.js");
const mRouter  =  require('./routers/membership.js')

app.use('/', mRouter)
app.use('/', groupRouter)
app.use('/', router)

const startServer = async () => {
    
  await db();
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log("app is running successfully", PORT);
  });
};

startServer();