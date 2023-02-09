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
    setFeedData(state, action) {
      state.hot = action.payload.hot;
      state.recent = action.payload.recent;
    },
    addLikeCount(state, action) {
      // action.payload: video ID
      let idxHot = -1;
      let idxRecent = -1;

      state.hot.map((item, idx) => {if(item._id === action.payload) idxHot = idx});
      state.recent.map((item, idx) => {if(item._id === action.payload) idxRecent = idx});

      if(idxHot > -1) state.hot[idxHot].likeCount += 1;
      if(idxRecent > -1) state.recent[idxRecent].likeCount += 1;
    },
    subLikeCount(state, action) {
      let idxHot = -1;
      let idxRecent = -1;

      state.hot.map((item, idx) => {if(item._id === action.payload) idxHot = idx});
      state.recent.map((item, idx) => {if(item._id === action.payload) idxRecent = idx});

      if(idxHot > -1) state.hot[idxHot].likeCount -= 1;
      if(idxRecent > -1) state.recent[idxRecent].likeCount -= 1;
    }
  },
});

export const { 
  setLikeLists,
  subLikeLists, 
  addLikeLists,
  setHotData, 
  setRecentData,
  setFeedData,
  addLikeCount,
  subLikeCount
} = feedSlice.actions;
export default feedSlice.reducer;