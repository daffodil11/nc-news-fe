import React, { Component } from 'react';
import './ArticleList.css';
import * as api from '../utils/api.js';
import ArticleCard from './ArticleCard';

class ArticleList extends Component {

  state = {
    isLoaded: false,
    error: null,
    articles: []
  }

  render() {
    const { isLoaded, error, articles } = this.state;
    if (error) return <div data-cy="error">Error: {error.msg || error.message}</div>;
    else if (isLoaded) return (
        <div>
            {articles.map(article => <ArticleCard key={article.article_id} article={article} />)}
        </div>
      );
    else return <div data-cy="loading" >Loading...</div>;
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles();
    }
  }

  fetchArticles() {
    api.getArticles(this.props.topic).then(articles => {
      this.setState({ articles, isLoaded: true });
    })
    .catch(error => {
      this.setState({ error });
    });
  }
}

export default ArticleList;
