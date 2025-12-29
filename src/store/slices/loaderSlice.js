import { createSlice } from "@reduxjs/toolkit";

let initialValue = {
  open: false,
};
const loaderSlice = createSlice({
  name: "loader",
  initialState: initialValue,
  reducers: {
    setLoader: (state, action) => {
      state.open = action.payload.loading;
    },
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice;
