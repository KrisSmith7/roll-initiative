const { AuthenticationError } = require('apollo-server-express');
const { User, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find(); 
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user_id })

                return userData; 
            }
        },
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        }
    }, 
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args); 
            const token = signToken(user); 

            return { token, user }; 
        },
        // login fn for testing JWT, needs updating as User model is updated
        login: async(parent, { username }) => {
            const user = await User.findOne({ username });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const correctPw = await user.isCorrectPassword(password); 

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials'); 
            }

            const token = signToken(user); 

            return { token, user }; 
        },
        addThought: async (parent, args, context) => {
            if (context.user) {
                const thought = await Thought.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );

                return thought;
            }

            
            throw new AuthenticationError('You need to be logged in!');
        },

    }
}

module.exports = resolvers; 