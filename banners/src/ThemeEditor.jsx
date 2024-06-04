import React, { useState, useRef } from "react";
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
import { FaArrowRotateLeft } from "react-icons/fa6";
const ThemeEditor = ({ selectedTheme }) => {
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
        iconUrl = "https://facebook.com"; // Replace with actual URL
        shapeType = "facebook";
        break;
      case "twitter":
        iconUrl = "https://twitter.com"; // Replace with actual URL
        shapeType = "twitter";
        break;
      case "instagram":
        iconUrl = "https://instagram.com"; // Replace with actual URL
        shapeType = "instagram";
        break;
      case "youtube":
        iconUrl = "https://youtube.com"; // Replace with actual URL
        shapeType = "youtube";
        break;
      case "rupee":
        iconUrl = "https://youtube.com"; // Replace with actual URL
        shapeType = "rupee";
        break;
      case "phone":
        iconUrl = "https://instagram.com"; // Replace with actual URL
        shapeType = "phone";
        break;
      case "attherate":
        iconUrl = "https://instagram.com"; // Replace with actual URL
        shapeType = "attherate";
        break;
      case "mail":
        iconUrl = "https://instagram.com"; // Replace with actual URL
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
      const newTextAreas = [...textAreas];
      newTextAreas.splice(selectedIndex, 1);
      setTextAreas(newTextAreas);
      setSelectedIndex(null);
    } else if (selectedImageIndex !== null) {
      const newImages = [...images];
      newImages.splice(selectedImageIndex, 1);
      setImages(newImages);
      setSelectedImageIndex(null);
    } else if (selectedShapeIndex !== null) {
      const newShapes = [...shapes];
      newShapes.splice(selectedShapeIndex, 1);
      setShapes(newShapes);
      setSelectedShapeIndex(null);
    }
  };

  const handleExportClick = () => {
    setShowExportSettings(true);
  };
  const exportToImage = () => {
    if (editorRef.current) {
      const originalWidth = editorRef.current.offsetWidth;
      const originalHeight = editorRef.current.offsetHeight;

      const scale = Math.min(
        exportWidth / originalWidth,
        exportHeight / originalHeight
      );

      toPng(editorRef.current, {
        width: originalWidth * scale,
        height: originalHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${originalWidth}px`,
          height: `${originalHeight}px`,
        },
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "edited-design.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Error generating image", err);
        });
    }
  };

  const handleTextFormatting = (index, key, value) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index][key] = value;
    setTextAreas(newTextAreas);
  };
  const handleEditorClick = (event) => {
    const rect = editorRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (addingText) {
      const newTextAreas = [
        ...textAreas,
        {
          text: "New Text",
          x,
          y,
          width: 200,
          height: 50,
          fontFamily: "Arial",
          fontSize: "16px",
          fontColor: "#000000",
          backgroundColor: "transparent",
          bold: false,
          italic: false,
          underline: false,
          textAlign: "left",
        },
      ];
      setTextAreas(newTextAreas);
      setAddingText(false);
    } else if (addingImage) {
      document.getElementById("imageUploadInput").click();
      setAddingImage(false);
    }
  };
  const handleToggleShapes = () => {
    setShowAllShapes((prevShowAllShapes) => !prevShowAllShapes);
  };
  const handleToggleIcons = () => {
    setShowAllIcons((prevShowAllIcons) => !prevShowAllIcons);
  };

  const handleThicknessChange = (index, thickness) => {
    const newShapes = [...shapes];
    newShapes[index].thickness = thickness;
    setShapes(newShapes);
  };

  return (
    <div>
      <div>
        <h1>Theme Editor</h1>
        <div>
          <button onClick={addTextArea}>
            <BsFileEarmarkRichtext />
            Add Text
          </button>
          <button>
            <input
              type="file"
              onChange={(e) => addImage(URL.createObjectURL(e.target.files[0]))}
            />
            <RiUploadCloud2Fill />
            {/* Add Image */}
          </button>
          <div>
            {showAllShapes && (
              <div>
                <h2>Add Shapes</h2>
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
                <button onClick={() => handleShapeAdd("arrowUp")}>
                  <FiArrowUp />
                </button>
              </div>
            )}
            <button onClick={handleToggleShapes}>
              {showAllShapes ? "close" : <FaShapes />}
            </button>
          </div>
          <div>
            {showAllIcons && (
              <div>
                <h2>Add Social Media Icons</h2>
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
            <button onClick={handleToggleIcons}>
              {showAllIcons ? "close" : <FaIcons />}
            </button>
          </div>
          <button onClick={handleDelete}>
            <MdDelete />
            Delete
          </button>
          <button onClick={handleExportClick}>
            <MdOutlineSaveAlt />
            Export to Image
          </button>
        </div>
        {showExportSettings && (
          <div className="export-settings">
            <label>
              Export Width:
              <input
                type="number"
                value={exportWidth}
                onChange={(e) => setExportWidth(e.target.value)}
              />
            </label>
            <label>
              Export Height:
              <input
                type="number"
                value={exportHeight}
                onChange={(e) => setExportHeight(e.target.value)}
              />
            </label>
            <button onClick={exportToImage}>Export</button>
            <button onClick={() => setShowExportSettings(false)}>Cancel</button>
          </div>
        )}
      </div>
      <div
        onClick={handleEditorClick}
        ref={editorRef}
        style={{
          width: "230%",
          height: "110%",
          // border: "1px solid black",
          position: "relative",
          backgroundImage: `url(themes/${selectedTheme})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100%",
        }}
      >
        {textAreas.map((textArea, index) => (
          <Rnd
            key={index}
            size={{ width: textArea.width, height: textArea.height }}
            position={{ x: textArea.x, y: textArea.y }}
            onDragStop={(e, d) => handleDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleResizeStop(index, e, direction, ref, delta, position)
            }
            bounds="parent"
            style={{
              border: selectedIndex === index ? "1px solid blue" : "",
              zIndex: selectedIndex === index ? 1 : 0,
            }}
            onClick={() => handleFocus(index, "text")}
          >
            <textarea
              value={textArea.text}
              onChange={(e) => handleTextChange(index, e)}
              style={{
                width: "100%",
                height: "100%",
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
            {selectedIndex === index && (
              <div>
                <select
                  value={textArea.fontFamily}
                  onChange={(e) =>
                    handleTextFormatting(index, "fontFamily", e.target.value)
                  }
                >
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
                <input
                  type="number"
                  value={parseInt(textArea.fontSize, 10)}
                  onChange={(e) =>
                    handleTextFormatting(
                      index,
                      "fontSize",
                      `${e.target.value}px`
                    )
                  }
                />
                <input
                  type="color"
                  value={textArea.color}
                  onChange={(e) =>
                    handleTextFormatting(index, "color", e.target.value)
                  }
                />
                <input
                  type="color"
                  value={textArea.backgroundColor}
                  onChange={(e) =>
                    handleTextFormatting(
                      index,
                      "backgroundColor",
                      e.target.value
                    )
                  }
                />
                <label>
                  <input
                    type="checkbox"
                    checked={textArea.bold}
                    onChange={(e) =>
                      handleTextFormatting(index, "bold", e.target.checked)
                    }
                  />
                  Bold
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={textArea.italic}
                    onChange={(e) =>
                      handleTextFormatting(index, "italic", e.target.checked)
                    }
                  />
                  Italic
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={textArea.underline}
                    onChange={(e) =>
                      handleTextFormatting(index, "underline", e.target.checked)
                    }
                  />
                  Underline
                </label>
                <select
                  value={textArea.textAlign}
                  onChange={(e) =>
                    handleTextFormatting(index, "textAlign", e.target.value)
                  }
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}
          </Rnd>
        ))}
        {images.map((image, index) => (
          <Rnd
            key={index}
            size={{ width: image.width, height: image.height }}
            position={{ x: image.x, y: image.y }}
            onDragStop={(e, d) => handleImageDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleImageResizeStop(index, e, direction, ref, delta, position)
            }
            bounds="parent"
            style={{
              border: selectedImageIndex === index ? "1px solid blue" : "",
              zIndex: selectedImageIndex === index ? 1 : 0,
            }}
            onClick={() => handleFocus(index, "image")}
          >
            <img
              src={image.src}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </Rnd>
        ))}
        {/* {shapes.map((shape, index) => (
          <Rnd
            key={index}
            size={{ width: shape.width, height: shape.height }}
            position={{ x: shape.x, y: shape.y }}
            onDragStop={(e, d) => handleShapeDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleShapeResizeStop(index, e, direction, ref, delta, position)
            }
            bounds="parent"
            style={{
              // backgroundColor: shape.fill,
              border: selectedShapeIndex === index ? "1px solid blue" : "",
              zIndex: selectedShapeIndex === index ? 1 : 0,
            }}
            onClick={() => handleFocus(index, "shape")}
          >
            <IconComponent
              shape={shape}
              style={{
                width: shape.width,
                height: shape.height,
                border: shape === index ? "1px solid blue" : "",
                zIndex: selectedShapeIndex === index ? 1 : 0,
              }}
            />
            <input
              type="range"
              min="0"
              max="360"
              value={shape.rotation}
              onChange={(e) => handleShapeRotate(index, e.target.value)}
            />
            {selectedShapeIndex === index && (
              <div>
                <label>Thickness:</label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={shape.thickness}
                  onChange={(e) => handleThicknessChange(index, e.target.value)}
                />
              </div>
            )}
          </Rnd>
        ))} */}
        {shapes.map((shape, index) => (
          <Rnd
            key={index}
            size={{ width: shape.width, height: shape.height }}
            position={{ x: shape.x, y: shape.y }}
            onDragStop={(e, d) => handleShapeDragStop(index, e, d)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleShapeResizeStop(index, e, direction, ref, delta, position)
            }
            bounds="parent"
            style={{
              border: selectedShapeIndex === index ? "1px solid blue" : "",
              zIndex: selectedShapeIndex === index ? 1 : 0,
            }}
            onClick={() => handleFocus(index, "shape")}
          >
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <IconComponent
                shape={shape}
                style={{
                  width: shape.width,
                  height: shape.height,
                }}
              />
              {/* Button for rotation */}
              <button
                style={{
                  position: "absolute",
                  width: "25px",
                  height: "25px",
                  top: "-20px",
                  right: "-30px",
                  border: "1px solid #000",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent Rnd click event
                  handleShapeRotate(index, shape.rotation + 5); // Rotate by 45 degrees
                }}
              >
                <FaArrowRotateLeft />
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={shape.rotation}
              onChange={(e) => handleShapeRotate(index, e.target.value)}
            />
            {selectedShapeIndex === index && (
              <div>
                <label>Thickness:</label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={shape.thickness}
                  onChange={(e) => handleThicknessChange(index, e.target.value)}
                />
              </div>
            )}
          </Rnd>
        ))}
      </div>
    </div>
  );
};

const IconComponent = ({ shape }) => {
  const iconProps = {
    key: shape.type,
    size: shape.width,
    color: shape.fill,
    style: {
      strokeWidth: shape.thickness, // Use the thickness for icon stroke width
      transform: `rotate(${shape.rotation}deg)`, // Apply rotation
    },
  };

  switch (shape.type) {
    case "facebook":
      return <FaFacebook {...iconProps} />;
    case "twitter":
      return <FaTwitter {...iconProps} />;
    case "instagram":
      return <FaInstagram {...iconProps} />;
    case "square":
      return <FiSquare {...iconProps} />;
    case "circle":
      return <FiCircle {...iconProps} />;
    case "triangle":
      return <FiTriangle {...iconProps} />;
    case "star":
      return <FiStar {...iconProps} />;
    case "arrowUp":
      return <FiArrowUp {...iconProps} />;
    case "phone":
      return <FaPhoneVolume {...iconProps} />;
    case "mail":
      return <IoIosMail {...iconProps} />;
    case "attherate":
      return <MdAlternateEmail {...iconProps} />;
    case "youtube":
      return <GrYoutube {...iconProps} />;
    case "rupee":
      return <BsCurrencyRupee {...iconProps} />;
    default:
      return null;
  }
};

export default ThemeEditor;
