import { createSlice } from "@reduxjs/toolkit";

export const selectionSlice = createSlice({
  name: "selection",
  initialState: [],
  reducers: {
    addTrack: (state, action) => {
      state.push(action.payload);
    },
    removeTrack: (state, action) => {
      const index = state.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (index > -1) {
        state.splice(index, 1);
      }
    }
  }
});

export const { addTrack, removeTrack } = selectionSlice.actions;
export const selectTracks = (state) => state.selection;

export default selectionSlice.reducer;
