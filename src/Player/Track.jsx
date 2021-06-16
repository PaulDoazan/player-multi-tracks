import React, { useRef, useEffect, useState } from "react";
import Track_level_control from "./Track_level_control";
export default function Track(props) {
  // Destructure for conciseness
  const { title, artist, color, image, audioSrc } = props.track;

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const [duration, setDuration] = useState(audioRef.current.duration);

  audioRef.current.onloadedmetadata = () => {
    setDuration(audioRef.current.duration);
  };

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

  /*const handleUp = (event) => {
    props.onChange(event.target.value);
  };*/

  const handleChange = (event) => {
    props.onChange(event);
  };

  const handleVolume = (value) => {
    props.handleVolume(audioRef.current, value / 100);
  };

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
      <Track_level_control
        changeVolume={(value) => { handleVolume(value) }}
      />
    </div>
  );
}
