import React, { useContext } from 'react'
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import LoginButton from './components/Login';
import LogoutButton from './components/Logout';
import Navbar from './components/Navbar';
import SearchBar from './components/Search';
import PrivateRoute from './Utilities/PrivateRoute';
import { UserContext } from '.';
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const {user} = useContext(UserContext)

  return (
    <>
    <Auth0Provider
      domain="dev-ws6kun7d.us.auth0.com"
      clientId="O8UPE16hieshlepkC9taYRYyjopYiAc6"
      redirectUri={window.location.origin}>
      {
        user.isLoggedIn &&
        <Navbar />
      }
      <div className='app'>
      <SearchBar/>
        <Routes>
        <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
          <Route path = '/about' element = {<About />} />
          <Route path = '/profile' element = {<Profile />} />
          <Route path = '/login' element = {<LoginButton />} />
          <Route path = '/logout' element = {<LogoutButton />} />
        </Routes>
      </div>
    </Auth0Provider>
    </>
  );
}

export default App;