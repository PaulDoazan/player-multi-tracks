import React, { useState } from "react";
import Track from "./Track";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function TracksContainer(props) {
  const [tracksArray, setTracksArray] = useState([]);

  const handleChange = (value, audioRef) => {
    props.onchange(value, audioRef);
  };

  const addTrack = () => {
    props.addTrack();
    setTracksArray(oldArray => [...oldArray, props.tracks[getRandomInt(0, props.tracks.length)]]);
  }

  return (
    <div>
      {tracksArray.map((item) => {
        return <Track
          trackProgress={props.trackProgress}
          onchange={handleChange}
          track={item}></Track>
      })}

      <div className="btn-container">
        <button
          className="btn-add-track"
          onClick={() => { addTrack() }}>
          +
        </button>
      </div>
    </div>
  );
}
