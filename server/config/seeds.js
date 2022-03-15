const db = require('./connection');
const { User } = require('../models')

db.once('open', async () => {
    await User.deleteMany(); 

    await User.create({
        userName: 'testBoi'
    })

    console.log('user created');

    process.exit(); 
})