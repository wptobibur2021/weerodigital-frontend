import { createSlice } from "@reduxjs/toolkit";
import {successMessage} from "../../utility/notification/useNotification"

const initialState = {
  accessToken: "",
  dealer: {},
  isDealer: false,
};

const dealerAuth = createSlice({
  name: "dealerAuth",
  initialState,
  reducers: {
    dealerLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.dealer = action.payload.dealer;
      state.isDealer = true;
    },
    dealerLoggedOut: (state) => {
      state.accessToken = false;
      state.dealer = false;
      state.isDealer = false;
      successMessage("Logout Successfull");
    },
  },
});

export const { dealerLoggedIn, dealerLoggedOut } = dealerAuth.actions;
export default dealerAuth.reducer;