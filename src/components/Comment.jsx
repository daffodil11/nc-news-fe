import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

function Comment({ comment: { comment_id, author, votes, age, body } }) {
  return (
    <div className="comment" data-cy="comment">
      <div>
        <div className="comment-info">
          <span className="author" data-cy="comment-author">{author}</span>
          <span className="timestamp" data-cy="comment-timestamp">{age} ago</span>
        </div>
        <p data-cy="comment-body">{body}</p>
      </div>
      <div>
        <div className="vote">{votes}</div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    comment_id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    age: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })
};

export default Comment;
