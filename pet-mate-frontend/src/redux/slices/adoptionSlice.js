import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const requestAdoption = createAsyncThunk("adoptions/request", async ({ petId, token, name, email, phone, reason }) => {
  const res = await axios.post("http://localhost:5000/api/adoptions", { petId, name, email, phone, reason }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data.request;
});

export const fetchAdoptionRequests = createAsyncThunk("adoptions/fetchAll", async (_, { getState }) => {
  const { token } = getState().auth;
  const res = await axios.get("http://localhost:5000/api/adoptions", { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
});

export const updateAdoptionRequest = createAsyncThunk("adoptions/update", async ({ requestId, status, reason }, { getState }) => {
  const { token } = getState().auth;
  const res = await axios.put(`http://localhost:5000/api/adoptions/${requestId}`, { status, reason }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data.request;
});

export const fetchUserAdoptions = createAsyncThunk("adoptions/fetchUser", async (_, { getState }) => {
  const { token } = getState().auth;
  const res = await axios.get("http://localhost:5000/api/adoptions/user", { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
});

const adoptionSlice = createSlice({
  name: "adoptions",
  initialState: { requests: [], history: [], pendingRequests: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(requestAdoption.pending, (state) => { state.status = "loading"; })
      .addCase(requestAdoption.fulfilled, (state) => { state.status = "succeeded"; })
      .addCase(requestAdoption.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; })
      .addCase(fetchAdoptionRequests.pending, (state) => { state.status = "loading"; })
      .addCase(fetchAdoptionRequests.fulfilled, (state, action) => { state.status = "succeeded"; state.requests = action.payload; })
      .addCase(fetchAdoptionRequests.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; })
      .addCase(updateAdoptionRequest.fulfilled, (state, action) => { state.requests = state.requests.map(r => r._id === action.payload._id ? action.payload : r); })
      .addCase(fetchUserAdoptions.fulfilled, (state, action) => { state.pendingRequests = action.payload.pendingRequests; state.history = action.payload.history; });
  },
});

export default adoptionSlice.reducer;