import React, { useState } from 'react';
// import Draggable from 'react-draggable';
import logo from './logo.png'
const EditableComponent = ({ data,theme  }) => {
  const [editableData, setEditableData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditableData((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

//   const handleDrag = (e, position, fieldName) => {
//     const { x, y } = position;
//     setEditableData((prev) => ({
//       ...prev,
//       [fieldName]: { ...prev[fieldName], x, y },
//     }));
//   };

  return (
    <div className={`editable-container ${theme}`}>
      {/* <Draggable
        position={{ x: editableData.logoPosition?.x || 0, y: editableData.logoPosition?.y || 0 }}
        onStop={(e, position) => handleDrag(e, position, 'logoPosition')}
      > */}
      <img src={logo} alt="Logo" className="logo" />

      {/* </Draggable> */}

      {/* <Draggable
        position={{ x: editableData.examNamePosition?.x || 0, y: editableData.examNamePosition?.y || 0 }}
        onStop={(e, position) => handleDrag(e, position, 'examNamePosition')}
      > */}
        <h1 contentEditable suppressContentEditableWarning>
          {editableData.examName}
        </h1>
      {/* </Draggable> */}

      <ul>
        {editableData.keyPoints.map((point, index) => (
        //   <Draggable
        //     key={index}
        //     position={{ x: editableData.keyPointsPosition?.[index]?.x || 0, y: editableData.keyPointsPosition?.[index]?.y || 0 }}
        //     onStop={(e, position) => {
        //       const newPositions = editableData.keyPointsPosition || [];
        //       newPositions[index] = { x: position.x, y: position.y };
        //       setEditableData((prev) => ({ ...prev, keyPointsPosition: newPositions }));
        //     }}
        //   >
            <li>
              <input
                type="text"
                name={`keyPoint${index}`}
                value={point}
                onChange={(e) => {
                  const newPoints = [...editableData.keyPoints];
                  newPoints[index] = e.target.value;
                  setEditableData((prev) => ({ ...prev, keyPoints: newPoints }));
                }}
              />
            </li>
        //   {/* </Draggable> */}
        ))}
      </ul>

      <p>Contact us:</p>
      {/* <Draggable
        position={{ x: editableData.phonePosition?.x || 0, y: editableData.phonePosition?.y || 0 }}
        onStop={(e, position) => handleDrag(e, position, 'phonePosition')}
      > */}
        <p>
          Phone: <input type="text" name="phone" value={editableData.phone} onChange={handleChange} />
        </p>
      {/* </Draggable>

      <Draggable
        position={{ x: editableData.emailPosition?.x || 0, y: editableData.emailPosition?.y || 0 }}
        onStop={(e, position) => handleDrag(e, position, 'emailPosition')}
      > */}
        <p>
          Email: <input type="email" name="email" value={editableData.email} onChange={handleChange} />
        </p>
      {/* </Draggable>

      <Draggable
        position={{ x: editableData.websitePosition?.x || 0, y: editableData.websitePosition?.y || 0 }}
        onStop={(e, position) => handleDrag(e, position, 'websitePosition')}
      > */}
        <p>
          Website: <input type="text" name="website" value={editableData.website} onChange={handleChange} />
        </p>
      {/* </Draggable>

      <Draggable
        position={{ x: editableData.startDatePosition?.x || 0, y: editableData.startDatePosition?.y || 0 }}
        onStop={(e, position) => handleDrag(e, position, 'startDatePosition')}
      > */}
        <p>
          Start Date: <input type="text" name="startdate" value={editableData.startdate} onChange={handleChange} />
        </p>
      {/* </Draggable>

      <Draggable
        position={{ x: editableData.endDatePosition?.x || 0, y: editableData.endDatePosition?.y || 0 }}
        onStop={(e, position) => handleDrag(e, position, 'endDatePosition')}
      > */}
        <p>
          End Date: <input type="text" name="enddate" value={editableData.enddate} onChange={handleChange} />
        </p>
      {/* </Draggable> */}

      {/* <Draggable
        position={{ x: editableData.costPosition?.x || 0, y: editableData.costPosition?.y || 0 }}
        onStop={(e, position) => handleDrag(e, position, 'costPosition')}
      > */}
        <p>
          Cost: <input type="text" name="cost" value={editableData.cost} onChange={handleChange} />
        </p>
      {/* </Draggable> */}

      <ul>
        {editableData.subject.map((subject, index) => (
        //   <Draggable
        //     key={index}
        //     position={{ x: editableData.subjectPosition?.[index]?.x || 0, y: editableData.subjectPosition?.[index]?.y || 0 }}
        //     onStop={(e, position) => {
        //       const newPositions = editableData.subjectPosition || [];
        //       newPositions[index] = { x: position.x, y: position.y };
        //       setEditableData((prev) => ({ ...prev, subjectPosition: newPositions }));
        //     }}
        //   >
            <li>
              <input
                type="text"
                name={`subject${index}`}
                value={subject}
                onChange={(e) => {
                  const newSubjects = [...editableData.subject];
                  newSubjects[index] = e.target.value;
                  setEditableData((prev) => ({ ...prev, subject: newSubjects }));
                }}
              />
            </li>
        //   {/* </Draggable> */}
        ))}
      </ul>

      <p>
        <input type="file" onChange={handleImageUpload} />
      </p>
      {editableData.image && (
        // <Draggable
        //   position={{ x: editableData.imagePosition?.x || 0, y: editableData.imagePosition?.y || 0 }}
        //   onStop={(e, position) => handleDrag(e, position, 'imagePosition')}
        // >
          <img src={editableData.image} alt="Uploaded" className="uploaded-image" />
        // {/* </Draggable> */}
      )}
    </div>
  );
};

export default EditableComponent;