import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import videoSlice from "./slices/videoSlice";
import searchSlice from "./slices/searchSlice";
import summarySlice from "./slices/summarySlice";
import feedSlice from "./slices/feedSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    video: videoSlice,
    search: searchSlice,
    summary: summarySlice,
    feed: feedSlice
  },
});