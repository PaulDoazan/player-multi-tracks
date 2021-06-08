import React, { useState, useEffect } from "react";
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

  const handleDown = () => {
    props.onTrackDown();
  };

  const addTrack = () => {
    setTracksArray((oldArray) => [
      ...oldArray,
      props.tracks[getRandomInt(0, props.tracks.length)]
    ]);
  };

  useEffect(() => {
    props.addTrack(tracksArray);
    props.onTrackDown();
  }, [tracksArray]);

  return (
    <div>
      <ul>
        {tracksArray.map((item, index) => {
          return (
            <li key={item.title + index}>
              <Track
                trackProgress={props.trackProgress}
                onChange={handleChange}
                onMouseDown={handleDown}
                track={item}></Track>
            </li>
          );
        })}
      </ul>

      <div className='btn-container'>
        <button
          className='btn-add-track'
          onClick={() => {
            addTrack();
          }}>
          +
        </button>
      </div>
    </div>
  );
}
