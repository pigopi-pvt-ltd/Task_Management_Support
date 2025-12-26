import { configureStore } from "@reduxjs/toolkit";
import chatSupportSlice from "./slices/chatSupportSlice";
import loaderSlice from "./slices/loaderSlice";

export const store = configureStore({
  reducer: {
    chatSupport: chatSupportSlice.reducer,
    loader: loaderSlice.reducer,
  },
});
