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
    <div>
      <p>
        Character Count: {characterCount}/280
        {error && <span>Something went wrong...</span>}
      </p>
      <form onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Add a comment to this post"
          value={commentText}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Submit
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
      
    </div>
  );
};

export default CommentForm;