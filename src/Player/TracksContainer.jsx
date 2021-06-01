import React from "react";
import Track from "./Track";

export default function TracksContainer(duration, trackProgress, trackStyling) {
  return (
    <div>
      <Track duration={duration} trackProgress={trackProgress}></Track>
    </div>
  );
}
