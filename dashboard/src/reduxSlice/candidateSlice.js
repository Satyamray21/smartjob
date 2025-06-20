import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5005/candidate";

const initialState = {
    candidate: null,
    loading: false,
    status: 'idle',
    error: null
};

// ====================< FETCH CANDIDATE PROFILE >======================//
export const fetchAllCandidate = createAsyncThunk(
    'candidate/all-candidate',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-all-candidate`);
            console.log("Candidate Data", response?.data);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch candidate");
        }
    }
);

const candidateSlice = createSlice({
    name: 'candidate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ====================< PROFILE CASES >======================//
            .addCase(fetchAllCandidate.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchAllCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidate = action.payload;
            })
            .addCase(fetchAllCandidate.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { logout } = candidateSlice.actions;
export default candidateSlice.reducer;
