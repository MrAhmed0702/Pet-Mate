import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/adoptions";

// Request adoption
export const requestAdoption = createAsyncThunk(
  "adoptions/requestAdoption",
  async ({ petId, token }) => {
    const response = await axios.post(
      API_URL,
      { petId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

const adoptionSlice = createSlice({
  name: "adoptions",
  initialState: { requests: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestAdoption.fulfilled, (state, action) => {
      state.requests.push(action.payload.request);
    });
  },
});

export default adoptionSlice.reducer;
    