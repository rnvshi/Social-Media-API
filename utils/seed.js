const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const { users } = require('./data');

// Start the seeding timer
console.time('seeding');

// Create connection to MongoDB
connection.once('open', async () => {

    await User.deleteMany({});

    await User.collection.insertMany(users);

    console.table(users);
    console.timeEnd('seeding complete 🌱');
    process.exit(0);
});