import React from 'react';
//import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }
  console.log("postList posts", posts)

  return (
    <div>
      {posts &&
        posts.map(post => (
          <article className="bg-gradient-to-r from-charcoal to-slate p-4 rounded-b-md ">
          <div key={post._id}>
          <div className="whitespace-pre-wrap">
            <p>{post.postText}</p>
          </div>
          <div className="py-4 font-semibold">
            Posted by: {post.username} on {post.createdAt}   
          </div>
          </div>
          </article>
        ))}
    </div>
  );
};

export default PostList;