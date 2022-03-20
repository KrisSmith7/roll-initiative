import React, { useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import CommentList from '..//CommentList';
import CommentForm from '../CommentForm';
import UpdatePostForm from '../UpdatePostForm';

import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST, QUERY_POSTS } from '../../utils/queries';
import { DELETE_POST } from '../../utils/mutations';

const SinglePost = () => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId }
  });

  const post = data?.post || {};
  const [deletePost, { error }] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });
        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [...posts].filter((post) => post._id !== deletePost._id) }
        });
      } catch (err) {
        console.error(err);
      }
      

    }
  });

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [isRedirect, setRedirect] = useState(false);

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
      setRedirect(true);

    } catch (err) {
      console.error(err);
    }
  }

  // const handleUpdatePost = async (postId, postText) {

  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='modal-content'>
      <div className='flex justify-center'>
        <Link to="/dashboard" className='text-slate font-bold mt-5'> ← Back to Dashboard </Link>
      </div>
      <div className='flex flex-col justify-center items-center mt-2'>
        <div className="bg-sienna/50 px-2 my-2 border-l-2 border-sienna rounded-bl-lg font-semibold w-75">
          <div className="whitespace-pre-wrap">
            <p className='text-white'>{post.postText}</p>
          </div>
          <div>
            <p className="py-4 font-light text-white">
            <span>
              {post.username}
            </span>{' '}
            posted on {post.createdAt}
          </p>
          </div>
          { isRedirect ? (<Redirect push to="/" />) : null }
          
          <div className='flex'>
            <button type='button'onClick={handleShow} className='m-2 form-btn d-block w-30 text-lg text-slate font-macondo bg-turq/75'>Edit Post</button>
            <Modal
              size="lg"
              centered
              show={showModal}
              onHide={handleClose}
              className="modal"
            >
              <UpdatePostForm handleClose={handleClose} postId={post._id} postText={post.postText} />
            </Modal>
            <button type='button' onClick={() => handleDeletePost(post._id)} className='m-2 form-btn d-block w-30 text-lg text-slate font-macondo bg-turq/75'>Delete Post</button>
          </div>
        </div>

        {post.commentCount > 0 && (
          <CommentList comments={post.comments} />
        )}

        {Auth.loggedIn() && <CommentForm postId={post._id} />}
      </div>
    </div>
  );
};

export default SinglePost;