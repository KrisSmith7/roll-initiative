const mongoose = require('mongoose');

const { Schema } = mongoose;
// const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName: {
        type: String, 
        required: true, 
        trim: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User; 