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
    const { URL } = document;
    return (
      <nav className={open ? "nav-open" : "nav-closed"}>
          {open ? <Link className="nav-button" to="/" onClick={this.toggleMenu} >all</Link> : <a className="nav-button" onClick={this.toggleMenu} >Topics</a>}
            {topics.map(({ slug, description }) => (
              <Link to={'/' + slug} title={description} className={`nav-button${URL.includes(slug) ? " current" : ""}`} data-cy="topic-button" key={slug} onClick={this.toggleMenu} >{slug}</Link>
                ))}
      </nav>
    );
  }

  componentDidMount() {
    api.getTopics().then(({ data: { topics } }) => {
      this.setState({ topics });
    });
    if (document.body.clientWidth >= 600) {
      this.setState({ open: true });
    }
  }

  toggleMenu = () => {
    if (document.body.clientWidth < 600) {
      this.setState(state => ({ open: !state.open }));
    }
  }
}

export default NavTopics;
