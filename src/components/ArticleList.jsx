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
    username: PropTypes.string,
    scrollToTop: PropTypes.func.isRequired
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
        <div className="article-list-footer">
          <button className="load-more" data-cy="load-more" onClick={this.loadNextPage} >Load more articles</button>
        </div>
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
    const hasPageChanged = prevState.p !== this.state.p;
    if (hasTopicChanged || hasSortByChanged || hasOrderChanged || hasPageChanged) {
      this.fetchArticles(hasPageChanged, hasSortByChanged || hasOrderChanged);
      if (hasTopicChanged) {
        this.setState({ p: 1})
        this.props.scrollToTop();
      }
    }
  }

  loadNextPage = event => {
    this.setState(state => ({ p: state.p + 1 }));
  }

  handleSelectChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  fetchArticles(append, preserveArticleCount) {
    const { sort_by, order, p } = this.state;
    const limit = (preserveArticleCount) ? p * 10 : undefined;
    api.getArticles(this.props.topic, sort_by, order, (p > 1) ? p : undefined, limit).then(articles => {
      if (append) {
        this.setState(state => ({ articles: [...state.articles, ...articles] }));
      } else {
        this.setState({ articles, isLoaded: true });
      }
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
