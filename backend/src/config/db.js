const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Instead of exiting, we might want to just log in a real app, 
        // but for this simple app, exiting on DB failure is okay.
        process.exit(1);
    }
};

module.exports = connectDB;
