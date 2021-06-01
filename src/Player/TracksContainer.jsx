import React from "react";
import Track from "./Track";

export default function TracksContainer(props) {
  const handleChange = (value) => {
    props.onchange(value);
  };
  return (
    <div>
      <Track
        duration={props.duration}
        trackProgress={props.trackProgress}
        onchange={handleChange}
        trackStyling={props.trackStyling}
        track={props.tracks[0]}></Track>
      <Track
        duration={props.duration}
        trackProgress={props.trackProgress}
        onchange={handleChange}
        trackStyling={props.trackStyling}
        track={props.tracks[1]}></Track>
    </div>
  );
}
