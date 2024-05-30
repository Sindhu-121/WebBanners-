import React from 'react';
import { useNavigate } from 'react-router-dom';

function Banners() {
  const navigate = useNavigate();

  const handleButtonClick = (color, fontColor, fontStyle) => {
    navigate(`/themes/${color}?fontColor=${fontColor}&fontStyle=${fontStyle}`);
  };

  return (
    <div>
      <button
        onClick={() => handleButtonClick('red', 'white', 'italic')}
        style={{ margin: '10px', padding: '10px 20px', backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
      >
        Button1
      </button>
      <button
        onClick={() => handleButtonClick('green', 'black', 'bold')}
        style={{ margin: '10px', padding: '10px 20px', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}
      >
        Button2
      </button>
      <button
        onClick={() => handleButtonClick('blue', 'yellow', 'normal')}
        style={{ margin: '10px', padding: '10px 20px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
      >
        Button3
      </button>
    </div>
  );
}

export default Banners;
