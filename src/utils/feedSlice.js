import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: 'feed',
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      console.log("addFeed -", action.payload);
      // Replace the current state with the new feed array
      return Array.isArray(action.payload) ? action.payload : [];
    },
    removeFeed: (state, action) => {
      const userId = action.payload;
      return state.filter(user => user._id !== userId);
    }
  }
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;