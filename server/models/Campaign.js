const mongoose = require('mongoose');

const { Schema } = mongoose;

const campaignSchema = new Schema({
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
    username: {
        type: String, 
        required: true, 
    },
},
    {
        toJSON: {
            virtuals: true
        }
    }
)

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;