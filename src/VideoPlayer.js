import React, { useRef } from 'react';

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Autoplay failed:', error);
        });
      }
    }
  };

  return (
    <div>
      <video ref={videoRef}>
        <source src={videoUrl} type="video/mp4" />
      </video>
      <button onClick={handlePlay}>Play Video</button>
    </div>
  );
};

export default VideoPlayer;
