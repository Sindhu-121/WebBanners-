import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banners from './Banners';
import Themes from './Themes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Banners />} />
        <Route path="/themes/:color" element={<Themes />} />
      </Routes>
    </Router>
  );
}

export default App;
