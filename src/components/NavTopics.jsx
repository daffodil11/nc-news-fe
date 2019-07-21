import React, { Component } from 'react';
import './NavTopics.css';
import * as api from '../utils/api.js';
import { Link } from '@reach/router';

class NavTopics extends Component {
  state = {
    topics: [],
    open: false
  }

  render() {
    const { topics, open } = this.state;
    return (
      <nav className={open ? "nav-open" : "nav-closed"}>
          {open ? <Link className="nav-button" to="/">all</Link> : <a className="nav-button" onClick={this.toggleMenu} >Topics</a>}
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

  toggleMenu = () => {
    this.setState(state => ({ open: !state.open }));
  }
}

export default NavTopics;
