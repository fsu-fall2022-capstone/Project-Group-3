import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="nav">
      <Link to="/" className="site-name">
        Data Tweet
      </Link>
      <ul className="pages">
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li className="log in/out">
          {(() => {
            if (isAuthenticated) return <LogoutButton>Logout</LogoutButton>;
            else return <LoginButton>Login</LoginButton>;
          })()}
        </li>
      </ul>
    </nav>
  );
}
