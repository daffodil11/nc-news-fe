import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NavTopics.css';
import * as api from '../utils/api.js';

class NavTopics extends Component {
  state = {
    topics: [
      {slug: 'topic1'},
      {slug: 'topic2'}
    ]
  }

  render() {
    const { topics } = this.state;
    return (
      <nav>
          {topics.map(topic => <button className="nav-button">{topic.slug}</button>)}
      </nav>
    );
  }

  componentDidMount() {
    api.getTopics().then(({ data: { topics } }) => {
      this.setState({ topics });
    });
  }
}

export default NavTopics;
