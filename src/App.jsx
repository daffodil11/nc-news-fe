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

  state = {
    user: {
      username: "simon"
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Northcoders News</h1>
          <NavTopics username={user.username} />
        </header>
        <div className="container">
          <Router className="nc-news-body" role="main" >
            <ArticleList path="/" />
            <Error path="/error" />
            <ArticleList path="/:topic" />
            <ArticlePage path="/:topic/:article_id" />
            <Error default />
          </Router>
          <Footer />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const userStr = sessionStorage.getItem('nc-news-user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.setState({ user });
    } else {
      api.getRandomUser().then(user => {
        this.setState({ user });
        sessionStorage.setItem('nc-news-user', JSON.stringify(user))
      });
    }
  }
}

export default App;
