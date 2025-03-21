import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ sources }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        responsive: true,
      });

      player.src(sources);

      // Log errors
      player.on("error", () => {
        console.error("Video.js Error:", player.error());
      });

      playerRef.current = player;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [sources]);

  return <video ref={videoRef} className="video-js vjs-default-skin" />;
};

export default VideoPlayer;
