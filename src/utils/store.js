import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../utils/appSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search:searchSlice,
    chat:chatSlice
  },
});

export default store;
