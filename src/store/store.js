import { configureStore } from "@reduxjs/toolkit";
import chatSupportSlice from "./slices/chatSupportSlice";

export const store = configureStore({
  reducer: {
    chatSupport: chatSupportSlice.reducer,
  },
});
