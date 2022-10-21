import React from 'react';
import {Link} from 'react-router-dom'
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-name">
        Data Tweet
      </Link>
      <ul className="pages">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
