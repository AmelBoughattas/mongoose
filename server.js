const express =require ('express');

const app=express();

//create database with server
require('dotenv').config({ path: './config.env' });

//connect database
const mongoose = require('mongoose');
 mongoose
  .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
})
.then((res) => console.log('database connected'))
.catch((err) =>console.log(err));


//parse the data
app.use(express.json())
app.use('/person', require('./Routes/personRoute'))


//create server
const port = process.env.port || 5500;

app.listen(port, (err)=> {
    err ? console.log(err) : console.log('the server is running')
})