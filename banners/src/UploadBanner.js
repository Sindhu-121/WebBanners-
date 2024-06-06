import React, { useState } from 'react';
import api from './api/api';

const UploadBanner = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('banner', file);

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
            <input type="file" accept="image/svg+xml" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadBanner;
