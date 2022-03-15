const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    userName: {
      type: String,
      required: true
    },
    // reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;