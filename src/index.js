import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AudioPlayer from "./Player/AudioPlayer";
import tracks from "./tracks";

ReactDOM.render(
  <React.StrictMode>
    <AudioPlayer tracks={tracks} />
  </React.StrictMode>,
  document.getElementById("root")
);
