import React, { Component } from 'react';
import './ArticleList.css';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import * as api from '../utils/api.js';
import ArticleCard from './ArticleCard';
import SortControls from './SortControls';

class ArticleList extends Component {

  state = {
    isLoaded: false,
    sort_by: undefined,
    order: undefined,
    error: null,
    articles: [],
    p: 1
  }

  static propTypes = {
    username: PropTypes.string
  }

  render() {
    const { isLoaded, error, articles, sort_by, order } = this.state;
    const { username } = this.props;
    if (error) return <div data-cy="error">Error: {error.msg || error.message}</div>;
    else if (isLoaded) return (
      <div>
        <SortControls handleSelectChange={this.handleSelectChange} sort_by={sort_by} order={order} />
        <div>
            {articles.map(article => <ArticleCard key={article.article_id} article={article} votingDisabled={article.author === username} />)}
        </div>
        <button data-cy="load-more" onClick={this.loadNextPage} >Load more articles</button>
      </div>
      );
    else return <div data-cy="loading" >Loading...</div>;
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

  handleSelectChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
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
