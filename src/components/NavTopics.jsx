import React, { Component } from 'react';
import './NavTopics.css';
import * as api from '../utils/api.js';
import { Link } from '@reach/router';

class NavTopics extends Component {
  state = {
    topics: []
  }

  render() {
    const { topics } = this.state;
    return (
      <nav>
        <Link className="nav-button" to="/">all</Link>
            {topics.map(({ slug, description }) => (
              <Link to={'/' + slug} title={description} className="nav-button" data-cy="topic-button" key={slug}>{slug}</Link>
                ))}
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
