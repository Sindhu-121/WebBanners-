import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgTemplate } from "react-icons/cg";
import { BsFileEarmarkRichtext } from "react-icons/bs";
const themes = ['theme-1.png', 'theme-2.png', 'theme-4.png', 'theme-5.png'];

const LeftMenu = ({ setSelectedTheme, addTextArea }) => {
  const [showThemes, setShowThemes] = useState(false);
  const navigate = useNavigate();

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme);
    navigate('/editor');
  };

  return (
    <div style={{ width: '20%', float: 'left', padding: '10px' }}>
      <button onClick={() => setShowThemes(!showThemes)}><CgTemplate />Themes</button>
      {showThemes && (
        <div>
          {themes.map((theme, index) => (
            <div key={index} onClick={() => handleThemeClick(theme)}>
              <img src={`/themes/${theme}`} alt={`Theme ${index + 1}`} style={{ width: '100px', height: '100px', cursor: 'pointer' }} />
            </div>
          ))}
        </div>
      )}
      {/* <button onClick={addTextArea}><BsFileEarmarkRichtext />Text Area</button> */}
    </div>
  );
};

export default LeftMenu;
