// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LeftMenu from './LeftMenu';
// import ThemeEditor from './ThemeEditor';
// import './App.css';
// import CanvasEditor from "./CanvasEditor"
// function App() {
//   const [selectedTheme, setSelectedTheme] = useState(null);
//   const [textAreas, setTextAreas] = useState([]);

//   const addTextArea = () => {
//     console.log("Adding text area");  // Debugging log
//     setTextAreas([...textAreas, { x: 0, y: 0, text: '', isEditing: false, fontFamily: 'Arial', fontSize: '14px', fontColor: '#000000' }]);
//   };

//   return (
//     <Router>
//       <div id="root">
//         <LeftMenu setSelectedTheme={setSelectedTheme} addTextArea={addTextArea} textAreas={textAreas} setTextAreas={setTextAreas} />
//         <Routes>
//           <Route path="/editor" element={<ThemeEditor selectedTheme={selectedTheme} textAreas={textAreas} setTextAreas={setTextAreas} />} />
//           <Route path="/" element={<div className="editor">Select a theme to edit</div>} />

//           <Route path='/hello' element={<CanvasEditor/>}/>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import ThemeEditor from './ThemeEditor';

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [textAreas, setTextAreas] = useState([]);
  const [images, setImages] = useState([]);

  const addTextArea = () => {
    setTextAreas([
      ...textAreas,
      { text: 'New Text', x: 0, y: 0, width: 200, height: 100, fontFamily: 'Arial', fontSize: '16px', fontColor: '#000000', backgroundColor: 'transparent' }
    ]);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <LeftMenu setSelectedTheme={setSelectedTheme} addTextArea={addTextArea} />
        <Routes>
          <Route path="/editor" element={<ThemeEditor selectedTheme={selectedTheme} textAreas={textAreas} setTextAreas={setTextAreas} images={images} setImages={setImages} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

