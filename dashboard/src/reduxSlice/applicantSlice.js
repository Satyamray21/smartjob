import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5005/applicants";

// Async thunk to handle the create application request
export const createApplication = createAsyncThunk(
    'applicant/createApplication',
    async (data, { rejectWithValue }) => {
        const storedUserInfo = localStorage.getItem('infoData');
        const token = storedUserInfo ? JSON.parse(storedUserInfo)?.data?.accessToken : null;
        console.log("applicant token here", token)
        if (!token) {
            return rejectWithValue('Authorization token is missing');
        }
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        try {
            const response = await axios.post(`${API_BASE_URL}/create`, data, { headers });
            console.log("Applicant response data", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchApplicationsAll = createAsyncThunk(
    'applications/fetchApplicationsAll',
    async (_, { rejectWithValue }) => {
        // console.log("finded userId by applicants", userId)
        try {
            const response = await axios.get(`${API_BASE_URL}/get-all-applications`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// Async thunk for fetching applications by userId
export const fetchApplicationsByUserId = createAsyncThunk(
    'applications/fetchApplicationsByUserId',
    async (userId, { rejectWithValue }) => {
        console.log("finded userId by applicants", userId)
        try {
            const response = await axios.get(`${API_BASE_URL}/${userId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const applicantSlice = createSlice({
    name: 'applicant',
    initialState: {
        applications: null,
        loading: false,
        error: null,
        successMessage: null
    },
    reducers: {
        clearState: (state) => {
            state.applications = null;
            state.loading = false;
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
                state.successMessage = action.payload.message;
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchApplicationsByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplicationsByUserId.fulfilled, (state, action) => {
                state.applications = action.payload;
                state.loading = false;
            })
            .addCase(fetchApplicationsByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchApplicationsAll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplicationsAll.fulfilled, (state, action) => {
                state.applications = action.payload;
                state.loading = false;
            })
            .addCase(fetchApplicationsAll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    }
});

export const { clearState } = applicantSlice.actions;
export default applicantSlice.reducer;
