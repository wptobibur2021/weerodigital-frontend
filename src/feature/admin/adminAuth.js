import { createSlice } from "@reduxjs/toolkit";
import {successMessage} from "../../utility/notification/useNotification"

const initialState = {
  accessToken: "",
  admin: {},
  isAdmin: false,
};

const adminAuth = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.admin = action.payload.admin;
      state.isAdmin = true;
    },
    adminLoggedOut: (state) => {
      state.accessToken = false;
      state.admin = false;
      state.isAdmin = false;
      successMessage("Logout Successfull");
    },
  },
});

export const { adminLoggedIn, adminLoggedOut } = adminAuth.actions;
export default adminAuth.reducer;