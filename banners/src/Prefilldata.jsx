import React, { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import { Rnd } from "react-rnd";
import { BsFileEarmarkRichtext } from "react-icons/bs";
import { RiUploadCloud2Fill } from "react-icons/ri";
import {
  FiSquare,
  FiCircle,
  FiTriangle,
  FiStar,
  FiArrowUp,
} from "react-icons/fi";
import { MdDelete, MdOutlineSaveAlt } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaShapes } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaIcons } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { GrYoutube } from "react-icons/gr";
import { BsCurrencyRupee } from "react-icons/bs";

const prefillData = {
  "theme-1.png": {
    textAreas: [
      {backgroundImage: "/themes/theme-1.png", x: 50, y: 50, text: "Hello Theme 1", width: 200, height: 100, fontFamily: "Arial", fontSize: "16px", color: "#000", backgroundColor: "transparent", bold: false, italic: false, underline: false, textAlign: "left" }
    ],
    images: [
      { x: 100, y: 100, src: "/images/sample1.png", width: 100, height: 100 }
    ],
    shapes: [
      { x: 150, y: 150, width: 50, height: 50, fill: "black", thickness: 0.2, type: "circle", rotation: 0 }
    ]
  },
  "theme-2.png": {
    textAreas: [
      { x: 70, y: 70, text: "Welcome to Theme 2", width: 250, height: 150, fontFamily: "Arial", fontSize: "18px", color: "#333", backgroundColor: "transparent", bold: false, italic: false, underline: false, textAlign: "left", backgroundImage: "/theams/theme-2.png" }
    ],
    images: [
      { x: 120, y: 120, src: "/images/sample2.png", width: 120, height: 120 }
    ],
    shapes: [
      { x: 170, y: 170, width: 60, height: 60, fill: "blue", thickness: 0.3, type: "square", rotation: 0 }
    ]
  }
  // Add more themes as needed
};

