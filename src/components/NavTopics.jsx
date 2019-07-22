import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NavTopics.css';
import * as api from '../utils/api.js';
import NavToggleButton from './NavToggleIcon';
import { Link } from '@reach/router';

class NavTopics extends Component {
  state = {
    topics: [],
    open: false
  }

  static propTypes = {
    username: PropTypes.string
  }

  render() {
    const { topics, open } = this.state;
    const { URL } = document;
    const { username } = this.props;
    return (
      <div className="nav-container">
        <nav className={open ? "nav-open" : "nav-closed"}>
            {(document.body.clientWidth < 600) && <a id="nav-toggle" className="nav-button" onClick={this.toggleMenu} ><NavToggleButton open={open} /></a>}
          <Link className="nav-button" to="/" onClick={this.toggleMenu} >all</Link>
          {topics.map(({ slug, description }) => (
            <Link to={'/' + slug} title={description} className={`nav-button${URL.includes(slug) ? " current" : ""}`} data-cy="topic-button" key={slug} onClick={this.toggleMenu} >{slug}</Link>))}
        </nav>
        <div className="user-welcome" data-cy="user-welcome" >
          Welcome,&nbsp;<span className="username">{username || 'guest'}</span>!
        </div>
      </div>
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
