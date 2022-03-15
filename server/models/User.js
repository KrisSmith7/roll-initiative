const mongoose = require('mongoose');

const { Schema } = mongoose;
// const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        trim: true
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
})

const User = mongoose.model('User', userSchema);

module.exports = User; 