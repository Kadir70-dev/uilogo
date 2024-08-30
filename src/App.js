import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import LoginForm from './LoginForm';
import AdminPanel from './AdminPanel'; // Import your AdminPanel component if it exists
import { Typography, Button, TextField, Grid, Container, Card, CardContent, CardActions } from '@material-ui/core'; // Import Material-UI components

function App() {
  const [videoFiles, setVideoFiles] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [processingTimes, setProcessingTimes] = useState([]);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [showPositionSelection, setShowPositionSelection] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [text, setText] = useState('');
  const [previewVideo, setPreviewVideo] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [loggedInFlag, setLoggedInFlag] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDrop = (acceptedFiles) => {
    setVideoFiles(acceptedFiles);
  };

  const forceUpdate = () => {
    setLoggedInFlag(!loggedInFlag);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const handleLogin = async (usernameOrEmail, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { usernameOrEmail, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      const { role } = response.data.user;
      setUserRole(role);
      setIsLoggedIn(true);
      setIsLoginError(false);
      setLoggedInFlag(!loggedInFlag);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLoginError(true);
      } else {
        console.error('Login failed:', error.response.data);
        alert('An error occurred while logging in. Please try again later.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleLogoDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 1 && acceptedFiles[0].type === 'image/png') {
      setLogoFile(acceptedFiles[0]);
      setShowPositionSelection(true);
    } else {
      alert('Please select a single PNG image file for the logo.');
    }
  };

  const handleLogoPositionChange = (position) => {
    setLogoPosition(position);
    setShowPositionSelection(false);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('logo', logoFile);
    formData.append('logoPosition', JSON.stringify(logoPosition));
    videoFiles.forEach((file) => {
      formData.append('videos', file);
    });

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.message === 'Videos processed successfully') {
        setDownloadLinks([...res.data.downloadLinks]);
        setProcessing(false);
      }
      setUploading(false);
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploading(false);
      setProcessing(false);
    }
  };

  const handleDownload = (index) => {
    const downloadLink = downloadLinks[index];
    if (downloadLink) {
      window.open(downloadLink, '_blank');
    } else {
      console.log("Download link not available yet.");
    }
  };

  const handleDownloadAll = () => {
    downloadLinks.forEach((link, index) => {
      if (link) {
        window.open(link, `_blank`);
      } else {
        console.log(`Download link ${index + 1} not available yet.`);
      }
    });
  };

  const handlePreview = async (index) => {
    const previewLink = downloadLinks[index];
    if (previewLink) {
      setPreviewVideo(previewLink);
      setShowPreview(true);
    } else {
      console.log("Preview link not available yet.");
    }
  };

  const handleConfirmDownload = () => {
    setShowPreview(false);
    handleDownload();
  };

  return (
    <Container maxWidth="md" className="mt-5">
      {isAdminLoggedIn && (
        <div>
          <Typography variant="h1">Admin Dashboard</Typography>
          {/* Add your admin dashboard content here */}
          <Button onClick={() => setIsAdminLoggedIn(false)} variant="contained" color="primary">Logout</Button>
        </div>
      )}

      {isLoggedIn ? (
        <div className="logout-container">
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}> {userRole}</Typography>
          <Button onClick={handleLogout} variant="contained" color="primary">Logout</Button>
        </div>
      ) : (
        <div>
          <LoginForm
            setUserRole={setUserRole}
            setIsLoggedIn={setIsLoggedIn}
            setIsLoginError={setIsLoginError}
            setLoggedInFlag={setLoggedInFlag}
            loggedInFlag={loggedInFlag}
            isLoggedIn={isLoggedIn}
          />
          {isLoginError && <Typography variant="body1" sx={{ color: 'error.main' }}>Invalid username/email or password. Please try again.</Typography>}
        </div>
      )}
      {userRole && (
        <div>
          <Typography variant="body1">User Role: {userRole}</Typography>
        </div>
      )}

      {/* Logo Position Selection Popup */}
      {showPositionSelection && (
        <div className="position-selection-popup">
          <Typography variant="h6">Select Logo Position</Typography>
          <div className="position-selection-options">
            <Button onClick={() => handleLogoPositionChange({ x: 0, y: 0 })} variant="contained">Top Left</Button>
            <Button onClick={() => handleLogoPositionChange({ x: 0, y: 1 })} variant="contained">Bottom Left</Button>
            <Button onClick={() => handleLogoPositionChange({ x: 1, y: 0 })} variant="contained">Top Right</Button>
            <Button onClick={() => handleLogoPositionChange({ x: 1, y: 1 })} variant="contained">Bottom Right</Button>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div>
          <Typography variant="h3" sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>Bulk Video Processing App</Typography>
          <Typography variant="h4">Processing Times:</Typography>
          <ul>
            {processingTimes.map((time, index) => (
              <li key={index}>Processing Time for Video {index + 1}: {time} seconds</li>
            ))}
          </ul>
          {/* Dropzone for logo */}
          <Dropzone onDrop={handleLogoDrop} accept="image/png" multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'dropzone border rounded p-4 text-center' })}>
                <input {...getInputProps()} />
                <Typography variant="body1">Drag & drop PNG logo here, or click to select</Typography>
              </div>
            )}
          </Dropzone>

          {/* Dropzone for videos */}
          <Dropzone onDrop={handleDrop} accept="video/*" multiple>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'dropzone border rounded p-4 text-center mt-4' })}>
                <input {...getInputProps()} name="videos" />
                <Typography variant="body1">Drag & drop video files here, or click to select</Typography>
              </div>
            )}
          </Dropzone>

          {/* Display selected logo */}
          {logoFile && (
            <div className="mt-4">
              <Typography variant="h4">Selected Logo:</Typography>
              <img src={URL.createObjectURL(logoFile)} alt="Logo" />
            </div>
          )}

          {videoFiles.length > 0 && !uploading && (
            <div className="mt-4">
              <Typography variant="h4">Selected Videos:</Typography>
              <ul>
                {videoFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
              <div className="form-group">
                <Typography variant="body1" htmlFor="text">Enter Text for Overlay:</Typography>
                <TextField
                  type="text"
                  id="text"
                  value={text}
                  onChange={handleTextChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <Button onClick={handleUpload} disabled={uploading} variant="contained" color="primary">
                {uploading ? 'Uploading...' : 'Upload Videos'}
              </Button>
            </div>
          )}

          {uploading && (
            <div className="mt-4">
              <Typography variant="body1" sx={{ color: 'info.main' }}>Uploading...</Typography>
            </div>
          )}

          {processing && (
            <div className="mt-4">
              <Typography variant="body1" sx={{ color: 'info.main' }}>Processing...</Typography>
            </div>
          )}

          {!processing && downloadLinks.length > 0 && (
            <div className="mt-4">
              <Typography variant="h4">Processed Videos:</Typography>
              <Button onClick={handleDownloadAll} variant="contained" color="primary" sx={{ mb: 2 }}>Download All</Button>
              <ul>
                {downloadLinks.map((link, index) => (
                  <li key={index}>
                    Processed file {index + 1}:{" "}
                    <Button onClick={() => handlePreview(index)} variant="contained" color="primary" sx={{ mr: 2 }}>Preview</Button>
                    <Button onClick={() => handleDownload(index)} variant="contained" color="primary">Download</Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Video Preview Modal */}
          {showPreview && (
            <div className="modal-overlay">
              <div className="modal">
                <video controls src={previewVideo} />
                <Button onClick={() => setShowPreview(false)} variant="contained" color="primary">Close</Button>
                <Button onClick={handleConfirmDownload} variant="contained" color="primary">Download</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default App;
