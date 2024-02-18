import { useState } from "react";
import { BrowserRouter, Link, Route, Routes, Outlet } from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import User from './components/User'
import Profile from './components/Profile'
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/user">User</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User/>}>
          <Route path="profile" element={<Profile/>}/>
          <Outlet />
        </Route>
        <Route path="/user/:id" element={<User/>}/>
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
