const mongoose = require('mongoose');

const dbName = 'wildlife'  //TODO change dbName



const connectionString = `mongodb://localhost:27017/${dbName}`;  //connection to MongoDB

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Database connected");

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err)
        });
    } catch (err) {
        console.error('Error connection to database');
        process.exit(1);
    }
};