import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";

const HLSPlayer = ({ src,width = "400px", height = "225px"}) => {
  const videoRef = useRef(null);
  const [currentQuality, setCurrentQuality] = useState("auto");

  useEffect(() => {
    if (Hls.isSupported() && src.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Available Qualities:", hls.levels.map(level => level.height));
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        console.log(`Switched to quality: ${hls.levels[data.level].height}p`);
        setCurrentQuality(`${hls.levels[data.level].height}p`);
      });
    }
  }, [src]);

  return (
    <div>
      <video ref={videoRef} controls={true} width={width} height={height} />
      <p>Current Quality: {currentQuality}</p>
    </div>
  );
};

export default HLSPlayer;
