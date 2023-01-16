import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import videoSlice from "./slices/videoSlice";
import searchSlice from "./slices/searchSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    video: videoSlice,
    search: searchSlice
  },
});