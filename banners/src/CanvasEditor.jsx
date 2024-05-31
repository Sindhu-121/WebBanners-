import React, { useState, useEffect, useRef } from 'react';

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const imageLoaderRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [draggedElement, setDraggedElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawAllElements(ctx);
  }, [elements]);

  const handleDragStart = (event, element) => {
    setDraggedElement(element);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const newElements = [...elements];

    if (draggedElement.type === 'text') {
      const textElement = {
        ...draggedElement,
        x,
        y,
      };
      newElements.push(textElement);
    } else if (draggedElement.type === 'image') {
      const img = new Image();
      img.src = draggedElement.src;
      img.onload = () => {
        const imageElement = {
          type: 'image',
          img,
          x,
          y,
          width: img.width,
          height: img.height,
        };
        newElements.push(imageElement);
        setElements(newElements);
      };
    } else {
      setElements(newElements);
    }

    setDraggedElement(null);
  };

  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const imageElement = {
          type: 'image',
          img,
          x: 50,
          y: 50,
          width: img.width,
          height: img.height,
        };
        setElements([...elements, imageElement]);
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleCanvasClick = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const clickedElement = elements.find((el) => {
      if (el.type === 'text') {
        const textWidth = canvasRef.current.getContext('2d').measureText(el.text).width;
        const textHeight = parseInt(el.fontSize, 10);
        return x >= el.x && x <= el.x + textWidth && y <= el.y && y >= el.y - textHeight;
      } else if (el.type === 'image') {
        return x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height;
      }
      return false;
    });
    setSelectedElement(clickedElement);
  };

  const handleInputChange = (e, field) => {
    if (selectedElement) {
      const updatedElement = { ...selectedElement, [field]: e.target.value };
      setElements(elements.map(el => el === selectedElement ? updatedElement : el));
    }
  };

  const drawText = (ctx, { text, x, y, fontFamily, fontSize, fontColor }) => {
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.fillText(text, x, y);
  };

  const drawImage = (ctx, { img, x, y, width, height }) => {
    ctx.drawImage(img, x, y, width, height);
  };

  const drawAllElements = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    elements.forEach(el => {
      if (el.type === 'text') {
        drawText(ctx, el);
      } else if (el.type === 'image') {
        drawImage(ctx, el);
      }
    });
  };

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <div>
        <div
          className="draggable"
          draggable
          onDragStart={(e) => handleDragStart(e, { type: 'text', text: 'Text 1', fontFamily: 'Arial', fontSize: '20', fontColor: '#000' })}
        >
          Text 1
        </div>
        <div
          className="draggable"
          draggable
          onDragStart={(e) => handleDragStart(e, { type: 'text', text: 'Text 2', fontFamily: 'Arial', fontSize: '20', fontColor: '#000' })}
        >
          Text 2
        </div>
        <input type="file" ref={imageLoaderRef} onChange={handleFileChange} />
      </div>
      <canvas
        id="canvas"
        ref={canvasRef}
        width="800"
        height="600"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleCanvasClick}
        style={{ border: '1px solid black', marginTop: '20px' }}
      ></canvas>
      <div className="controls">
        <div>
          <label htmlFor="textContent">Text Content:</label>
          <input type="text" id="textContent" value={selectedElement?.text || ''} onChange={(e) => handleInputChange(e, 'text')} />
        </div>
        <div>
          <label htmlFor="fontFamily">Font Family:</label>
          <select id="fontFamily" value={selectedElement?.fontFamily || ''} onChange={(e) => handleInputChange(e, 'fontFamily')}>
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>
        <div>
          <label htmlFor="fontSize">Font Size:</label>
          <input type="number" id="fontSize" value={selectedElement?.fontSize || ''} onChange={(e) => handleInputChange(e, 'fontSize')} />
        </div>
        <div>
          <label htmlFor="fontColor">Font Color:</label>
          <input type="color" id="fontColor" value={selectedElement?.fontColor || '#000000'} onChange={(e) => handleInputChange(e, 'fontColor')} />
        </div>
        <div>
          <label htmlFor="elementWidth">Element Width:</label>
          <input type="number" id="elementWidth" value={selectedElement?.width || ''} onChange={(e) => handleInputChange(e, 'width')} />
        </div>
        <div>
          <label htmlFor="elementHeight">Element Height:</label>
          <input type="number" id="elementHeight" value={selectedElement?.height || ''} onChange={(e) => handleInputChange(e, 'height')} />
        </div>
      </div>
      <button onClick={saveCanvasAsImage}>Save as Image</button>
    </div>
  );
};

export default CanvasEditor;
