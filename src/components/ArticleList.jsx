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
    const { isLoaded, error, articles, sort_by, order } = this.state;
    if (error) return <div data-cy="error">Error: {error.msg || error.message}</div>;
    else if (isLoaded) return (
      <div>
        <div className="sort-controls">
          <label className="sort-control">Sort articles by: 
          <select className="sort-control" id="sort_by" onChange={this.handleSelectChange} value={sort_by || 'created_at'} data-cy="sort-by">
              <option value="created_at">New</option>
              <option value="comment_count">Comments</option>
              <option value="votes">Votes</option>
            </select>
          </label>
          <label className="sort-control">Order by: 
          <select className="sort-control" id="order" onChange={this.handleSelectChange} value={order || 'desc'} data-cy="order">
              <option value="desc">{sort_by === 'created_at' ? 'New to Old' : 'High to Low'}</option>
              <option value="asc">{sort_by === 'created_at' ? 'Old to New' : 'Low to High'}</option>
            </select>
          </label>
        </div>
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
    const hasTopicChanged = prevProps.topic !== this.props.topic;
    const hasSortByChanged = prevState.sort_by !== this.state.sort_by;
    const hasOrderChanged = prevState.order !== this.state.order;
    if (hasTopicChanged || hasSortByChanged || hasOrderChanged) {
      this.fetchArticles();
    }
  }

  fetchArticles() {
    const { sort_by, order } = this.state;
    api.getArticles(this.props.topic, sort_by, order).then(articles => {
      this.setState({ articles, isLoaded: true });
    })
    .catch(error => {
      this.setState({ error });
    });
  }
}

export default ArticleList;
