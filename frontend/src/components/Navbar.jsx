import React from 'react';
import {Link} from 'react-router-dom'
import "../styles/navbar.css";
import LoginButton from './Login';
import LogoutButton from './Logout';

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
          <LoginButton>Login</LoginButton>
        </li>
        <li>
          <LogoutButton>Logout</LogoutButton>
        </li>
      </ul>
    </nav>
  );
}
