import { createSlice } from "@reduxjs/toolkit";

let initialValue = {
  userData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    handleAuthLogin: () => {},
    handleAuthLogout: () => {
      localStorage.clear();
      return initialValue;
    },
  },
});

export const { handleAuthLogout } = authSlice.actions;
export default authSlice;
