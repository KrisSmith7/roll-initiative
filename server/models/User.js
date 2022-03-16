const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+@.+\..+/, 'Email must be a valid email address.']
    },
    password: {
        type: String, 
        required: true, 
        minlength: 8, 
    },
    dmstatus: {
        type: Boolean, 
        default: false, 
    },
    // prelim nested arrays, needs update when other models are added
    thoughts: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Thought'
        }
    ], 
    // characters: [
    //     {
    //         type: Schema.Types.ObjectId, 
    //         ref: 'Character'
    //     }
    // ],
    // campaigns: [
    //     {
    //         type: Schema.Types.ObjectId, 
    //         ref: 'Campaign'
    //     }
    // ],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// pre-save middleware for password 
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10; 
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

// fn for comparing inc password with hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password); 
};

// virtuals if we need in the future 
// userSchema.virtual('characterCount').get(function() {
//     return this.characters.length; 
// })

// userSchema.virtual('campaignCount').get(function() {
//     return this.campaigns.length; 
// })

// userSchema.virtual('thoughtCount').get(function() {
//     return this.thoughts.length; 
// })

const User = mongoose.model('User', userSchema);

module.exports = User; 