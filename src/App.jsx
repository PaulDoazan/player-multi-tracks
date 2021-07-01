import React from "react";
import AudioPlayer from "./Player/AudioPlayer";
import tracks from "./tracks";
import FetchButton from "./Deezer/FetchButton";

export default function App() {
  return (
    <div>
      <FetchButton />
      <AudioPlayer tracks={tracks} />
    </div>
  );
}
