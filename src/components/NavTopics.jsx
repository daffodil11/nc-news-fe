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
          {(document.body.clientWidth < 600) && <a className="nav-button" onClick={this.toggleMenu} ><svg xmlns='http://www.w3.org/2000/svg' version="1.1" width='20px' height='20px' >{ open ? <><line x1="3" y1="17" x2="17" y2="3" /> <line x1="3" y1="3" x2="17" y2="17" /></> : <><line x1="2" y1="2" x2="18" y2="2" /> <line x1="2" y1="10" x2="18" y2="10" /> <line x1="2" y1="18" x2="18" y2="18" /></> }</svg></a>}
        <Link className="nav-button" to="/" onClick={this.toggleMenu} >all</Link>
        {topics.map(({ slug, description }) => (
          <Link to={'/' + slug} title={description} className={`nav-button${URL.includes(slug) ? " current" : ""}`} data-cy="topic-button" key={slug} onClick={this.toggleMenu} >{slug}</Link>))}
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
