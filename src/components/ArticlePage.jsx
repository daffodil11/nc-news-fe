import React, { Component } from 'react';
import './ArticlePage.css';
import * as api from '../utils/api';
import CommentList from './CommentList';

class ArticlePage extends Component {

  state = {
    isLoaded: false,
    error: null,
    article: {}
  }

  render() {
    const { error, isLoaded, article: { title, author, body, article_id } } = this.state;
    if (error) {
      return <div data-cy="error">Error: {error.msg || error.message}</div>;
    } else if (isLoaded) {
      return (
        <article>
          <h2 data-cy="title">{title}</h2>        
          <p data-cy="author">{author}</p>
          <p data-cy="body">{body}</p>
          <CommentList article_id={article_id} />
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
      .catch(error => this.setState({ error }));
  }
}

export default ArticlePage;
