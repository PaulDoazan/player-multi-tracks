import { createSlice } from "@reduxjs/toolkit";

export const progressSlice = createSlice({
  name: "progress",
  initialState: { value: 0 },
  reducers: {
    updateValue: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { updateValue } = progressSlice.actions;
export const selectProgress = (state) => state.progress;

export default progressSlice.reducer;
