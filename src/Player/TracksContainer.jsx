import React from "react";
import Track from "./Track";

export default function TracksContainer(props) {
  const handleChange = (value, audioRef) => {
    props.onchange(value, audioRef);
  };
  return (
    <div>
      <Track
        trackProgress={props.trackProgress}
        onchange={handleChange}
        track={props.tracks[0]}></Track>
      <Track
        trackProgress={props.trackProgress}
        onchange={handleChange}
        track={props.tracks[1]}></Track>
    </div>
  );
}
