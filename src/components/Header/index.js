import React from 'react';
import PropTypes from 'prop-types';

const Header = props =>
  (<div className="App-header">
    <img src={props.logo} className="App-logo" alt="logo" />
  </div>);

Header.propTypes = {
  logo: PropTypes.string.isRequired,
};
export default Header;
