import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: {
    likeLists: [],
    hot: [],
    recent: []
  },
  reducers: {
    setLikeLists(state, action) {
      state.likeLists = action.payload;
    },
    subLikeLists(state, action) {
      state.likeLists = [...state.likeLists.filter((videoId)=>videoId !== action.payload)];
    },
    addLikeLists(state, action) {
      state.likeLists = [...state.likeLists, action.payload];
    },
    setHotData(state, action) {
      state.hot = action.payload;
    },
    setRecentData(state, action) {
      state.recent = action.payload;
    },
  },
});

export const { 
  setLikeLists,
  subLikeLists, 
  addLikeLists,
  setHotData, 
  setRecentData,
} = feedSlice.actions;
export default feedSlice.reducer;