import React, { useState, useEffect } from 'react';
import api from './api/api';

const UploadBanner = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [designs, setDesigns] = useState([]);
    const [selectedDesignId, setSelectedDesignId] = useState('');

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            const response = await api.get('/webdesigns');
            setDesigns(response.data);
        } catch (error) {
            setMessage('Error fetching designs');
            console.error('Error fetching designs:', error);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDesignChange = (event) => {
        setSelectedDesignId(event.target.value);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        if (!selectedDesignId) {
            setMessage('Please select a design.');
            return;
        }

        const formData = new FormData();
        formData.append('banner', file);
        formData.append('designId', selectedDesignId);

        try {
            const response = await api.post('/uploadbanner', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error uploading banner');
            console.error('Error uploading banner:', error);
        }
    };

    return (
        <div>
            <h1>Upload SVG Banner</h1>
          
            <select value={selectedDesignId} onChange={handleDesignChange}>
                <option value="">Select Design</option>
                {designs.map((design) => (
                    <option key={design.design_Id} value={design.design_Id}>
                        {design.design}
                    </option>
                ))}
            </select>
            <input type="file" accept="image/svg+xml" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadBanner;
