import { createSlice } from "@reduxjs/toolkit";
interface PostType {
  name: null | object | string;
  content: null | string;
  postImage: null;
}
const postState = createSlice({
  name: "postSlice",
  initialState: null,
  reducers: {
    setPosts: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setPosts } = postState.actions;

export default postState.reducer;
