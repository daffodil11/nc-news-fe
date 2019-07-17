import React, { Component } from 'react';
import './ArticleList.css';
import * as api from '../utils/api.js';
import ArticleCard from './ArticleCard';

class ArticleList extends Component {

  state = {
    isLoaded: false,
    sort_by: null,
    order: null,
    error: null,
    articles: []
  }

  render() {
    const { isLoaded, error, articles, sort_by } = this.state;
    if (error) return <div data-cy="error">Error: {error.msg || error.message}</div>;
    else if (isLoaded) return (
      <div>
        <label>Sort articles by:
        <select id="sort_by" onChange={this.handleSelectChange} value={sort_by} data-cy="sort-by">
            <option value="created_at">New</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <div>
            {articles.map(article => <ArticleCard key={article.article_id} article={article} />)}
        </div>
      </div>
      );
    else return <div data-cy="loading" >Loading...</div>;
  }

  handleSelectChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
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
    const { sort_by } = this.state;
    api.getArticles(this.props.topic, sort_by).then(articles => {
      this.setState({ articles, isLoaded: true });
    })
    .catch(error => {
      this.setState({ error });
    });
  }
}

export default ArticleList;
