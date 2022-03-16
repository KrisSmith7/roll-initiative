import React from 'react';
//import { Link } from 'react-router-dom';

const ThoughtList = ({ thoughts, title }) => {
  if (!thought.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map(thought => {
          <div key={thought._id}>
            <p>
              {thought.username}
              {' '}thought on { thought.createdAt}
            </p>
          <div>
            <p>{thought.thoughtText}</p>
          </div>
          </div>
        })}
    </div>
  );
};

export default ThoughtList;