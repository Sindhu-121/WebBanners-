import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Themes = () => {
  const { color } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fontColor = queryParams.get('fontColor');
  const fontStyle = queryParams.get('fontStyle');

  const themeStyle = {
    backgroundColor: color,
    padding: '200px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
    color: fontColor || 'white',
    fontWeight: fontStyle || 'normal'
  };

  return (
    <div style={themeStyle}>
      <div>Themes</div>
    </div>
  );
}

export default Themes;
