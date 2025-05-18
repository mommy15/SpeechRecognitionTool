import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Spinner component to show Loading state
// This component is used to indicate that a process is ongoing, such as file upload or transcription
const Spinner = () => (
  <div className="text-center my-5 mic-loader">
    <div className="mic-pulse-container">
      <i className="bi bi-mic-fill mic-icon"></i>
    </div>
    <p className="mt-3 text-muted">Transcribing... Please wait</p>
  </div>
);

export default Spinner;
