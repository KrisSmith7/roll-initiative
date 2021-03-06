import React, { useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import CommentList from '..//CommentList';
import CommentForm from '../CommentForm';
import UpdatePostForm from '../UpdatePostForm';

import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST, QUERY_POSTS, QUERY_ME } from '../../utils/queries';
import { DELETE_POST } from '../../utils/mutations';

const SinglePost = () => {
  const { id: postId } = useParams();
  //onst {errorMessage, setErrorMessage} = useState('');

  const singlePost = useQuery( QUERY_POST, {
    variables: { id: postId }
  });

  const me = useQuery(QUERY_ME);

  const loading = singlePost.loading || me.loading;
  
  const post = singlePost.data?.post || {};
  

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
    //console.log("delete button clicked");
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deletePost({
        variables: { postId: postId }
      });

      //console.log("deleted post: ", postId);
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

  console.log(post.username);
  console.log(me.data?.me.username);

  return (
    <div className='modal-content h-full overflow-auto'>
      <div className='flex items-center justify-center p-4 mt-10'>
        <Link to="/dashboard" className='text-slate font-bold text-3xl md:text-4xl'> ??? Back to Dashboard </Link>
      </div>
      <div className='flex flex-col justify-start items-center h-3/4 mt-2'>
        <div className="bg-sienna/[.80] px-2 my-2 border-l-2 border-sienna rounded-bl-lg font-semibold w-75">
          <div>
            <p className="font-light text-white">
            <Link to={`/profile/${post.username}`}>
              <span>
                {post.username}
              </span>
            </Link>{' '}
            posted on {post.createdAt}
          </p>
          </div>
          <div className="whitespace-pre-wrap py-4">
            <p className='text-white text-2xl'>{post.postText}</p>
          </div>
          
          { isRedirect ? (<Redirect push to="/" />) : null }
          { post.username === me.data?.me.username && (
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
          )}
        </div>
        
        <div className='w-full flex justify-center my-4 overflow-auto'>
        {post.commentCount > 0 && (
          <CommentList comments={post.comments} />
          )}
          </div>

        {Auth.loggedIn() && <CommentForm postId={post._id} />}
      </div>
      {error && <div className='error-message'> {error.message} </div>}
    </div>
  );

  
};

export default SinglePost;