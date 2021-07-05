import React, { useEffect, useState } from "react";
import Track_level_control from "./Track_level_control";
import { useDispatch } from "react-redux";
import { removeTrack } from "../../features/selection/selectionSlice";

export default function Track(props) {
  const dispatch = useDispatch();

  const track = props.track;

  // Refs
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState(null);
  const [displayDescription, setDisplayDuration] = useState(`none`);
  const [displayWidth, setDisplayWidth] = useState(`0%`);
  const [displayOpacity, setDisplayOpacity] = useState(`0`);

  const currentPercentage = duration
    ? `${ (props.trackProgress / duration) * 100 }%`
    : "0%";
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${ currentPercentage }, #fff), color-stop(${ currentPercentage }, #777))
`;

  const handleDown = () => {
    props.onMouseDown();
  };

  const handleChange = (event) => {
    props.onChange(event);
  };

  const handleDelete = (id) => {
    props.onDelete(id);
  };



  useEffect(() => {
    setAudio(new Audio(track.preview));
  }, []);

  useEffect(() => {
    if (audio) {
      audio.onloadedmetadata = () => {
        setDuration(30);
      };
      audio.play();
    }
  }, [audio]);

  useEffect(() => {
    setDisplayDuration(duration ? `inline-block` : `none`);
    setDisplayOpacity(1);
    setDisplayWidth("95%");
  }, [duration]);

  return (
    <div className='input-container' style={{ opacity: displayOpacity }}>
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
        style={{
          background: trackStyling,
          display: displayDescription,
          width: displayWidth
        }}
      />
      <Track_level_control audio={audio} />
      <div
        className='trash'
        onClick={() => {
          audio.pause();
          dispatch(removeTrack(track));
        }}>
        <i className='fas fa-minus-circle fa-lg'></i>
      </div>
    </div>
  );
}
