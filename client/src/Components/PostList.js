import React from 'react';
//import { Link } from 'react-router-dom';

const PostList = ({ posts, title }) => {
  if (!post.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map(post => {
          <div key={post._id}>
            <p>
              {post.username}
              {' '}post on { post.createdAt}
            </p>
          <div>
            <p>{post.postText}</p>
          </div>
          </div>
        })}
    </div>
  );
};

export default PostList;