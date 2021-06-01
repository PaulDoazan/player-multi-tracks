import React from "react";

export default function Track(trackProgress, duration, trackStyling) {
  return (
    <div>
      <input
        type='range'
        value={trackProgress}
        step='1'
        min='0'
        max={duration ? duration : `${duration}`}
        className='progress'
        /*onChange={(e) => onPressmove(e.target.value)}
        onMouseUp={onPressup}
        onKeyUp={onPressup}*/
        style={{ background: trackStyling }}
      />
    </div>
  );
}
