import React, { useState, useEffect, useRef } from "react";
import "../styles.css";
import AudioControls from "./AudioControls";
import TracksContainer from "./TracksContainer";
import Backdrop from "../Backdrop";

const AudioPlayer = ({ tracks }) => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [tracksArray, setTracksArray] = useState([]);
  const [audioArray, setAudioTracks] = useState([]);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructure for conciseness
  const track0 = tracks[0];

  const intervalRef = useRef();

  const startTimer = (audio) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audio.ended) {
        setIsPlaying(false);
      } else {
        setTrackProgress(audio.currentTime);
      }
    }, [1000]);
  };

  const onDown = () => {
    audioArray.map((item) => {
      item.pause();
    });
    setIsPlaying(false);
  };

  const onPressmove = (value, audioRef) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    //audioRef.current.currentTime = value;
    audioArray.map((item) => {
      item.currentTime = value;
    });
    setTrackProgress(value);
  };

  const onPressup = () => {
    // If not already playing, start
    /*if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer(audioRef0);*/
  };

  const updateTrack = (tracks) => {
    setTracksArray(tracks);
  };

  useEffect(() => {
    setAudioTracks([]);
    tracksArray.map((item) => {
      setAudioTracks((oldArray) => [...oldArray, new Audio(item.audioSrc)]);
    });
  }, [tracksArray]);

  useEffect(() => {}, [audioArray]);

  useEffect(() => {
    if (isPlaying) {
      audioArray.map((item) => {
        item.play();
      });
      if (audioArray[0]) startTimer(audioArray[0]);
    } else {
      audioArray.map((item) => {
        item.pause();
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
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
          addTrack={(tracks) => {
            updateTrack(tracks);
          }}
          onTrackDown={onDown}
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
