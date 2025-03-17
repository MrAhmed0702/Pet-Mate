import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/pets";

// Fetch pets
export const fetchPets = createAsyncThunk("pets/fetchPets", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const petSlice = createSlice({
  name: "pets",
  initialState: { pets: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pets = action.payload;
      })
      .addCase(fetchPets.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default petSlice.reducer;
