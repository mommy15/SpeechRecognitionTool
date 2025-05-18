import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { Typewriter } from 'react-simple-typewriter';

// This component allows users to upload an audio file for transcription
const Upload = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [editableTranscription, setEditableTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  // Function to handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    try {
      console.log("Uploading file...");
      const response = await axios.post('http://localhost:5000/upload', formData);
  
      // Ensure response contains transcription data
      if (response.data && response.data.transcription) {
        setTranscription(response.data.transcription);
        setEditableTranscription(response.data.transcription);
      } else {
        alert('No transcription found in the response');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setLoading(false);
      // Optionally, clear the file state after successful upload
      setFile(null); // Resets the selected file after upload
    }
  };
  
  // Function to handle downloading the transcription as a text file
  const handleDownload = () => {
    const blob = new Blob([editableTranscription], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcription.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mt-5">
      <h3>Upload an Audio File</h3>

      {/* Drag & drop styled box */}
      <div className="border p-4 rounded bg-light mb-3 text-center shadow-sm">
        <input
          type="file"
          accept="audio/*"
          onChange={e => setFile(e.target.files[0])}
          className="form-control"
        />
        {file && (
          <div className="mt-3">
            <strong>Selected file:</strong> {file.name}
            <br />
            <audio controls className="mt-2" src={URL.createObjectURL(file)} />
          </div>
        )}
      </div>

      <button className="btn btn-success mb-3" onClick={handleUpload}>Transcribe</button>

      {loading && <Spinner />}

      {transcription && (
        <div className="mt-4">
          <h5>Transcription:</h5>
          <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }} className="mb-3">
            <Typewriter
              key={transcription}
              words={[transcription]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={30}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
          
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => navigator.clipboard.writeText(editableTranscription)}
          >
            📋 Copy
          </button>

          <button className="btn btn-outline-primary" onClick={handleDownload}>
            ⬇ Download
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;

