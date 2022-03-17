const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema(
  {
    postText: {
      type: String,
      required: 'You need to write something!',
      minlength: 1,
      maxlength: 480
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
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

const Post = model('Post', postSchema);

module.exports = Post;