import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import customizeReducer from "./slice/CustomizeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customize: customizeReducer,
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
