import React, { Component } from 'react';
import './ArticlePage.css';
import PropTypes from 'prop-types';
import * as api from '../utils/api';
import CommentList from './CommentList';
import { navigate } from '@reach/router';

class ArticlePage extends Component {

  state = {
    isLoaded: false,
    error: null,
    article: {}
  }

  static propTypes = {
    username: PropTypes.string,
    updateUserVotes: PropTypes.func.isRequired
  }

  render() {
    const { username, updateUserVotes } = this.props;
    const { error, isLoaded, article: { title, author, body, article_id } } = this.state;
    if (error) {
      return <div data-cy="error">Error: {error.msg || error.message}</div>;
    } else if (isLoaded) {
      return (
        <article>
          <h2 data-cy="title">{title}</h2>        
          <p data-cy="author">{author}</p>
          <p data-cy="body">{body}</p>
          <CommentList article_id={article_id} username={username} updateUserVotes={updateUserVotes} />
        </article>
      );
    } else {
      return <div data-cy="loading">Loading...</div>;
    }
  }

  componentDidMount() {
    api.getArticle(this.props.article_id)
      .then(article => this.setState({
        isLoaded: true,
        article
      }))
      .catch(err => {
        navigate('/error', {
          replace: true,
          state: {
            msg: err.msg || err.message
          }
        });
      });
  }
}

export default ArticlePage;
