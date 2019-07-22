import React from 'react';
import PropTypes from 'prop-types';
import './NavToggleIcon.css';

function NavToggleButton({ open }) {
  return (
    <svg className="toggle" xmlns='http://www.w3.org/2000/svg' version="1.1" width='20px' height='20px' >{ open ? <>
        <line x1="3" y1="17" x2="17" y2="3" />
        <line x1="3" y1="3" x2="17" y2="17" />
        </> : <>
        <line x1="2" y1="2" x2="18" y2="2" />
        <line x1="2" y1="10" x2="18" y2="10" />
        <line x1="2" y1="18" x2="18" y2="18" />
        </> }</svg>
  );
}

NavToggleButton.defaultProps = {};

NavToggleButton.propTypes = {
  open: PropTypes.bool.isRequired
};

export default NavToggleButton;
