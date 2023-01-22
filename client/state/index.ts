import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";

const store = configureStore({
  reducer: {
    userState: userReducer,
    postState: postReducer,
  },
});

export default store;
