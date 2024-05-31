import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import { toPng } from 'html-to-image';

const ThemeEditor = ({ selectedTheme, textAreas, setTextAreas, images, setImages }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const editorRef = useRef(null);

  const handleTextChange = (index, event) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index].text = event.target.value;
    setTextAreas(newTextAreas);
  };

  const handleFocus = (index) => {
    setSelectedIndex(index);
    setSelectedImageIndex(null);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setSelectedIndex(null);
  };

  const handleStyleChange = (index, style, value) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index][style] = value;
    setTextAreas(newTextAreas);
  };

  const handleResizeStop = (index, e, direction, ref, delta, position) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index].width = ref.style.width;
    newTextAreas[index].height = ref.style.height;
    newTextAreas[index].x = position.x;
    newTextAreas[index].y = position.y;
    setTextAreas(newTextAreas);
  };

  const handleDragStop = (index, e, d) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index].x = d.x;
    newTextAreas[index].y = d.y;
    setTextAreas(newTextAreas);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images, { src: e.target.result, x: 0, y: 0, width: 100, height: 100 }];
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDragStop = (index, e, d) => {
    const newImages = [...images];
    newImages[index].x = d.x;
    newImages[index].y = d.y;
    setImages(newImages);
  };

  const handleImageResizeStop = (index, e, direction, ref, delta, position) => {
    const newImages = [...images];
    newImages[index].width = ref.style.width;
    newImages[index].height = ref.style.height;
    newImages[index].x = position.x;
    newImages[index].y = position.y;
    setImages(newImages);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const newTextAreas = textAreas.filter((_, index) => index !== selectedIndex);
      setTextAreas(newTextAreas);
      setSelectedIndex(null);
    } else if (selectedImageIndex !== null) {
      const newImages = images.filter((_, index) => index !== selectedImageIndex);
      setImages(newImages);
      setSelectedImageIndex(null);
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      toPng(editorRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'edited-design.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Error generating image', err);
        });
    }
  };

  return (
    <div style={{ width: '80%', float: 'right', padding: '10px' }}>
      <Link to="/">
        <button>Back to Menu</button>
      </Link>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDelete}>Delete</button>
      {selectedTheme ? (
        <div>
          <h2>Selected Theme</h2>
          <div style={{ position: 'relative' }} ref={editorRef}>
            <img src={`/themes/${selectedTheme}`} alt="Selected Theme" style={{ width: '100%', height: 'auto' }} />
            {textAreas.map((textArea, index) => (
              <Rnd
                key={index}
                size={{ width: textArea.width, height: textArea.height }}
                position={{ x: textArea.x, y: textArea.y }}
                onDragStop={(e, d) => handleDragStop(index, e, d)}
                onResizeStop={(e, direction, ref, delta, position) => handleResizeStop(index, e, direction, ref, delta, position)}
                onClick={() => handleFocus(index)}
                style={{
                  border: selectedIndex === index ? '1px solid black' : 'none',
                }}
              >
                <textarea
                  value={textArea.text}
                  onChange={(e) => handleTextChange(index, e)}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: textArea.backgroundColor || 'transparent',
                    border: 'none',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: textArea.fontFamily,
                    fontSize: textArea.fontSize,
                    color: textArea.fontColor,
                    fontWeight: textArea.bold ? 'bold' : 'normal',
                    fontStyle: textArea.italic ? 'italic' : 'normal',
                    textDecoration: textArea.underline ? 'underline' : 'none',
                    textAlign: textArea.textAlign || 'left',
                  }}
                />
              </Rnd>
            ))}
            {images.map((image, index) => (
              <Rnd
                key={index}
                size={{ width: image.width, height: image.height }}
                position={{ x: image.x, y: image.y }}
                onDragStop={(e, d) => handleImageDragStop(index, e, d)}
                onResizeStop={(e, direction, ref, delta, position) => handleImageResizeStop(index, e, direction, ref, delta, position)}
                onClick={() => handleImageClick(index)}
                style={{
                  border: selectedImageIndex === index ? '1px solid black' : 'none',
                }}
              >
                <img src={image.src} alt="Uploaded" style={{ width: '100%', height: '100%' }} />
              </Rnd>
            ))}
          </div>
          {selectedIndex !== null && (
            <div style={{ marginTop: '10px' }}>
              <label>
                Font Family:
                <select
                  value={textAreas[selectedIndex].fontFamily}
                  onChange={(e) => handleStyleChange(selectedIndex, 'fontFamily', e.target.value)}
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </label>
              <label>
                Font Size:
                <input
                  type="number"
                  value={parseInt(textAreas[selectedIndex].fontSize, 10)}
                  onChange={(e) => handleStyleChange(selectedIndex, 'fontSize', `${e.target.value}px`)}
                />
              </label>
              <label>
                Font Color:
                <input
                  type="color"
                  value={textAreas[selectedIndex].fontColor}
                  onChange={(e) => handleStyleChange(selectedIndex, 'fontColor', e.target.value)}
                />
              </label>
              <label>
                Background Color:
                <input
                  type="color"
                  value={textAreas[selectedIndex].backgroundColor || '#ffffff'}
                  onChange={(e) => handleStyleChange(selectedIndex, 'backgroundColor', e.target.value)}
                />
              </label>
              <label>
                Text Align:
                <select
                  value={textAreas[selectedIndex].textAlign || 'left'}
                  onChange={(e) => handleStyleChange(selectedIndex, 'textAlign', e.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={textAreas[selectedIndex].bold || false}
                  onChange={(e) => handleStyleChange(selectedIndex, 'bold', e.target.checked)}
                />
                Bold
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={textAreas[selectedIndex].italic || false}
                  onChange={(e) => handleStyleChange(selectedIndex, 'italic', e.target.checked)}
                />
                Italic
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={textAreas[selectedIndex].underline || false}
                  onChange={(e) => handleStyleChange(selectedIndex, 'underline', e.target.checked)}
                />
                Underline
              </label>
            </div>
          )}
          <div>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
          </div>
        </div>
      ) : (
        <p>No theme selected.</p>
      )}
    </div>
  );
};

export default ThemeEditor;
