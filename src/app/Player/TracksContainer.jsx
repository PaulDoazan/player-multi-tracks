import React from "react";
import Track from "./Track";
import { useSelector } from "react-redux";
import { selectTracks } from "../../features/selection/selectionSlice";

export default function TracksContainer() {
  const tracks = useSelector(selectTracks);

  return (
    <div>
      <ul>
        {tracks
          ? tracks.map((item) => {
              return (
                <li key={item.id}>
                  <Track track={item}></Track>
                </li>
              );
            })
          : null}
      </ul>

      <div className='btn-container'>
        <button className='btn-add-track'>
          <i className='fas fa-plus-circle fa-2x'></i>
        </button>
      </div>
    </div>
  );
}
