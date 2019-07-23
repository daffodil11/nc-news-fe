import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentForm.css';

class CommentForm extends Component {
  static propTypes = {
    submitForm: PropTypes.func.isRequired,
    swapInComment: PropTypes.func.isRequired,
    reverseOptimisticRender: PropTypes.func.isRequired
  };

  state = {
    comment: '',
    submitDisabled: false
  }

  render() {
    const { comment, submitDisabled } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="comment-form-body" className="offscreen" >Submit a comment</label>
        <textarea id="comment-form-body" data-cy="comment-form-body" rows="5" cols="40" placeholder="Write a new comment..." value={comment} onChange={this.handleChange} disabled={submitDisabled} />
        <button type="submit" disabled={submitDisabled || comment.length === 0} data-cy="comment-form-submit">Post comment</button>
      </form>
    );
  }

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  handleSubmit = event => {
    const { comment } = this.state;
    const { swapInComment, reverseOptimisticRender } = this.props;
    event.preventDefault();
    this.setState({ comment: '', submitDisabled: true });
    this.props.submitForm(comment)
      .then(({ comment }) => {
        this.setState({ submitDisabled: false });
        swapInComment(comment);
      })
      .catch(err => {
        this.setState({ comment, submitDisabled: false });
        reverseOptimisticRender();
      });
  }
}

export default CommentForm;
