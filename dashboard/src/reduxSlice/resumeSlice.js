import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5005/resume";

const initialState = {
    resumeData: null,
    status: 'idle',
    error: null,
};

//==============================< UPLOAD RESUME >========================================//
export const uploadResume = createAsyncThunk(
    'resume/uploadResume',
    async (data, { rejectWithValue }) => {
        try {
            // Retrieve the token from localStorage
            const storedUserInfo = localStorage.getItem('infoData');
            const token = storedUserInfo ? JSON.parse(storedUserInfo)?.data?.accessToken : null;

            if (!token) {
                return rejectWithValue('Authorization token is missing');
            }

            // Set up headers
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };

            // API request to upload resume
            const response = await axios.post(`${API_BASE_URL}/upload`, data, { headers });
            return response.data;
        } catch (error) {
            // Determine error message
            let errorMessage = 'Failed to upload resume';
            if (error.response) {
                errorMessage = error.response.data?.message || error.response.data || errorMessage;
            } else if (error.request) {
                errorMessage = 'No response from server';
            } else {
                errorMessage = error.message || 'Unexpected error occurred';
            }

            // Reject the action with a detailed error message
            return rejectWithValue(errorMessage);
        }
    }
);

//==============================< GET ALL RESUME >========================================//
export const fetchAllResume = createAsyncThunk("resume/fetchAllResume", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-all-resume`);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch resume");
    }
});

//==============================< DELETE RESUME >========================================//

export const deleteResume = createAsyncThunk("resume/deleteResume", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        window.location.reload();
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to remove resume");
    }
});


//==============================< ALL SLICES >========================================//
const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //=================< UPLOAD >=========================//
            .addCase(uploadResume.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadResume.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.resumeData = action.payload;
            })
            .addCase(uploadResume.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            })
            //=================< UPLOAD >=========================//
            .addCase(fetchAllResume.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.resumeData = action.payload;
            })
            .addCase(fetchAllResume.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            });
    },
});

export default resumeSlice.reducer;
