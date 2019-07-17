import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentList.css';
import * as api from '../utils/api';
import Comment from './Comment';

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
    if (error) {
      return <div data-cy="comments-error">Error displaying comments: {error.msg || error.message}</div>;
    } else if (isLoaded) {
      return (
        <div>
            {comments.map(comment => <Comment comment={comment}/>)}
        </div>
      );
    } else {
      return <div data-cy="loading-comments">Loading comments...</div>;
    }
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
