import React, { useContext } from 'react'
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import LoginButton from './components/Login';
import LogoutButton from './components/Logout';
import Navbar from './components/Navbar';
import SearchBar from './components/Search';
import { UserContext } from '.';
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const {user} = useContext(UserContext)

  return (
    <>
      <Navbar />
      <div className='app'>
      <SearchBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path = '/about' element = {<About />} />
          <Route path = '/profile' element = {<Profile />} />
          <Route path = '/login' element = {<LoginButton />} />
          <Route path = '/logout' element = {<LogoutButton />} />
        </Routes>
      </div>
    
    </>
  );
}

export default App;