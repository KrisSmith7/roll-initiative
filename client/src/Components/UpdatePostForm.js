import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../utils/mutations';


const UpdatePostForm = (props) => {
  //console.log("updating post:", props.postId);
  const {handleClose, postId, postText}  = props;
  //console.log(`postId: ${postId}, postText: ${postText}`);
  const [updatedPostText, setUpdatedText] = useState(postText);
  const [characterCount, setCharacterCount] = useState(postText.length);
  const [updatePost, { error }] = useMutation(UPDATE_POST);

  const handleChange = event => {
    console.log(event.target.value);
    if (event.target.value.length <= 480) {
      setUpdatedText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    //console.log(`postId: ${postId}, postText: ${updatedPostText}`);
    try {
      const updatedPost = await updatePost({
        variables: { postId: postId, postText: updatedPostText }
      });
      console.log(updatedPost);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <p
        className={`mt-5 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        <span className='m-5 text-charcoal font-bold'>Character Count: {characterCount}/280</span>
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form onSubmit={handleFormSubmit} className="object-center flex flex-col items-center text-slate-50  from-charcoal to-slate rounded-md p-4 w-full">
        <textarea
          className='form-input m-2 text-lg font-cormorant font-bold rounded-md'
          placeholder="Type your post here"
          value={updatedPostText}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className='form-btn d-block w-50 m-5 text-lg text-slate font-macondo bg-turq/75' onClick={handleClose}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdatePostForm;