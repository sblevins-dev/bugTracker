import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Login } from './components/Login';
import { Home } from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      {/* <Login /> */}
      <Home />
    </Router>
  );
}

export default App;
