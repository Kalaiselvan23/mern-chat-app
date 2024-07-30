import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
