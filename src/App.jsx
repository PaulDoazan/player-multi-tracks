import React from "react";
import AudioPlayer from "./app/Player/AudioPlayer";
import tracks from "./tracks";
import SearchTracks from "./app/Menu/SearchTracks";
import store from "./app/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <div className='app-container'>
      <Provider store={store}>
        <SearchTracks />
        <AudioPlayer tracks={tracks} />
      </Provider>
    </div>
  );
}
