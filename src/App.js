import React from "react";
import MuxPlayer from "@mux/mux-player-react";
import ReactPlayer from "react-player";
import { Stream } from "@cloudflare/stream-react";
import DashPlayer from "./dash";
import HLSPlayer from "./hls";
import GetRemoteAddress from "./getremoteaddress";

function App() {
  return (
    <div className="ps-3">
      <h1>Video Player with Quality Auto Selection</h1>
      <div className="display:flex">
        <p>DASH (Dynamic Adaptive Streaming over HTTP) supports resolutions from 4K to 240p and is supported on all Android devices. However, it is not supported on Apple devices.</p>
        <DashPlayer src="https://pub-04bd08a612a343d3bdf972452bfee388.r2.dev/dash/output.mpd" width="410px" height="240px" />
      </div>

      <hr className="my-4"/>
      <p>HLS (HTTP Live Streaming) supports resolutions from 4K to 240p and is compatible with all devices.</p>
      <HLSPlayer src="https://pub-04bd08a612a343d3bdf972452bfee388.r2.dev/hls_with_audio/master.m3u8" width="410px" height="240px" />
    </div>
  );
}

export default App;
