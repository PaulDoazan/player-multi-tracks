import React, { useRef, useEffect, useState } from "react";
import Track_level_control from "./Track_level_control";

export default function Track(props) {
  // Destructure for conciseness
  const audio = props.audio;
  const trackId = props.track.trackId;

  // Refs
  const [duration, setDuration] = useState(0);

  const currentPercentage = duration
    ? `${ (props.trackProgress / duration) * 100 }%`
    : "0%";
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${ currentPercentage }, #fff), color-stop(${ currentPercentage }, #777))
`;

  const [displayDescription, setDisplayDescription] = useState(`none`);

  const handleDown = () => {
    props.onMouseDown();
  };

  const handleChange = (event) => {
    props.onChange(event);
  };

  const handleDelete = (id) => {
    props.onDelete(id);
  }

  useEffect(() => {
    if (audio) {
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
    }
  }, [audio]);

  useEffect(() => {
    setDisplayDescription(duration ? `inline-block` : `none`);
  }, [duration]);

  return (
    <div className='input-container'>
      <input
        type='range'
        value={props.trackProgress}
        step='1'
        min='0'
        max={duration ? duration : `${ duration }`}
        className='input-progress'
        onChange={handleChange}
        onMouseDown={handleDown}
        onMouseUp={handleChange}
        /*onKeyUp={onPressup}*/
        style={{
          background: trackStyling,
          display: displayDescription
        }}
      />
      <Track_level_control audio={audio} />
      <div className='trash' onClick={() => { handleDelete(trackId) }}>
        <i className="fas fa-minus-circle fa-lg"></i>
      </div>
    </div>
  );
}
