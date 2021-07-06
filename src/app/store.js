import { configureStore } from "@reduxjs/toolkit";
import selectionReducer from "../features/selection/selectionSlice";
import progressReducer from "../features/selection/progressSlice";

export default configureStore({
  reducer: {
    selection: selectionReducer,
    progress: progressReducer
  }
});
