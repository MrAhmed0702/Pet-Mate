import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Login
export const loginUser = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Register
export const registerUser = createAsyncThunk("auth/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch(logout());
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.user.id,
          name: action.payload.user.name,
          profilePicture: action.payload.user.profilePicture,
          email: action.payload.user.email,
          isAdmin: action.payload.user.isAdmin,
        };        
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;