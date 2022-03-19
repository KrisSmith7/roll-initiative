import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

const PostForm = ({ handleClose }) => {
  const [postText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });
        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] }
        });
      } catch (err) {
        console.error(err);
      }

      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, posts: [...me.posts, addPost] } }
      // });
    }
  });

  const handleChange = event => {
    console.log(event.target.value);
    if (event.target.value.length <= 480) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      await addPost({
        variables: { postText }
      });

      setText('');
      setCharacterCount(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50  from-charcoal to-slate rounded-md p-4 w-full">
        <textarea
          className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
          placeholder="Type your post here"
          value={postText}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75' onClick={handleClose}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;