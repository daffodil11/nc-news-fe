import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentForm.css';

class CommentForm extends Component {
  static propTypes = {
    article_id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  };

  state = {
    comment: ''
  }

  render() {
    return (
      <form>
        <textarea data-cy="comment-form-body" rows="5" cols="40" placeholder="Write a new comment..." />
        <button type="submit" data-cy="comment-form-submit">Post comment</button>
      </form>
    );
  }
}

export default CommentForm;
