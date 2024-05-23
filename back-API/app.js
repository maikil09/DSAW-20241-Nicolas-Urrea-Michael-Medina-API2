const express = require('express');
const cors = require('cors');
const app = express();
const mongoose=require('mongoose');
const authenticate = require("./auth/authenticate");

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  console.log("La base de datos MongoDB se encuentra Conectada");
}

main().catch(console.error);

app.use('/api/signup',require('./routes/signup'));
app.use('/api/signout',require('./routes/signout'));
app.use('/api/login',require('./routes/login'));
app.use('/api/refreshToken',require('./routes/refreshToken'));
app.use('/api/user' , authenticate,require('./routes/user'));

app.get('/',(req,res)=>{
  res.send("Hello world!");
});

app.listen(port,()=>{
  console.log(`server is running on port: ${port}`)
})