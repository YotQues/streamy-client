import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = (props) => {
  return (
    <header className="ui secondary pointing menu">
      <Link to="/" className="item">Streamy</Link>
      <nav className="right menu">
        <Link to="/" className="item">All Streams</Link>
        <GoogleAuth />
      </nav>
    </header>
  );
};

export default Header;