import React, { useState, useEffect, useRef } from "react";
import "./BannerEditor.css";
import api from "./api/api";

const BannerEditor = () => {
  const [svgContent, setSVGContent] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
  const [textSize, setTextSize] = useState(16);
  const svgRef = useRef(null);
  const [banners, setBanners] = useState([]);
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [message, setMessage] = useState("");
  const [showBanners, setShowBanners] = useState(false);
  const [showPosters, setShowPoster] = useState(false);
  const [posters, setPosters] = useState([]);
  const [selectedPosterId, setSelectedPosterId] = useState(null);
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await api.get("/fetchbanners");
      setBanners(response.data);
    } catch (error) {
      setMessage("Error fetching banners");
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchposters();
  }, []);

  const fetchposters = async () => {
    try {
      const response = await api.get("/fetchposters");
      setPosters(response.data);
    } catch (error) {
      setMessage("Error fetching posters");
      console.error("Error fetching posters:", error);
    }
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     setSVGContent(e.target.result);
  //   };

  //   reader.readAsText(file);
  // };

  const handleElementClick = (event) => {
    let target = event.target;
    console.log("Element clicked:", target.tagName);

    if (target.tagName === "tspan" && target.parentElement.tagName === "text") {
      target = target.parentElement;
    }

    if (editMode && (target.tagName === "text" || target.tagName === "image")) {
      setSelectedElement(target);
      if (target.tagName === "image") {
        setImageSize({
          width: parseFloat(target.getAttribute("width")),
          height: parseFloat(target.getAttribute("height")),
        });
        console.log("Image element selected:", target);
      } else if (target.tagName === "text") {
        const fontSize = parseFloat(target.getAttribute("font-size")) || 16;
        setTextSize(fontSize);
        console.log("Text element selected:", target);
      }
    }
  };

  const handleImageReplace = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (selectedElement) {
        selectedElement.setAttribute("xlink:href", e.target.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleTextSizeChange = (event) => {
    const newSize = parseFloat(event.target.value);
    console.log("New text size:", newSize);
    setTextSize(newSize);
    let targetElement = selectedElement;
    if (selectedElement.tagName === "tspan") {
      targetElement = selectedElement.parentElement;
    }
    console.log("Target element:", targetElement);
    if (targetElement) {
      targetElement.style.fontSize = `${newSize}px`;
      targetElement.setAttribute("font-size", newSize);
      console.log("Font size attribute set to:", newSize);
      console.log("Target element after setting font size:", targetElement);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedElement(null);
  };

  const handleSave = async () => {
    if (!selectedBannerId && !selectedPosterId) {
      setMessage("Please select a banner or poster to edit.");
      return;
    }

    const svgElement = svgRef.current.querySelector("svg");
    const updatedSVG = new XMLSerializer().serializeToString(svgElement);
    const updatedSVGBase64 = btoa(updatedSVG);

    try {
      if (selectedBannerId) {
        await api.put(`/updatebanner/${selectedBannerId}`, {
          banner: updatedSVGBase64,
        });
        setMessage("Banner updated successfully");
        fetchBanners();
      } else if (selectedPosterId) {
        await api.put(`/updateposters/${selectedPosterId}`, {
          posters: updatedSVGBase64,
        });
        setMessage("Poster updated successfully");
        fetchposters(); // Assuming you have a function to fetch posters similar to fetchBanners
      }
    } catch (error) {
      setMessage("Error updating item");
      console.error("Error updating item:", error);
    }
  };

  const handleMouseDown = (event) => {
    if (selectedElement && selectedElement.tagName === "image") {
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = parseFloat(selectedElement.getAttribute("width"));
      const startHeight = parseFloat(selectedElement.getAttribute("height"));

      const onMouseMove = (moveEvent) => {
        const newWidth = startWidth + (moveEvent.clientX - startX);
        const newHeight = startHeight + (moveEvent.clientY - startY);
        setImageSize({ width: newWidth, height: newHeight });
        selectedElement.setAttribute("width", newWidth);
        selectedElement.setAttribute("height", newHeight);
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  const renderControls = () => {
    if (!editMode || !selectedElement) return null;

    const rect = selectedElement.getBoundingClientRect();
    return (
      <div
        className="controls"
        style={{
          position: "absolute",
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "5px",
          zIndex: 1000,
        }}
      >
        {selectedElement.tagName === "image" ? (
          <div>
            <p>Replace image:</p>
            <input type="file" accept="image/*" onChange={handleImageReplace} />
          </div>
        ) : (
          <div>
            <p>Adjust text size:</p>
            <input
              type="number"
              value={textSize}
              onChange={handleTextSizeChange}
              style={{
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (selectedElement && selectedElement.tagName === "image") {
      selectedElement.setAttribute("width", imageSize.width);
      selectedElement.setAttribute("height", imageSize.height);
    } else if (selectedElement && selectedElement.tagName === "text") {
      selectedElement.setAttribute("font-size", textSize);
    }
  }, [imageSize, textSize, selectedElement]);

  const handleBannerClick = (bannerContent, bannerId) => {
    setSVGContent(atob(bannerContent));
    setSelectedBannerId(bannerId);
    setEditMode(false);
  };

  const handlePosterClick = (posterContent, posterId) => {
    setSVGContent(atob(posterContent));
    setSelectedPosterId(posterId);
    setEditMode(false);
  };

  const toggleShowBanners = () => {
    setShowBanners(true);
    setShowPoster(false);
    setSVGContent("");
    setSelectedBannerId(null);
  };
  
  const toggleShowposter = () => {
    setShowBanners(false);
    setShowPoster(true);
    setSVGContent("");
    setSelectedPosterId(null);
  };
  

  return (
    <div className="BannerEditor">
      <div>
        <h1>Web Banners</h1>
        {message && <p>{message}</p>}
        <button
          onClick={toggleShowBanners}
          style={{
            padding: "10px",
            backgroundColor: "#17a2b8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {showBanners ? "Hide Banners" : "Show Banners"}
        </button>
        <button
          onClick={toggleShowposter}
          style={{
            padding: "10px",
            backgroundColor: "#17a2b8",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          {showPosters ? "Hide Poster" : "Show Poster"}
        </button>
        {showBanners && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {banners.map((banner) => (
              <div
                key={banner.banner_Id}
                style={{ margin: "10px" }}
                onClick={() =>
                  handleBannerClick(banner.banner, banner.banner_Id)
                }
              >
                <img
                  src={`data:image/svg+xml;base64,${banner.banner}`}
                  alt={`Banner ${banner.banner_Id}`}
                  style={{ width: "200px", height: "200px", cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        )}
        {showPosters && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {posters.map((poster) => (
              <div
                key={poster.web_poster_id}
                style={{ margin: "10px" }}
                onClick={() =>
                  handlePosterClick(
                    poster.web_poster_data,
                    poster.web_poster_id
                  )
                }
              >
                <img
                  src={`data:image/svg+xml;base64,${poster.web_poster_data}`}
                  alt={`poster ${poster.web_poster_id}`}
                  style={{ width: "200px", height: "200px", cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        ref={svgRef}
        className="img-container"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        onClick={handleElementClick}
        contentEditable={editMode}
        onMouseDown={handleMouseDown}
      />
      {renderControls()}
      <button
        onClick={toggleEditMode}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          zIndex: 1000,
        }}
      >
        {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
      </button>
      <button
        onClick={handleSave}
        style={{
          padding: "10px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          marginLeft: "10px",
        }}
      >
        Save
      </button>
    </div>
  );
};

export default BannerEditor;
