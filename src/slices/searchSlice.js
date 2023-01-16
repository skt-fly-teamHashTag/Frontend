import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: { inputText: "" },
  reducers: {
    setSearch(state, action) {
      state.inputText = action.payload.inputText;
    }
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;