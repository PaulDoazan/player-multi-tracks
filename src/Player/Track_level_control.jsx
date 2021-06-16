import React, { useState, useEffect } from "react";

export default function Track_level_control() {
  const [volume, setVolume] = useState(0);

  const className1 = "";

  const handleChange = (event) => {
    setVolume(event.target.value);
  };

  useEffect(() => {
    return () => {};
  }, [volume]);

  return (
    <div className='control-box'>
      <div className='volume-control'>
        <div className='speaker'>
          <i className='fas fa-volume-off fa-2x'></i>
        </div>
        <div className='bars'>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
          <input
            type='range'
            className='level-input'
            min='0'
            max='100'
            step='20'
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
