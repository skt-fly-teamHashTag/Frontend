import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: { title: '' },
  reducers: {
    setTitle(state, action) {
      state.title = action.payload.title;
    }
  },
});

export const { setTitle } = videoSlice.actions;
export default videoSlice.reducer;