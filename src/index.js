import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import store from './store'
import AudioPlayer from "./Player/AudioPlayer";
import tracks from "./tracks";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AudioPlayer tracks={tracks} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);