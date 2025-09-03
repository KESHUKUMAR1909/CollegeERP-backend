const bcrypt = require('bcryptjs');

// Hash function
const hashFunc = async (message) => {
    try {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(message, saltRounds);
        return hashed;
    } catch (error) {
        console.error("Error hashing message:", error);
        throw error;
    }
};

// Compare function
const compareFunc = async (plainText, hashedText) => {
    try {
        const match = await bcrypt.compare(plainText, hashedText);
        return match; // true if match, false otherwise
    } catch (error) {
        console.error("Error comparing hashes:", error);
        throw error;
    }
};

module.exports = {
    hashFunc,
    compareFunc
};
