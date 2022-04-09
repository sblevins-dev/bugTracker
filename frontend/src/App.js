import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Nav } from './components/Nav';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { BugView } from './components/BugView';
import { CreateBug } from './components/CreateBug';
import { Edit } from './components/Edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  // define whether logged in
  const {auth} = useSelector(state => state);

  const [navShown, setNavShown] = useState(false);

  const handleClick = () => {
    setNavShown(!navShown)
  }

  return (
    <div className='app'>
      <Router>
      {auth.loggedIn && <Nav navShown={navShown} />}
      {auth.loggedIn && <div className='hamburger' onClick={handleClick}><FontAwesomeIcon icon={faBars} size='2x' /></div>}
      <Routes>
        <Route path='/' element={!auth.loggedIn ? <Login /> : <Home />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/createBug' element={<CreateBug />} />
        <Route path='/bugView' element={<BugView />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
