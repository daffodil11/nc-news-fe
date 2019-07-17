import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentList.css';
import * as api from '../utils/api';
import Comment from './Comment';
import CommentForm from './CommentForm';

class CommentList extends Component {

  static propTypes = {
    article_id: PropTypes.number.isRequired
  }

  state = {
    isLoaded: false,
    error: null,
    comments: []
  }

  render() {
    const { error, isLoaded, comments } = this.state;
    const { article_id } = this.props;
    if (error) {
      return <div data-cy="comments-error">Error displaying comments: {error.msg || error.message}</div>;
    } else if (isLoaded) {
      return (
        <div>
          <h3>Comments</h3>
          <CommentForm submitForm={this.submitForm} />
          <div className="comments-container">
            {comments.map(comment => <Comment key={comment.comment_id} comment={comment}/>)}
          </div>
        </div>
      );
    } else {
      return <div data-cy="loading-comments">Loading comments...</div>;
    }
  }

  submitForm = body => {
    const newComment = {
      author: 'weegembump',
      votes: 0,
      age: 'a few moments',
      body
    };
    this.setState(state => ({ comments: [newComment, ...state.comments] }));
    return api.postComment(this.props.article_id, 'weegembump', body);
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments () {
    api.getArticleComments(this.props.article_id)
      .then(comments => this.setState({ comments, isLoaded: true, error: null }))
      .catch(error => this.setState({ error }));
  }
}

export default CommentList;
