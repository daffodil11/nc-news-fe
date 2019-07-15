import React, { Component } from 'react';
import './ArticleList.css';
import * as api from '../utils/api.js';

class ArticleList extends Component {

  render() {
    return (
      <div>
          Articles go here.        
      </div>
    );
  }

  componentDidMount() {
    api.getArticles().then(console.log);
  }
}

export default ArticleList;
