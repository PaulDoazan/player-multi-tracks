import { configureStore } from "@reduxjs/toolkit";
import selectionReducer from "../features/selection/selectionSlice";

export default configureStore({
  reducer: {
    selection: selectionReducer
  }
});
