// Importing required packages
const express = require('express');
require('dotenv').config();

// Importing internal files
const dbConnect = require('./utils/dbConnect');
const collegeRouter = require('./routes/collegeRoute');

// Setting up express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registering routes
app.use('/college', collegeRouter);

// Ping Request
app.get('/', (req, res) => {
    res.send("Hello this is the starting of express");
});

// Getting the Env variables
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
    await dbConnect();
    console.log(`✅ Server started on port ${PORT}`);
});
