const mongoose = require('mongoose');
const { INTEGER } = require('sequelize/dist');

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
        type: INTEGER, 
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
        type: INTEGER
    },
    dex: {
        type: INTEGER
    },
    con: {
        type: INTEGER
    },
    int: {
        type: INTEGER
    },
    wis: {
        type: INTEGER
    },
    cha: {
        type: INTEGER
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