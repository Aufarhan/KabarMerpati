import { configureStore } from "@reduxjs/toolkit";
import savedReducer from "./slices/savedSlice";

export const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
});
