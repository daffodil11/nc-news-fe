import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentForm.css';

class CommentForm extends Component {
  static propTypes = {
    submitForm: PropTypes.func.isRequired
  };

  state = {
    comment: ''
  }

  render() {
    const { comment } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea data-cy="comment-form-body" rows="5" cols="40" placeholder="Write a new comment..." value={comment} onChange={this.handleChange} />
        <button type="submit" data-cy="comment-form-submit">Post comment</button>
      </form>
    );
  }

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  handleSubmit = event => {
    const { comment } = this.state;
    event.preventDefault();
    this.props.submitForm(comment).catch(err => this.setState({ comment }));
    this.setState({ comment: '' });
  }
}

export default CommentForm;
