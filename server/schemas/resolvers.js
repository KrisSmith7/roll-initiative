const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Character, Campaign } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('posts').populate('characters').populate('campaigns'); 
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('posts')
                .populate('characters')
                .populate('campaigns');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('posts')
                    .populate('characters')
                    .populate('campaigns')

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
        },
        character: async (parent, { _id }) => {
            return Character.findOne({ _id })
        }, 
        campaigns: async () => {
            const campaignData = await Campaign.find().sort({ createdAt: -1 })
            return campaignData;
    },
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
        updatePost: async (parent, { postId, postText }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { postText },
                    { new: true, runValidators: true}
                );

                return updatedPost;
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        deletePost: async (parent, { postId }, context) => {
            console.log(context.user);
            if (context.user) {
                console.log("Reached if statement");

                const foundPost = await Post.findById(
                    { _id: postId}
                );

                console.log(foundPost.username);
                if (context.user.username === foundPost.username) {
                    console.log(foundPost.username + ": Usernames match");

                    const postSansComments = Post.findOneAndUpdate(
                        { _id: postId },
                        { $set: { comments: [] }},
                        { new: true }
                    );

                    console.log(postSansComments);

                    // finds the post by postId and deletes the post
                    const deletedPost = await Post.deleteOne(
                        { _id: postId },
                        { new: true }
                    );

                    console.log(deletedPost);
                    
                    //finds the user and pulls the post from the user's posts
                    const updatedUser = await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $pull: { posts: postId } },
                        { new: true }
                    );

                    return updatedUser;
                } else {
                    throw new Error("You must be the user who made the post to delete it!");
                };


                
            }

            throw new AuthenticationError("You need to be logged in!");
        },
        addComment: async (parent, { postId, commentText }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { comments: { commentText, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedPost;
            }

            throw new AuthenticationError("You need to be logged in!");
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
        // updateCharacter: async (parent, args, context) => {
        //     if (context.user) {
        //         const character = await Character.findOneAndUpdate({ ...args, })
        //     }
        // },

    // adding campaign code -- do we want to change user dmstatus to true here?
        addCampaign: async (parent, args, context) => {
            if (context.user) {
                const campaign = await Campaign.create({ ...args, username: context.user.username });
                
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
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