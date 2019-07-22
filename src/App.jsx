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
    user: {}
  }

  render() {
    const { user: { username } } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Northcoders News</h1>
          <NavTopics username={username} />
        </header>
        <div className="container">
          <Router className="nc-news-body" role="main" >
            <ArticleList path="/" username={username} />
            <Error path="/error" />
            <ArticleList path="/:topic" username={username} />
            <ArticlePage path="/:topic/:article_id" username={username} />
            <Error default />
          </Router>
          <Footer />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const userStr = sessionStorage.getItem('nc-news-user');
    if (userStr || JSON.parse(userStr).username === 'guest') {
      const user = JSON.parse(userStr);
      this.setState({ user });
    } else {
      api.getRandomUser().then(user => {
        this.setState({ user });
        sessionStorage.setItem('nc-news-user', JSON.stringify(user));
      })
      .catch(err => this.setState({
        user: {
          username: 'guest',
          name: 'guest',
          avatar_url: ''
        }
      }));
    }
  }
}

export default App;
