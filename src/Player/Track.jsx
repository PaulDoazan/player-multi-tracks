import React from "react";

export default function Track(props) {
  // Destructure for conciseness
  //const { title, artist, color, image, audioSrc } = props.track;
  const handleChange = (event) => {
    //console.log(event.target.value);
    props.onchange(event.target.value);
  };

  return (
    <div>
      <input
        type='range'
        value={props.trackProgress}
        step='1'
        min='0'
        max={props.duration ? props.duration : `${props.duration}`}
        className='progress'
        onChange={handleChange}
        /*onMouseUp={onPressup}
        onKeyUp={onPressup}*/
        style={{ background: props.trackStyling }}
      />
    </div>
  );
}
