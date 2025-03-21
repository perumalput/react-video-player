import React, { useEffect, useRef } from "react";
import * as dashjs from "dashjs";

const DashPlayer = ({ src, width = "400px", height = "225px" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && src) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, src, false);

      // Enable Adaptive Bitrate (ABR) for network-based quality change
      player.updateSettings({
        streaming: {
          abr: {  
            autoSwitchBitrate: { video: true },
          },
        },
      });

      // Log available bitrates
      player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
        const tracks = player.getTracksFor("video");
        if (tracks.length > 0) {
          console.log("🎥 Available bitrates:", tracks.map(t => t.bitrate || "N/A"));
        } else {
          console.warn("⚠️ No video bitrates found.");
        }
      });

      // Log quality switch request
      player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, (e) => {
        const tracks = player.getTracksFor("video");
        const requestedBitrate = tracks[e.newQuality]?.bitrate || "Unknown";
        console.log(`⚡ Requested quality change: ${requestedBitrate / 1000 || "N/A"} kbps`);
      });

      // Log applied quality change
      player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, (e) => {
        const tracks = player.getTracksFor("video");
        const newBitrate = tracks[e.newQuality]?.bitrate || "Unknown";
        console.log(`✅ Switched to bitrate: ${newBitrate / 1000 || "N/A"} kbps`);
      });

      return () => player.reset();
    }
  }, [src]);

  return <video ref={videoRef} controls={true} width={width} height={height} />;
};

export default DashPlayer;
