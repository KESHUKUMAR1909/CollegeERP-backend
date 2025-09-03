const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const MONGO_URL = process.env.MONGO_URL;
const dbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Successfully Connected to the db");
    } catch (error) {
        console.log("Error in connecting the DB", error);
    }
}

module.exports = dbConnect;