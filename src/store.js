import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import videoSlice from "./slices/videoSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    video: videoSlice
  },
});