// src/components/FileUpload.js
import React from 'react';

const FileUpload = ({ onFileSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileSelect(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <input type="file" accept=".svg" onChange={handleFileChange} />
  );
};

export default FileUpload;
