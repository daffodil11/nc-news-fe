import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import NavTopics from './components/NavTopics';
import ArticleList from './components/ArticleList';
import ArticlePage from './components/ArticlePage';
import Error from './components/Error';
import Footer from './components/Footer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <h1>Northcoders News</h1>
          <NavTopics />
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
}

export default App;
