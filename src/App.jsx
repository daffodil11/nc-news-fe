import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import NavTopics from './components/NavTopics';
import ArticleList from './components/ArticleList';
import ArticlePage from './components/ArticlePage';
import Error from './components/Error';
import Footer from './components/Footer';
import * as api from './utils/api';

class App extends Component {

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      username: "guest",
      articleVotes: {},
      commentVotes: {},
      currentTopic: ""
    };
  }

  render() {
    const { username, articleVotes, commentVotes, currentTopic } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Northcoders News</h1>
          <NavTopics username={username} currentTopic={currentTopic} />
        </header>
        <div className="container" ref={this.containerRef}>
          <Router className="nc-news-body" role="main" >
            <ArticleList path="/" username={username} scrollToTop={this.scrollToTop} updateUserVotes={(id, change) => this.updateUserVotes("article", id, change)} userArticleVotes={articleVotes} updateNavBar={this.updateNavBar} />
            <Error path="/error" />
            <ArticleList path="/:topic" username={username} scrollToTop={this.scrollToTop} updateUserVotes={(id, change) => this.updateUserVotes("article", id, change)} userArticleVotes={articleVotes} updateNavBar={this.updateNavBar} />
            <ArticlePage path="/:topic/:article_id" username={username} updateUserVotes={(id, change) => this.updateUserVotes("comment", id, change)} userCommentVotes={commentVotes} />
            <Error default />
          </Router>
          <Footer />
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.storeUser);
    const userStr = sessionStorage.getItem('nc-news-user');
    if (!userStr || JSON.parse(userStr).username === 'guest') {
      api.getRandomUser().then(user => {
        const { username } = user;
        this.setState({ username, articleVotes: {}, commentVotes: {} });
      })
      .catch(err => this.setState({
        username: 'guest',
        articleVotes: {},
        commentVotes: {}
      }));
    } else {
      const { username, articleVotes, commentVotes } = JSON.parse(userStr);
      this.setState({ username, articleVotes, commentVotes });
    }
  }

  componentWillUnmount() {
    this.storeUser();
  }

  updateUserVotes = (type, id, change) => {
    if (type === "article") {
      this.setState(({ articleVotes }) => ({ articleVotes: { ...articleVotes, [id]: (articleVotes[id] || 0) + change } }));
    } else if (type === "comment") {
      this.setState(({ commentVotes }) => ({ commentVotes: { ...commentVotes, [id]: (commentVotes[id] || 0) + change } }));
    }
  }

  scrollToTop = () => {
    this.containerRef.current.scrollTo(0, 0);
  }

  storeUser = () => {
    sessionStorage.setItem('nc-news-user', JSON.stringify(this.state));
  }

  updateNavBar = currentTopic => {
    this.setState({ currentTopic });
  }
}

export default App;
