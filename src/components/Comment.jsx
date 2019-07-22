import React from 'react';
import PropTypes from 'prop-types';
import './Comment.css';
import Vote from './Vote';

function Comment({ comment: { comment_id, author, votes, age, body }, votingDisabled }) {
  return (
    <div id={comment_id || "new-comment"} className="comment" data-cy="comment">
      <div>
        <div className="comment-info">
          <span className="author" data-cy="comment-author">{author}</span>
          <span className="timestamp" data-cy="comment-timestamp">{age} ago</span>
        </div>
        <p data-cy="comment-body">{body}</p>
      </div>
      <div className="vote-container">
          {votingDisabled ? (
            <button>Delete</button>
          ) : (
            <Vote section="comments" id={comment_id} votes={votes} votingDisabled={votingDisabled} />
          )}
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    comment_id: PropTypes.number,
    author: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    age: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }),
  votingDisabled: PropTypes.bool
};

export default Comment;
