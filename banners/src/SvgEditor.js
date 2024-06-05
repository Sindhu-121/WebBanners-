// src/components/SvgEditor.js
import React, { useEffect, useRef } from 'react';

const SvgEditor = ({ svgContent, onSelectText }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && svgContent) {
      svgRef.current.innerHTML = svgContent;

      // Make text elements selectable
      const textElements = svgRef.current.querySelectorAll('text');
      textElements.forEach((element) => {
        element.addEventListener('click', () => {
          onSelectText(element);
        });
      });
    }
  }, [svgContent, onSelectText]);

  return (
    <div
      ref={svgRef}
      style={{ border: '1px solid black', marginTop: '20px', cursor: 'text' }}
    />
  );
};

export default SvgEditor;
