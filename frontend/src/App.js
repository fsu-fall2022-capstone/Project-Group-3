import React, { useContext } from 'react'
import {Route, Routes, useFormAction} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import PrivateRoute from './Utilities/PrivateRoute';
import { UserContext } from '.';

function App() {
  const {user} = useContext(UserContext)

  return (
    <div className='app'>
      {
        user.isLoggedIn &&
        <Navbar />
      }
        
        <Routes>
        <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
          <Route path = '/about' element = {<About />} />
          <Route path = '/profile' element = {<Profile />} />
        </Routes>
      </div>
  );
}

export default App;
