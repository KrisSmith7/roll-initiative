import React from 'react';
import { useParams } from 'react-router-dom';

import commentList from '../components/CommentList';
import CommentForm from '../components.CommentForm';

import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';

const SInglePost = (props) => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <p>
          <span>
            {post.username}
          </span>{' '}
          posted on {post.createdAt}
        </p>
        <div>
          <p>{post.postText}</p>
        </div>
      </div>

      {post.commentCount > 0 && (
        <CommentList comments={post.comments} />
      )}

      {Auth.loggedIn() && <CommentForm postId={post._id} />}
    </div>
  );
};

export default SinglePost;