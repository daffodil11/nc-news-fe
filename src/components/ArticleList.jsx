import React, { Component } from 'react';
import './ArticleList.css';
import { navigate } from '@reach/router';
import * as api from '../utils/api.js';
import ArticleCard from './ArticleCard';
import SortControls from './SortControls';

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
        <SortControls handleSelectChange={this.handleSelectChange} sort_by={sort_by} order={order} />
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

export default ArticleList;
