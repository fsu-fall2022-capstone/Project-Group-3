import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { UserContext } from ".";
import "./index.css";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginButton />} />
          <Route path="/logout" element={<LogoutButton />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
