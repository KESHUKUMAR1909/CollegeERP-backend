// importing the required packages
const express = require('express');
const mongoose = require('mongoose');

// Importing internal files
const dbConnect = require('./utils/dbConnect');

require('dotenv').config();



// Setting up express app
const app = express();


// getting the Env variables
const PORT = process.env.PORT;

// Ping Request
app.get('/' , (req , res)=>{
    res.send("Hello this is the starting of express");
});


app.listen(PORT , async (res , req)=>{

    dbConnect();
    console.log(`Server Started on port ${PORT}`)
});