import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Style.css';
import FrontPage from './pages/FrontPage';
import NewHome from './pages/NewHome';
import MyStory from './pages/MyStory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/newhome" element={<NewHome />} />
        <Route path="/mystory" element={<MyStory />} />
      </Routes>
    </Router>
  );
}

export default App;
