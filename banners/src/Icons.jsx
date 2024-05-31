import React, { useState } from 'react';
import ThemeEditor from './ThemeEditor';
import { FaMobileAlt, FaEnvelope, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';

const availableIcons = [
  { icon: FaMobileAlt, name: 'Mobile' },
  { icon: FaEnvelope, name: 'Envelope' },
  { icon: FaYoutube, name: 'YouTube' },
  { icon: FaInstagram, name: 'Instagram' },
  { icon: FaFacebook, name: 'Facebook' }
];

const ParentComponent = () => {
  const [textAreas, setTextAreas] = useState([]);
  const [images, setImages] = useState([]);
  const [icons, setIcons] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);

  return (
    <ThemeEditor
      selectedTheme={selectedTheme}
      textAreas={textAreas}
      setTextAreas={setTextAreas}
      images={images}
      setImages={setImages}
      icons={icons}
      setIcons={setIcons}
      availableIcons={availableIcons}
    />
  );
};

export default ParentComponent;
