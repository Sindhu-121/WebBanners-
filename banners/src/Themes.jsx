import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';

const ThemedDiv = styled.div`
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize}px;
  background-color: ${(props) => props.backgroundColor};
`;

const Themes = () => {
  const { color } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultBackgroundColor = color || 'white'; // Default background color

  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [fontSize, setFontSize] = useState(24); // Default font size
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);

  const handleBackgroundColorChange = (newColor) => {
    setBackgroundColor(newColor);
  };

  const ThemeText = styled.span`
    color: ${(props) => props.fontColor};
    font-weight: ${(props) => props.fontWeight};
    font-size: ${(props) => props.fontSize}px;
  `;

  const SindhuText = styled.span`
    color: ${(props) => props.fontColor};
    font-weight: ${(props) => props.fontWeight};
    font-size: ${(props) => props.fontSize}px;
    text-decoration: underline;
  `;

  const handleFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
  };

  return (
    <div style={{ backgroundColor: backgroundColor, padding: '200px', textAlign: 'center' }}>
      <ThemedDiv fontFamily={fontFamily} fontSize={fontSize} backgroundColor={backgroundColor}>
        <ThemeText fontColor="white" fontWeight="bold" fontSize={fontSize}>Themes</ThemeText>
        <SindhuText fontColor="blue" fontWeight="normal" fontSize={fontSize}>sindhu</SindhuText>
      </ThemedDiv>
      <div>
        <button onClick={() => setFontFamily('Arial, sans-serif')} style={{ margin: '10px', padding: '10px 20px' }}>
          Arial
        </button>
        <button onClick={() => setFontFamily('Courier New, monospace')} style={{ margin: '10px', padding: '10px 20px' }}>
          Courier New
        </button>
        <button onClick={() => setFontFamily('Georgia, serif')} style={{ margin: '10px', padding: '10px 20px' }}>
          Georgia
        </button>
        <button onClick={() => setFontFamily('Times New Roman, serif')} style={{ margin: '10px', padding: '10px 20px' }}>
          Times New Roman
        </button>
      </div>
      <div>
        <label style={{ display: 'block', margin: '20px 0' }}>Font Size: {fontSize}px</label>
        <input
          type="range"
          min="10"
          max="1000"
          value={fontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', margin: '20px 0' }}>Background Color:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Themes;
