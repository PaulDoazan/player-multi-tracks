import React, { useState, useEffect, useRef } from "react";
import "../styles.css";
import AudioControls from "./AudioControls";
import TracksContainer from "./TracksContainer";
import Backdrop from "../Backdrop";

const AudioPlayer = ({ tracks }) => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructure for conciseness
  const track0 = tracks[0];
  const track1 = tracks[1];

  const audioRef0 = useRef(new Audio(track0.audioSrc));
  const audioRef1 = useRef(new Audio(track1.audioSrc));
  const intervalRef = useRef();

  const startTimer = (audioRef) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setIsPlaying(false);
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onPressmove = (value, audioRef) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onPressup = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer(audioRef0);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef0.current.play();
      audioRef1.current.play();
      startTimer(audioRef0);
    } else {
      audioRef0.current.pause();
      audioRef1.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef0.current.pause();
      audioRef1.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className='audio-player'>
      <div className='track-info'>
        <img
          className='artwork'
          src={track0.image}
          alt={`track artwork for ${track0.title} by ${track0.artist}`}
        />
        <h2 className='title'>{track0.title}</h2>
        <h3 className='artist'>{track0.artist}</h3>
        <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
        <TracksContainer
          trackProgress={trackProgress}
          tracks={tracks}
          onchange={(value, audioRef) => {
            onPressmove(value, audioRef);
          }}></TracksContainer>
      </div>
      <Backdrop
        trackIndex={trackIndex}
        activeColor={track0.color}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default AudioPlayer;
