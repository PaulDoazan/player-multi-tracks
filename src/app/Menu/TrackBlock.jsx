import React from "react";
import { useDispatch } from "react-redux";
import { addTrack } from "../../features/selection/selectionSlice";

export default function TrackBlock(props) {
  console.log(props.data);
  const dispatch = useDispatch();
  return (
    <div className='trackBlock'>
      <div className='infos'>
        <img src={props.data.album.cover_small} alt='' />
        <div className='infos-text'>
          <div className='info-title'>{props.data.title}</div>
          <div className='info-artist-name'>{props.data.artist.name}</div>
        </div>
      </div>
      <div className='trackBlock-buttons'>
        <div
          className='trash'
          onClick={() => {
            dispatch(addTrack(props.data));
          }}>
          <i className='fas fa-plus-circle fa-lg'></i>
        </div>
      </div>
    </div>
  );
}
