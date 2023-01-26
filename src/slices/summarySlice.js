import { createSlice } from "@reduxjs/toolkit";

export const summarySlice = createSlice({
  name: "summary",
  initialState: {summary: false},
  reducers: {
    setSummary(state, action) {
      state.summary = action.payload.summary;
    }
  },
});

export const { setSummary } = summarySlice.actions;
export default summarySlice.reducer;