import React, { useEffect, useState } from "react";
import Track_level_control from "./Track_level_control";
import { useSelector, useDispatch } from "react-redux";
import { removeTrack } from "../../features/selection/selectionSlice";
import { playPause, selectPlayPause } from "../../features/selection/playPauseSlice";
import {
  updateValue,
  selectProgress
} from "../../features/selection/progressSlice";

export default function Track(props) {
  const dispatch = useDispatch();
  //const progress = useSelector(selectProgress);
  const pp = useSelector(selectPlayPause);

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

  const handleDown = (event) => {
    dispatch(updateValue(event.target.value));
    props.onMouseDown();
  };

  const handleChange = (event) => {
    dispatch(updateValue(event.target.value));
    props.onChange(event);
  };

  const handleDelete = (id) => {
    audio.src = null;
    dispatch(removeTrack(track));
    //props.onDelete(id);
  };

  useEffect(() => {
    setAudio(new Audio(track.preview));
  }, []);

  useEffect(() => {
    if (audio) {
      audio.onloadedmetadata = () => {
        setDuration(30);
      };
    }
  }, [audio]);

  useEffect(() => {
    setDisplayDuration(duration ? `inline-block` : `none`);
    setDisplayOpacity(1);
    setDisplayWidth("95%");
  }, [duration]);

  useEffect(() => {
    console.log("in track : ", pp.value)
    if (audio) {
      pp.value ? audio.play() : audio.pause();
    }
  }, [pp]);

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
          handleDelete();
        }}>
        <i className='fas fa-minus-circle fa-lg'></i>
      </div>
    </div>
  );
}
