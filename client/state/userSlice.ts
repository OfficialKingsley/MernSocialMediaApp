import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      (state.user = null), (state.token = null);
    },
    setFriends: () => {},
  },
});

export const { setMode, setUser, setLogout } = userSlice.actions;
export default userSlice.reducer;
