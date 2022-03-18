import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

const PostForm = () => {
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
      <form className="text-slate" onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Type your post here"
          value={postText}
          onChange={handleChange}
        ></textarea>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;