import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  return (
    <div className='flex flex-col bg-charcoal md:w-6/12 w-9/12 overflow-auto overscroll-contain'>
      <div>
        <span className='text-white font-macondo p-2'>Comments</span>
      </div>
      <div>
        {comments &&
          comments.map(comment => (
            <p className='text-slate font-bold bg-white border-b-4 p-2 border-burnt-orange/50' key={comment._id}>
              {comment.commentText} {'// '}
              <Link to={`/profile/${comment.username}`}>
                {comment.username} on {comment.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommentList;