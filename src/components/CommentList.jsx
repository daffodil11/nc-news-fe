import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentList.css';
import * as api from '../utils/api';
import Comment from './Comment';
import CommentForm from './CommentForm';

class CommentList extends Component {

  static propTypes = {
    article_id: PropTypes.number.isRequired,
    username: PropTypes.string
  }

  state = {
    isLoaded: false,
    error: null,
    comments: []
  }

  render() {
    const { error, isLoaded, comments } = this.state;
    if (error) {
      return <div className="comments-list" data-cy="comments-error">Error displaying comments: {error.msg || error.message}</div>;
    } else if (isLoaded) {
      return (
        <div className="comments-list" >
          <h3>Comments</h3>
          <CommentForm submitForm={this.submitForm} swapInComment={this.swapInComment} reverseOptimisticRender={this.reverseOptimisticRender} />
          <div className="comments-container">
              {comments.map(comment => <Comment key={comment.comment_id || 'new-comment'} comment={comment} votingDisabled={comment.author === this.props.username} handleDelete={() => this.handleDelete(comment.comment_id)}/>)}
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

  swapInComment = comment => {
    this.setState(state => {
      const restOfComments = state.comments.filter(comment => comment.comment_id);
      const newComment = { ...comment, age: 'a few moments' };
      return { comments: [newComment, ...restOfComments] };
    });
  }

  reverseOptimisticRender = () => {
    this.setState(state => {
      const restOfComments = state.comments.filter(comment => comment.comment_id);
      return { comments: restOfComments };
    });
  }

  handleDelete = comment_id => {
    console.log(comment_id);
    const deletedComment = this.state.comments.find(comment => comment.comment_id === comment_id);
    const deletedCommentInd = this.state.comments.findIndex(comment => comment.comment_id === comment_id);
    this.setState(state => ({ comments: state.comments.filter(comment => comment.comment_id !== comment_id) }));
    api.deleteComment(comment_id)
    .catch(err => this.setState(state => ({
        comments: [
          ...state.comments.slice(0, deletedCommentInd),
          deletedComment,
          ...state.comments.slice(deletedCommentInd)
        ]
      })
    ));
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
