// src/reduxSlice/candidateSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IMG_BASE_URL } from '../utils/Constant';

// Upload Candidate with resume and profile photo
export const uploadCandidate = createAsyncThunk(
    'candidate/uploadCandidate',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${IMG_BASE_URL}/register`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: error?.response?.data?.message || 'Something went wrong',
            });
        }
    }
);

// Login Candidate
export const candidateLogin = createAsyncThunk(
    'candidate/loginCandidate',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${IMG_BASE_URL}/login`, credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: error?.response?.data?.message || 'Login failed',
            });
        }
    }
);

// Add this asyncThunk
export const updateCandidate = createAsyncThunk(
    'candidate/updateCandidate',
    async ({ candidateId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${IMG_BASE_URL}/update/${candidateId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data.user;
        } catch (error) {
            return rejectWithValue({
                message: error?.response?.data?.message || 'Update failed',
            });
        }
    }
);

// Get Candidate by ID
export const getCandidateById = createAsyncThunk(
    'candidate/getCandidateById',
    async (candidateId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${IMG_BASE_URL}/view/${candidateId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: error?.response?.data?.message || 'Fetch candidate failed',
            });
        }
    }
);

// Change Password for Candidate
export const changeCandidatePassword = createAsyncThunk(
    'candidate/changeCandidatePassword',
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${IMG_BASE_URL}/change-password`,
                { oldPassword, newPassword },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            return response.data.message;
        } catch (error) {
            return rejectWithValue({
                message: error?.response?.data?.message || 'Password change failed',
            });
        }
    }
);

// Send OTP to Candidate's Email
export const sendCandidateResetOtp = createAsyncThunk(
    'candidate/sendResetOtp',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${IMG_BASE_URL}/send-reset-code`, { email });
            return response.data.message;
        } catch (error) {
            return rejectWithValue({
                message: error?.response?.data?.message || 'Failed to send OTP',
            });
        }
    }
);

// Reset Password with OTP
export const resetCandidatePassword = createAsyncThunk(
    'candidate/resetPassword',
    async ({ email, otp, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${IMG_BASE_URL}/reset-password`, {
                email,
                otp,
                newPassword
            });
            return response.data.message;
        } catch (error) {
            return rejectWithValue({
                message: error?.response?.data?.message || 'Password reset failed',
            });
        }
    }
);


const candidateSlice = createSlice({
    name: 'candidate',
    initialState: {
        loading: false,
        error: null,
        success: false,
        candidateData: null,
        isLoggedIn: false,
        loginData: null,
        viewedCandidate: null,
        otpSent: false,
        otpSuccessMessage: '',
        passwordResetSuccess: false,
    },
    reducers: {
        clearCandidateStatus: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.isLoggedIn = false;
            state.loginData = null;
        },
        logoutCandidate: (state) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.loginData = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        candidateLoginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.loginData = action.payload;
        },
        clearOtpStatus: (state) => {
            state.otpSent = false;
            state.otpSuccessMessage = '';
            state.passwordResetSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(uploadCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.candidateData = action.payload?.user || null;
            })
            .addCase(uploadCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // ✅ Login Candidate
            .addCase(candidateLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(candidateLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.loginData = action.payload;
                localStorage.setItem('token', action.payload?.token);
                localStorage.setItem('user', JSON.stringify(action.payload?.user));
            })
            .addCase(candidateLogin.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload.message;
            })
            // 👇 Add this to handle update
            .addCase(updateCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.loginData.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(updateCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getCandidateById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCandidateById.fulfilled, (state, action) => {
                state.loading = false;
                state.viewedCandidate = action.payload;
            })
            .addCase(getCandidateById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(changeCandidatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(changeCandidatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(changeCandidatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Send OTP
            .addCase(sendCandidateResetOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.otpSent = false;
            })
            .addCase(sendCandidateResetOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSent = true;
                state.otpSuccessMessage = action.payload;
            })
            .addCase(sendCandidateResetOtp.rejected, (state, action) => {
                state.loading = false;
                state.otpSent = false;
                state.error = action.payload.message;
            })

            // Reset Password
            .addCase(resetCandidatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.passwordResetSuccess = false;
            })
            .addCase(resetCandidatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.passwordResetSuccess = true;
            })
            .addCase(resetCandidatePassword.rejected, (state, action) => {
                state.loading = false;
                state.passwordResetSuccess = false;
                state.error = action.payload.message;
            });
    }
});

export const { clearCandidateStatus, logoutCandidate, candidateLoginSuccess, clearOtpStatus } = candidateSlice.actions;
export default candidateSlice.reducer;

