import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: '',
    nickName: '',
    phoneNumber: ''
  },
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId,
      state.nickName = action.payload.nickName;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setUserId(state, action) {
      state.userId = action.payload
    }
  },
});

export const { setUser, setUserId } = userSlice.actions;
export default userSlice.reducer;