import React from "react";

export default function Track_level_control() {
  const handleChange = () => {};
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
