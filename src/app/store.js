import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import apiSlice from "../feature/api/apiSlice";
import dealerAuth from "../feature/delears/dealerAuth";
import adminAuth from "../feature/admin/adminAuth";
const persistConfig = {
    key: "proItem",
    version: 1,
    storage,
  };

  const reducers = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    dealerAuth,
    adminAuth
  });

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  // devTools: true,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export default store;