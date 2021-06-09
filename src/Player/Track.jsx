import React, { useRef } from "react";

export default function Track(props) {
  // Destructure for conciseness
  const { title, artist, color, image, audioSrc } = props.track;

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(props.trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;

  const handleDown = () => {
    props.onMouseDown();
  };

  /*const handleUp = (event) => {
    props.onChange(event.target.value);
  };*/

  const handleChange = (event) => {
    props.onChange(event);
  };

  return (
    <div>
      <input
        type='range'
        value={props.trackProgress}
        step='1'
        min='0'
        max={duration ? duration : `${duration}`}
        className='progress'
        onChange={handleChange}
        onMouseDown={handleDown}
        onMouseUp={handleChange}
        /*onKeyUp={onPressup}*/
        style={{ background: trackStyling }}
      />
    </div>
  );
}
