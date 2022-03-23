import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';

const CommentForm = ({ postId }) => {
  const [commentText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentText, postId }
      });

      setText('');
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=' comment-form md:w-6/12 w-9/12 text-slate bg-turq/75'>
      <p className='font-bold'>
        Character Count: {characterCount}/280
        {error && <span>Something went wrong...</span>}
      </p>
      <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
        <textarea
          placeholder="Add a comment to this post"
          value={commentText}
          onChange={handleChange}
          className="w-75 p-2 m-3"
        ></textarea>

        <button type="submit" className='text-white font-bold bg-sienna p-2 m-2 w-50 rounded-md'>
          Submit
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
      
    </div>
  );
};

export default CommentForm;