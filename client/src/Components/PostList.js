import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }
  //console.log("postList posts", posts)

  return (
    <div>
      {posts &&
        posts.map(post => (
          <article className="bg-sienna/[.80] px-2 my-2 border-l-2 border-sienna rounded-bl-lg font-semibold">
            <div key={post._id}>
              <div className="py-4 font-light">
                 Posted by: {' '}
                <Link
                  to={`/profile/${post.username}`}
                >
                {post.username}
                </Link>{' '}
                {' '}on {post.createdAt} 
              </div>
              <div className="whitespace-pre-wrap text-2xl ">
                <Link to={`/post/${post._id}`}>
                  <p className='whitespace-normal'>{post.postText}</p>
                </Link>
              </div>
              <div className="py-4 font-light">
               
                <p>
                  Comments: {post.commentCount}
                </p> 
              </div>
            </div>
          </article>
        ))}
    </div>
  );
};

export default PostList;