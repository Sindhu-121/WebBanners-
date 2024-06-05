// import React, { useState, useEffect, useRef } from 'react';
// import "./BannerEditor.css"
// const BannerEditor = () => {
//   const [svgContent, setSVGContent] = useState("");
//   const [editableContent, setEditableContent] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
//   const [textSize, setTextSize] = useState(16);
//   const svgRef = useRef(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       setSVGContent(e.target.result);
//     };

//     reader.readAsText(file);
//   };

//   const handleDoubleClick = (event) => {
//     const target = event.target;
//     if (editMode && (target.tagName === 'text' || target.tagName === 'image')) {
//       setEditableContent(target);
//     }
//     if (target.tagName === 'text' || target.tagName === 'image') {
//       setEditableContent(target);

//       if (target.tagName === 'image') {
//         setImageSize({
//           width: parseFloat(target.getAttribute('width')),
//           height: parseFloat(target.getAttribute('height')),
//         });
//       } else if (target.tagName === 'text') {
//         setTextSize(parseFloat(target.getAttribute('font-size')));
//       }
//     }
//   };

//   const handleContentEdit = (event) => {
//     const newText = event.target.textContent;
//     if (editableContent && editableContent.tagName === 'text') {
//       editableContent.textContent = newText;
//     }
//   };

//   const handleImageReplace = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       editableContent.setAttribute('xlink:href', e.target.result);
//     };

//     reader.readAsDataURL(file);
//   };

//   const toggleEditMode = () => {
//     setEditMode(!editMode);
//     setEditableContent(null);
//   };

