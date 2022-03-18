import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  return (
    <div>
      <div>
        <span>Comments</span>
      </div>
      <div>
        {comments &&
          comments.map(comment => (
            <p key={comment._id}>
              {comment.commentText} {'// '}
              <Link to={'/profile/${comment.username'}>
                {comment.username} on {comment.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommentList;