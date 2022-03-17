const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Character, Campaign } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('posts').populate('characters'); 
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('posts')
                    .populate('characters')
                    // .populate('campaigns')

                return userData; 
            }

            throw new AuthenticationError('Not logged in');
        },
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },
        post: async (parent, { _id }) => {
            return Post.findOne({ _id });
        }
    }, 
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args); 
            const token = signToken(user); 

            return { token, user }; 
        },
        login: async(parent, { username, password }) => {
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
        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );

                return post;
            }

            
            throw new AuthenticationError('You need to be logged in!');
        },
        addCharacter: async (parent, args, context) => {
            if (context.user) {
                const character = await Character.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { characters: character._id }},
                    { new: true }
                );

                return character; 
            }

            throw new AuthenticationError('Must log in or sign up to create a character!')
        },

// adding campaign code -- do we want to change user dmstatus to true here?
        addCampaign: async (parent, args, context) => {
            if (context.user) {
                const campaign = await Campaign.create({ ...args, username: context.user.username });
                await User.findByIdAndUpdate(
                    { _id: context.user_id },
                    { $push: { campaigns: campaign._id }},
                    { new: true }
                );
                return campaign; 
            }
            throw new AuthenticationError('Must log in or sign up to create a campaign!')
        }

    }
}

module.exports = resolvers; 