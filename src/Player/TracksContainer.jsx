import React, { useState, useEffect } from "react";
import Track from "./Track";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let trackId = 0;

export default function TracksContainer(props) {
  const [tracksArray, setTracksArray] = useState([]);

  const handleChange = (event) => {
    props.onchange(event);
  };

  const handleDown = () => {
    props.onTrackDown();
  };

  const handleDelete = (id) => {
    const arr = tracksArray.filter((el) => id !== el.trackId);
    setTracksArray(arr);
  };

  const addTrack = () => {
    const newTrack = props.tracks[getRandomInt(0, props.tracks.length)];

    let copiedTrack = Object.assign({}, newTrack);
    copiedTrack.trackId = trackId;

    trackId++;
    setTracksArray((oldArray) => [...oldArray, copiedTrack]);
  };

  useEffect(() => {
    props.updateTrack(tracksArray);
    props.onTrackDown();
  }, [tracksArray]);

  return (
    <div>
      <ul>
        {tracksArray.map((item, index) => {
          return (
            <li key={item.trackId}>
              <Track
                trackProgress={props.trackProgress}
                onChange={handleChange}
                onMouseDown={handleDown}
                onDelete={(id) => {
                  handleDelete(id);
                }}
                track={item}
                audio={props.audios[index]}></Track>
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
          <i className='fas fa-plus-circle fa-2x'></i>
        </button>
      </div>
    </div>
  );
}
