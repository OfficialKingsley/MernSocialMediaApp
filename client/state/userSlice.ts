import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setMode: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      (state.user = null), (state.token = null);
    },
  },
});

export const { setMode, setUser, setLogout } = userSlice.actions;
export default userSlice.reducer;
