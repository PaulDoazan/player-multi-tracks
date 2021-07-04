import React from "react";
import AudioPlayer from "./app/Player/AudioPlayer";
import tracks from "./tracks";
import FetchButton from "./app/Menu/FetchButton";
import store from "./app/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <FetchButton />
        <AudioPlayer tracks={tracks} />
      </Provider>
    </div>
  );
}
