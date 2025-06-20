import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://smartjob-api.onrender.com/employee";

const initialState = {
    employees: null,
    isAuthenticated: false,
    loading: false,
    status: 'idle',
    error: null
};

// ====================< REGISTER CANDIDATE >======================//
export const uploadEmployee = createAsyncThunk('candidate/upload', async (data, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        const response = await axios.post(`${API_BASE_URL}/upload`, data, { config });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to create candidate");
    }
});

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ====================< REGISTER CASES >======================//
            .addCase(uploadEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(uploadEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create candidate";
            });
    }
});

export const { logout } = employeeSlice.actions;
export default employeeSlice.reducer;
