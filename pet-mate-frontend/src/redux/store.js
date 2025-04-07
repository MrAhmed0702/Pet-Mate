import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import petReducer from "./slices/petSlice";
import adoptionReducer from "./slices/adoptionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petReducer,
    adoptions: adoptionReducer,
  },
});

export default store;