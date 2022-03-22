const { Schema, model } = require('mongoose');
//const userSchema = require('./User');

const campaignSchema = new Schema({
    username: {
        type: String, 
        required: true, 
    },
    campaignName: {
        type: String, 
        required: true,  
        trim: true
    },
    description: {
        type: String, 
        required: true
    },
    setting: {
        type: String, 
        required: true, 
    },
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        }
    }
);

campaignSchema.virtual('playerCount').get(function() {
    return this.players.length;
})

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;