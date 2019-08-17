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
    this.state = { user: {} };
  }

  render() {
    const { user: { username } } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Northcoders News</h1>
          <NavTopics username={username} />
        </header>
        <div className="container" ref={this.containerRef}>
          <Router className="nc-news-body" role="main" >
            <ArticleList path="/" username={username} scrollToTop={this.scrollToTop} />
            <Error path="/error" />
            <ArticleList path="/:topic" username={username} scrollToTop={this.scrollToTop} />
            <ArticlePage path="/:topic/:article_id" username={username} />
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
        this.setState({ user: {...user, votes: {} } });
      })
      .catch(err => this.setState({
        user: {
          username: 'guest',
          name: 'guest',
          avatar_url: '',
          votes: {}
        }
      }));
    } else {
      const user = JSON.parse(userStr);
      this.setState({ user });
    }
  }

  componentWillUnmount() {
    this.storeUser();
  }

  scrollToTop = () => {
    this.containerRef.current.scrollTo(0, 0);
  }

  storeUser = () => {
    console.log("Storing user data!");
    sessionStorage.setItem('nc-news-user', JSON.stringify(this.state.user));
  }

}

export default App;
