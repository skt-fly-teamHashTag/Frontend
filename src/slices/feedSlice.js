import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: {
    likeLists: [1, 3, 4, 5],
    hot: [],
    recent: []
  },
  reducers: {
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
  subLikeLists, 
  addLikeLists,
  setHotData, 
  setRecentData,
} = feedSlice.actions;
export default feedSlice.reducer;