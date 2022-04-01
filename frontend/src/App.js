import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Edit } from './components/Edit';
import './App.css';

function App() {
  const [bugs, setBugs] = useState([]);

  const list = [
    {
      id: 1,
      name: "John Smith",
      status: "open",
      description: "Test bug 1",
      date: "03-30-2022",
    },
    {
      id: 2,
      name: "John Doe",
      status: "closed",
      description: "Test bug 2",
      date: "12-30-2021",
    },
  ];

  useEffect(() => {
    setBugs(list);
  }, []);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home bugs={bugs} />} />
        <Route path='/edit' element={<Edit bugs={bugs} />} />
      </Routes>
    </Router>
  );
}

export default App;
