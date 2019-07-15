import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import NavTopics from './components/NavTopics.jsx';
import ArticleList from './components/ArticleList.jsx';
import Footer from './components/Footer.jsx';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>NC News</h1>
        <NavTopics />
        <Router className="nc-news-body" >
          <ArticleList path="/" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
