import React from "react";
import Track from "./Track";
import { useSelector } from "react-redux";
import { selectTracks } from "../../features/selection/selectionSlice";

export default function TracksContainer() {
  const selection = useSelector(selectTracks);

  return (
    <div>
      <ul>
        {selection.tracks
          ? selection.tracks.map((item) => {
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
