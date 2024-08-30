// UploadVideos.js
import React from 'react';
import Dropzone from 'react-dropzone';

export function UploadVideos({
  videoFiles,
  uploading,
  text,
  handleTextChange,
  handleDrop,
  handleUpload,
}) {
  return (
    <div>
      <h2>Upload Videos</h2>
      <Dropzone onDrop={handleDrop} accept="video/*" multiple>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone border rounded p-4 text-center mt-4' })}>
            <input {...getInputProps()} name="videos" />
            <p>Drag & drop video files here, or click to select</p>
          </div>
        )}
      </Dropzone>

      {videoFiles.length > 0 && !uploading && (
        <div className="mt-4">
          <h4>Selected Videos:</h4>
          <ul>
            {videoFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <div className="form-group">
            <label htmlFor="text">Enter Text for Overlay:</label>
            <input
              type="text"
              className="form-control"
              id="text"
              value={text}
              onChange={handleTextChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Videos'}
          </button>
        </div>
      )}

      {uploading && (
        <div className="mt-4">
          <p className="text-info">Uploading...</p>
        </div>
      )}
    </div>
  );
}
