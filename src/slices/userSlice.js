import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    nickName: '',
    phoneNumber: ''
  },
  reducers: {
    setUser(state, action) {
      state.nickName = action.payload.nickName;
      state.phoneNumber = action.payload.phoneNumber;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;