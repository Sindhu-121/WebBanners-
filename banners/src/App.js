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


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LeftMenu from './LeftMenu';
// import ThemeEditor from './ThemeEditor';
// import Prefilldata from './Prefilldata';

// const App = () => {
//   const [selectedTheme, setSelectedTheme] = useState(null);
//   const [textAreas, setTextAreas] = useState([]);
//   const [images, setImages] = useState([]);

//   const addTextArea = () => {
//     setTextAreas([
//       ...textAreas,
//       { text: 'New Text', x: 0, y: 0, width: 200, height: 100, fontFamily: 'Arial', fontSize: '16px', fontColor: '#000000', backgroundColor: 'transparent' }
//     ]);
//   };

//   return (
//     <Router>
//       <div style={{ display: 'flex' }}>
//         <LeftMenu setSelectedTheme={setSelectedTheme} addTextArea={addTextArea} />
//         <Routes>
//           <Route path="/editor" element={<ThemeEditor selectedTheme={selectedTheme} textAreas={textAreas} setTextAreas={setTextAreas} images={images} setImages={setImages} />} />
//           {/* <Route path="/editor1" element={<Prefilldata selectedTheme={selectedTheme} textAreas={textAreas} setTextAreas={setTextAreas} images={images} setImages={setImages} />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// src/App.js
// import React, { useState } from 'react';
// import './App.css';
// import './themes.css';
// import EditableComponent from './EditableComponent';

// const App = () => {
//   const [theme, setTheme] = useState('theme1');
//   const data = {
//     logo: "path/to/logo.png",
//     examName: "Exam Name",
//     keyPoints: [
//       "Key Point 1",
//       "Key Point 2",
//       "Key Point 3",
//       "Key Point 4",
//       "Key Point 5",
//       "Key Point 6",
//       "Key Point 7",
//       "Key Point 8",
//     ],
//     subject: [
//       "subject-1",
//       "subject-2",
//       "subject-3",
//     ],
//     startdate: "dd/mm/yyyy",
//     enddate: "dd/mm/yyyy",
//     cost: "00,00,000",
//     phone: "123-456-7890",
//     email: "example@example.com",
//     website: "www.example.com",
//     image: "",
//   };

//   return (
//     <div className={`App ${theme}`}>
//       <header>
//         <button onClick={() => setTheme('theme1')}>Theme 1</button>
//         <button onClick={() => setTheme('theme2')}>Theme 2</button>
//         <button onClick={() => setTheme('theme3')}>Theme 3</button>
//       </header>
//       <EditableComponent data={data} theme={theme} />
//     </div>
//   );
// };

// export default App;



// src/App.js

// src/App.js
//svg file code
// import React, { useState, useRef, useEffect } from 'react';
// import FileUpload from './FileUpload';
// import SvgEditor from './SvgEditor';
// import { saveAs } from 'file-saver';

// const App = () => {
//   const [svgContent, setSvgContent] = useState(null);
//   const [selectedTextElement, setSelectedTextElement] = useState(null);
//   const [newText, setNewText] = useState('');
//   const svgEditorRef = useRef(null);

//   const handleSelectText = (element) => {
//     setSelectedTextElement(element);
//     setNewText(element.textContent);
//   };

//   const handleTextChange = (e) => {
//     setNewText(e.target.value);
//   };

//   const applyTextChange = () => {
//     if (selectedTextElement) {
//       selectedTextElement.textContent = newText;

//       // Serialize the updated SVG content and update the state
//       const svgElement = svgEditorRef.current.querySelector('svg');
//       const updatedSvgContent = new XMLSerializer().serializeToString(svgElement);
//       setSvgContent(updatedSvgContent);

//       // Clear selection
//       setSelectedTextElement(null);
//       setNewText('');
//     }
//   };

//   const handleSave = () => {
//     if (svgEditorRef.current) {
//       const svgElement = svgEditorRef.current.querySelector('svg');
//       const svgBlob = new Blob([svgElement.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
//       saveAs(svgBlob, 'edited.svg');
//     }
//   };

//   useEffect(() => {
//     if (svgEditorRef.current && svgContent) {
//       svgEditorRef.current.innerHTML = svgContent;
//     }
//   }, [svgContent]);

//   return (
//     <div className="App">
//       <h1>SVG Editor</h1>
//       <FileUpload onFileSelect={setSvgContent} />
//       {svgContent && (
//         <div ref={svgEditorRef}>
//           <SvgEditor svgContent={svgContent} onSelectText={handleSelectText} />
//         </div>
//       )}
//       {selectedTextElement && (
//         <div style={{ marginTop: '20px' }}>
//           <input
//             type="text"
//             value={newText}
//             onChange={handleTextChange}
//           />
//           <button onClick={applyTextChange}>Apply</button>
//         </div>
//       )}
//       {svgContent && (
//         <button onClick={handleSave} style={{ marginTop: '20px' }}>Save SVG</button>
//       )}
//     </div>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BannerEditor from './BannerEditor';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
         <Route path="/"  element={<BannerEditor/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

