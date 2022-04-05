import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Nav } from './components/Nav';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Edit } from './components/Edit';
import './App.css';

function App() {
  // define whether logged in
  const {auth} = useSelector(state => state);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={!auth.loggedIn ? <Login /> : <Home />} />
        <Route path='/edit' element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
