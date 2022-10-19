import React from 'react'
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = '/about' element = {<About />} />
          <Route path = '/profile' element = {<Profile />} />
        </Routes>
      
    </div>
  );
}

export default App;
