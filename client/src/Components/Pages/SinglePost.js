import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '..//CommentList';
import CommentForm from '../CommentForm';

import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';
import { DELETE_POST } from '../../utils/mutations';

const SinglePost = () => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });

  const post = data?.post || {};
  const [deletePost] = useMutation(DELETE_POST);

  const handleDeletePost = async (postId) => {
    console.log("delete button clicked");
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deletePost({
        variables: { postId: postId }
      });

      console.log("deleted post: ", postId);

    } catch (err) {
      console.error(err);
    }
  } 

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
        <div>
          <button type='button'>Edit Post</button>
          <button type='button' onClick={() => handleDeletePost(post._id)}>Delete Post</button>
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