const Prefilldata = ({ selectedTheme }) => {
  const [textAreas, setTextAreas] = useState([]);
  const [images, setImages] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
  const [addingText, setAddingText] = useState(false);
  const [addingImage, setAddingImage] = useState(false);
  const editorRef = useRef(null);
  const [showAllShapes, setShowAllShapes] = useState(false);
  const [showAllIcons, setShowAllIcons] = useState(false);
  const [exportWidth, setExportWidth] = useState(800); 
  const [exportHeight, setExportHeight] = useState(600); 
  const [showExportSettings, setShowExportSettings] = useState(false);

  useEffect(() => {
    if (selectedTheme && prefillData[selectedTheme]) {
      setTextAreas(prefillData[selectedTheme].textAreas || []);
      setImages(prefillData[selectedTheme].images || []);
      setShapes(prefillData[selectedTheme].shapes || []);
    }
  }, [selectedTheme]);

  const handleFocus = (index, type) => {
    setSelectedIndex(type === "text" ? index : null);
    setSelectedImageIndex(type === "image" ? index : null);
    setSelectedShapeIndex(type === "shape" ? index : null);
  };

  const handleTextChange = (index, e) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index].text = e.target.value;
    setTextAreas(newTextAreas);
  };

  const handleResizeStop = (index, e, direction, ref, delta, position) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index].width = ref.style.width;
    newTextAreas[index].height = ref.style.height;
    setTextAreas(newTextAreas);
  };

  const addSocialMediaIcon = (iconType) => {
    let iconUrl = "";
    let shapeType = "";
    switch (iconType) {
      case "facebook":
        iconUrl = "https://facebook.com";
        shapeType = "facebook";
        break;
      case "twitter":
        iconUrl = "https://twitter.com";
        shapeType = "twitter";
        break;
      case "instagram":
        iconUrl = "https://instagram.com";
        shapeType = "instagram";
        break;
      case "youtube":
        iconUrl = "https://youtube.com";
        shapeType = "youtube";
        break;
      case "rupee":
        iconUrl = "https://youtube.com";
        shapeType = "rupee";
        break;
      case "phone":
        iconUrl = "https://instagram.com";
        shapeType = "phone";
        break;
      case "attherate":
        iconUrl = "https://instagram.com";
        shapeType = "attherate";
        break;
      case "mail":
        iconUrl = "https://instagram.com";
        shapeType = "mail";
        break;
      default:
        break;
    }
    setShapes([
      ...shapes,
      {
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        fill: "black",
        thickness: 0.2,
        type: shapeType,
        rotation: 0,
      },
    ]);
  };

  const handleDragStop = (index, e, d) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index].x = d.x;
    newTextAreas[index].y = d.y;
    setTextAreas(newTextAreas);
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
    setImages(newImages);
  };

  const handleShapeDragStop = (index, e, d) => {
    const newShapes = [...shapes];
    newShapes[index].x = d.x;
    newShapes[index].y = d.y;
    setShapes(newShapes);
  };

  const handleShapeRotate = (index, rotation) => {
    const newShapes = [...shapes];
    newShapes[index].rotation = rotation;
    setShapes(newShapes);
  };

  const handleShapeResizeStop = (index, e, direction, ref, delta, position) => {
    const newShapes = [...shapes];
    newShapes[index].width = ref.style.width;
    newShapes[index].height = ref.style.height;
    setShapes(newShapes);
  };

  const addTextArea = () => {
    setTextAreas([
      ...textAreas,
      {
        x: 100,
        y: 100,
        text: "New Text",
        width: 200,
        height: 100,
        fontFamily: "Arial",
        fontSize: "16px",
        color: "#000000",
        backgroundColor: "transparent",
        bold: false,
        italic: false,
        underline: false,
        textAlign: "left",
      },
    ]);
    setAddingText(false);
  };

  const addImage = (url) => {
    setImages([
      ...images,
      {
        x: 100,
        y: 100,
        src: url,
        width: 100,
        height: 100,
      },
    ]);
    setAddingImage(false);
  };

  const handleShapeAdd = (shapeType) => {
    setShapes([
      ...shapes,
      {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        fill: "black",
        thickness: 0.2,
        type: shapeType,
        rotation: 0,
      },
    ]);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      setTextAreas(textAreas.filter((_, index) => index !== selectedIndex));
      setSelectedIndex(null);
    } else if (selectedImageIndex !== null) {
      setImages(images.filter((_, index) => index !== selectedImageIndex));
      setSelectedImageIndex(null);
    } else if (selectedShapeIndex !== null) {
      setShapes(shapes.filter((_, index) => index !== selectedShapeIndex));
      setSelectedShapeIndex(null);
    }
  };

  const handleExport = async () => {
    if (!editorRef.current) return;
    const dataUrl = await toPng(editorRef.current, { width: exportWidth, height: exportHeight });
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="editor">
      <div className="toolbar">
        <button onClick={() => setAddingText(true)}>
          <BsFileEarmarkRichtext />
        </button>
        <button onClick={() => setAddingImage(true)}>
          <RiUploadCloud2Fill />
        </button>
        <div className="shapes-toolbar">
          <button onClick={() => setShowAllShapes(!showAllShapes)}>
            <FaShapes />
          </button>
          {showAllShapes && (
            <div className="shapes-dropdown">
              <button onClick={() => handleShapeAdd("square")}>
                <FiSquare />
              </button>
              <button onClick={() => handleShapeAdd("circle")}>
                <FiCircle />
              </button>
              <button onClick={() => handleShapeAdd("triangle")}>
                <FiTriangle />
              </button>
              <button onClick={() => handleShapeAdd("star")}>
                <FiStar />
              </button>
              <button onClick={() => handleShapeAdd("arrow")}>
                <FiArrowUp />
              </button>
            </div>
          )}
        </div>
        <div className="icons-toolbar">
          <button onClick={() => setShowAllIcons(!showAllIcons)}>
            <FaIcons />
          </button>
          {showAllIcons && (
            <div className="icons-dropdown">
              <button onClick={() => addSocialMediaIcon("facebook")}>
                <FaFacebook />
              </button>
              <button onClick={() => addSocialMediaIcon("twitter")}>
                <FaTwitter />
              </button>
              <button onClick={() => addSocialMediaIcon("instagram")}>
                <FaInstagram />
              </button>
              <button onClick={() => addSocialMediaIcon("youtube")}>
                <GrYoutube />
              </button>
              <button onClick={() => addSocialMediaIcon("rupee")}>
                <BsCurrencyRupee />
              </button>
              <button onClick={() => addSocialMediaIcon("phone")}>
                <FaPhoneVolume />
              </button>
              <button onClick={() => addSocialMediaIcon("attherate")}>
                <MdAlternateEmail />
              </button>
              <button onClick={() => addSocialMediaIcon("mail")}>
                <IoIosMail />
              </button>
            </div>
          )}
        </div>
        <button onClick={handleDelete}>
          <MdDelete />
        </button>
        <button onClick={handleExport}>
          <MdOutlineSaveAlt />
        </button>
        <button onClick={() => setShowExportSettings(!showExportSettings)}>
          Export Settings
        </button>
        {showExportSettings && (
          <div className="export-settings">
            <label>
              Width:
              <input
                type="number"
                value={exportWidth}
                onChange={(e) => setExportWidth(parseInt(e.target.value))}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                value={exportHeight}
                onChange={(e) => setExportHeight(parseInt(e.target.value))}
              />
            </label>
          </div>
        )}
      </div>
      <div className="editor-content" ref={editorRef} style={{
          width: "230%",
          height: "110%",
          // border: "1px solid black",
          position: "relative",
          backgroundImage: `url(themes/${selectedTheme})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100%",
        }}>
    
        {textAreas.map((textArea, index) => (
          <Rnd
            key={index}
            bounds="parent"
            size={{ width: textArea.width, height: textArea.height }}
            position={{ x: textArea.x, y: textArea.y }}
            onDragStop={(e, d) => handleDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleResizeStop(index, e, direction, ref, delta, position)
            }
            onClick={() => handleFocus(index, "text")}
          >
            <textarea
              value={textArea.text}
              onChange={(e) => handleTextChange(index, e)}
              style={{
                width: textArea.width,
                height: textArea.height,
                fontFamily: textArea.fontFamily,
                fontSize: textArea.fontSize,
                color: textArea.color,
                backgroundColor: textArea.backgroundColor,
                fontWeight: textArea.bold ? "bold" : "normal",
                fontStyle: textArea.italic ? "italic" : "normal",
                textDecoration: textArea.underline ? "underline" : "none",
                textAlign: textArea.textAlign,
              }}
            />
          </Rnd>
        ))}
        {images.map((image, index) => (
          <Rnd
            key={index}
            bounds="parent"
            size={{ width: image.width, height: image.height }}
            position={{ x: image.x, y: image.y }}
            onDragStop={(e, d) => handleImageDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleImageResizeStop(index, e, direction, ref, delta, position)
            }
            onClick={() => handleFocus(index, "image")}
          >
            <img src={image.src} alt="" style={{ width: "100%", height: "100%" }} />
          </Rnd>
        ))}
        {shapes.map((shape, index) => (
          <Rnd
            key={index}
            bounds="parent"
            size={{ width: shape.width, height: shape.height }}
            position={{ x: shape.x, y: shape.y }}
            onDragStop={(e, d) => handleShapeDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleShapeResizeStop(index, e, direction, ref, delta, position)
            }
            onClick={() => handleFocus(index, "shape")}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: shape.fill,
                transform: `rotate(${shape.rotation}deg)`,
              }}
            >
              {shape.type === "square" && <FiSquare />}
              {shape.type === "circle" && <FiCircle />}
              {shape.type === "triangle" && <FiTriangle />}
              {shape.type === "star" && <FiStar />}
              {shape.type === "arrow" && <FiArrowUp />}
              {shape.type === "facebook" && <FaFacebook />}
              {shape.type === "twitter" && <FaTwitter />}
              {shape.type === "instagram" && <FaInstagram />}
              {shape.type === "youtube" && <GrYoutube />}
              {shape.type === "rupee" && <BsCurrencyRupee />}
              {shape.type === "phone" && <FaPhoneVolume />}
              {shape.type === "attherate" && <MdAlternateEmail />}
              {shape.type === "mail" && <IoIosMail />}
            </div>
          </Rnd>
        ))}
      </div>
      {addingText && <button onClick={addTextArea}>Add Text Area</button>}
      {addingImage && (
        <div>
          <input
            type="text"
            placeholder="Enter image URL"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addImage(e.target.value);
              }
            }}
          />
          <button onClick={() => setAddingImage(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Prefilldata;