//   const handleSave = () => {
//     const svgElement = svgRef.current.querySelector('svg');
//     const updatedSVG = new XMLSerializer().serializeToString(svgElement);
//     const svgBlob = new Blob([updatedSVG], { type: 'image/svg+xml;charset=utf-8' });
//     const svgUrl = URL.createObjectURL(svgBlob);
//     const downloadLink = document.createElement('a');
//     downloadLink.href = svgUrl;
//     downloadLink.download = 'edited-banner.svg';
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   const handleMouseDown = (event) => {
//     if (editableContent && editableContent.tagName === 'image') {
//       const startX = event.clientX;
//       const startY = event.clientY;
//       const startWidth = parseFloat(editableContent.getAttribute('width'));
//       const startHeight = parseFloat(editableContent.getAttribute('height'));

//       const onMouseMove = (moveEvent) => {
//         const newWidth = startWidth + (moveEvent.clientX - startX);
//         const newHeight = startHeight + (moveEvent.clientY - startY);
//         setImageSize({ width: newWidth, height: newHeight });
//       };

//       const onMouseUp = () => {
//         document.removeEventListener('mousemove', onMouseMove);
//         document.removeEventListener('mouseup', onMouseUp);
//       };

//       document.addEventListener('mousemove', onMouseMove);
//       document.addEventListener('mouseup', onMouseUp);
//     }
//   };

//   useEffect(() => {
//     if (editableContent && editableContent.tagName === 'image') {
//       editableContent.setAttribute('width', imageSize.width);
//       editableContent.setAttribute('height', imageSize.height);
//     } else if (editableContent && editableContent.tagName === 'text') {
//       editableContent.setAttribute('font-size', textSize);
//     }
//   }, [imageSize, textSize, editableContent]);

//   return (
//     <div style={{ padding: '20px' }} className='Bannerediter'>
//       <input type="file" accept=".svg" onChange={handleFileUpload} style={{ display: 'block', marginBottom: '20px' }} />
//       <div
//         ref={svgRef}
//         dangerouslySetInnerHTML={{ __html: svgContent }}
//         onDoubleClick={handleDoubleClick}
//         contentEditable={editMode}
//         onInput={handleContentEdit}
//         onMouseDown={handleMouseDown}
//         className='Bannerediterimgcontainer'
//       />
//       {editMode && editableContent && editableContent.tagName === 'image' && (
//         <div style={{ marginBottom: '20px' }}>
//           <p>Replace image:</p>
//           <input type="file" accept="image/*" onChange={handleImageReplace} />
//         </div>
//       )}
//       {editableContent && editableContent.tagName === 'text' && (
//         <div style={{ marginBottom: '20px' }}>
//           <p>Adjust text size:</p>
//           <input
//             type="number"
//             value={textSize}
//             onChange={(e) => setTextSize(parseFloat(e.target.value))}
//             style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
//           />
//         </div>
//       )}
//       <button 
//         onClick={toggleEditMode} 
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           padding: '10px 20px',
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           zIndex: 1000,
//         }}>
//         {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
//       </button>
//       <button 
//         onClick={handleSave} 
//         style={{
//           padding: '10px',
//           backgroundColor: '#28a745',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           marginLeft: '10px'
//         }}>
//         Save
//       </button>
//     </div>
//   );
// };

// export default BannerEditor;

import React, { useState, useEffect, useRef } from 'react';
import './BannerEditor.css';

const BannerEditor = () => {
  const [svgContent, setSVGContent] = useState("");
  const [editableContent, setEditableContent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
  const [textSize, setTextSize] = useState(16);
  const svgRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSVGContent(e.target.result);
    };

    reader.readAsText(file);
  };

  const handleDoubleClick = (event) => {
    const target = event.target;
    if (editMode && (target.tagName === 'text' || target.tagName === 'image')) {
      setEditableContent(target);
    }
    if (target.tagName === 'text' || target.tagName === 'image') {
      setEditableContent(target);

      if (target.tagName === 'image') {
        setImageSize({
          width: parseFloat(target.getAttribute('width')),
          height: parseFloat(target.getAttribute('height')),
        });
      } else if (target.tagName === 'text') {
        setTextSize(parseFloat(target.getAttribute('font-size')));
      }
    }
  };

  const handleContentEdit = (event) => {
    const newText = event.target.textContent;
    if (editableContent && editableContent.tagName === 'text') {
      editableContent.textContent = newText;
    }
  };

  const handleImageReplace = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      editableContent.setAttribute('xlink:href', e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditableContent(null);
  };

  const handleSave = () => {
    const svgElement = svgRef.current.querySelector('svg');
    const updatedSVG = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([updatedSVG], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'edited-banner.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleMouseDown = (event) => {
    if (editableContent && editableContent.tagName === 'image') {
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = parseFloat(editableContent.getAttribute('width'));
      const startHeight = parseFloat(editableContent.getAttribute('height'));

      const onMouseMove = (moveEvent) => {
        const newWidth = startWidth + (moveEvent.clientX - startX);
        const newHeight = startHeight + (moveEvent.clientY - startY);
        setImageSize({ width: newWidth, height: newHeight });
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  useEffect(() => {
    if (editableContent && editableContent.tagName === 'image') {
      editableContent.setAttribute('width', imageSize.width);
      editableContent.setAttribute('height', imageSize.height);
    } else if (editableContent && editableContent.tagName === 'text') {
      editableContent.setAttribute('font-size', textSize);
    }
  }, [imageSize, textSize, editableContent]);

  return (
    <div className="BannerEditor">
      <input type="file" accept=".svg" onChange={handleFileUpload} style={{ display: 'block', marginBottom: '20px' }} />
      <div
        ref={svgRef}
        className="img-container"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        onDoubleClick={handleDoubleClick}
        contentEditable={editMode }
        onInput={handleContentEdit}
        onMouseDown={handleMouseDown}
      />
      {editMode && editableContent && editableContent.tagName === 'image' && (
        <div style={{ marginBottom: '20px' }}>
          <p>Replace image:</p>
          <input type="file" accept="image/*" onChange={handleImageReplace} />
        </div>
      )}
      {editableContent && editableContent.tagName === 'text' && (
        <div style={{ marginBottom: '20px' }}>
          <p>Adjust text size:</p>
          <input
            type="number"
            value={textSize}
            onChange={(e) => setTextSize(parseFloat(e.target.value))}
            style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
      )}
      <button 
        onClick={toggleEditMode} 
        style={{
       
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          zIndex: 1000,
        }}
        
        
        >
        {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
      </button>
      <button 
        onClick={handleSave} 
        style={{
          padding: '10px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          marginLeft: '10px'
        }}>
        Save
      </button>
    </div>
  );
};

export default BannerEditor;
