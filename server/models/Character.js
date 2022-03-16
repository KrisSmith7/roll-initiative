const mongoose = require('mongoose');

const { Schema } = mongoose;

const characterSchema = new Schema({
    username: {
        type: String, 
        required: true, 
    },
    name: {
        type: String, 
        required: true, 
        maxlength: 20, 
        trim: true, 
    },
    class: {
        type: String, 
        required: true, 
        trim: true,
    },
    level: {
        type: Number, 
        required: true,
    },
    background: {
        type: String, 
    },
    race: {
        type: String, 
    },
    alignment: {
        type: String, 
    },
    bio: {
        type: String,
    },
    str: {
        type: Number
    },
    dex: {
        type: Number
    },
    con: {
        type: Number
    },
    int: {
        type: Number
    },
    wis: {
        type: Number
    },
    cha: {
        type: Number
    }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);


const Character = mongoose.model('Character', characterSchema);

module.exports = Character; 