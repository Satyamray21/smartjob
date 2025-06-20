import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5005/admin';  // Replace with your backend API base URL

export const makeAnViewId = createAsyncThunk('makeAnViewId', async (id, { rejectWithValue }) => {
    console.log("admin view id", id)
    return id;
});
//==============================< MAKE UPDATE ADMIN ID >========================================//
export const makeAnUpdateId = createAsyncThunk('makeAnUpdateId', async (id, { rejectWithValue }) => {
    console.log("admin update id", id)
    return id;
});
// Create Admin
export const createAdmin = createAsyncThunk(
    'admin/createAdmin',
    async (adminData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/admin/create`, adminData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Login Admin
export const adminLogin = createAsyncThunk(
    'admin/adminLogin',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/admin/login`, credentials);
            localStorage.setItem('token', response.data.data.accessToken); // Store token
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Fetch Admin Profile
export const adminProfile = createAsyncThunk(
    'admin/adminProfile',
    async (_, { rejectWithValue }) => {
        const accessToken = JSON.parse(localStorage.getItem('userInfo')) || {};
        const token = accessToken?.data?.accessToken;
        console.log("acccess token finded here", token)
        if (!token) return rejectWithValue('Token not found');

        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        };
        try {
            const response = await axios.get(`${API_URL}/admin/profile`, headers);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update Admin Profile
export const updatedProfile = createAsyncThunk(
    'admin/updatedProfile',
    async (data, { rejectWithValue }) => {
        const accessToken = JSON.parse(localStorage.getItem('userInfo')) || {};
        const token = accessToken?.data?.accessToken;
        console.log("acccess token finded here", token)
        if (!token) return rejectWithValue('Token not found');

        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        };
        try {
            const response = await axios.put(`${API_URL}/admin/profile`, data, headers);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Get JDs by Admin
export const getJdByAdmin = createAsyncThunk(
    'admin/getJdByAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_URL}/admin/jobs`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Get Recruiters by Admin
export const getRecruitersByAdmin = createAsyncThunk(
    'admin/getRecruitersByAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${API_URL}/admin/recruiters`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//==============================< ACTIVE admin >========================================//
export const getAllActiveStatus = createAsyncThunk(
    'getAllActiveStatus',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const userInfo = state?.localStorage?.getItem('infoData');
            if (!userInfo) {
                return rejectWithValue('User info data not found in localStorage');
            }
            const parseduserInfo = JSON.parse(userInfo);
            const token = parseduserInfo?.data?.accessToken;

            if (!token) {
                return rejectWithValue('Token not found');
            }

            const headers = {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`${API_BASE_URLA}/get-all-data`, { headers });
            return response.data;
        } catch (error) {
            let errorMessage = 'An error occurred while fetching active status';
            if (error.response && error.response.data) {
                errorMessage = error.response.data;
            } else if (error.message) {
                errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
    }
);

//==============================< admin Slice >========================================//
export const sendJdEmail = createAsyncThunk(
    'sendJdEmail',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URLA}/send-email`, data);
            return response.data;
        } catch (error) {
            const message = error.response?.data || "Failed to send email";
            return rejectWithValue(message);
        }
    }
);
//==============================< Send js multiple email >========================================//
export const sendMultipleEmails = createAsyncThunk(
    'email/sendMultipleEmails',
    async ({ emails, text }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URLA}/send-jd-emails`, { emails, text });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
//==============================< INACTIVE admin >========================================//
export const inActiveStatus = createAsyncThunk('admin/inActiveStatus', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_BASE_URLA}/inactive-admin`, { id });
        return res.data;
    } catch (error) {
        console.error('Error in InactiveStatus thunk:', error);

        return rejectWithValue(error.response.data);
    }
});

// Initial state
const initialState = {
    admin: null,
    isAuthenticated: false,
    sendEmail: null,
    loading: false,
    activeRct: null,
    inactiveAlert: null,
    error: null,
    status: 'edle',
    makeUpdateById: null,
    makeVieById: null,
};

// Admin Slice
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminLogout: (state) => {
            localStorage.removeItem('userInfo');
            state.admin = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        // Create Admin
        builder.addCase(createAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.admin = action.payload.data;
            state.error = null;
        });
        builder.addCase(createAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        // Login Admin
        builder.addCase(adminLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.admin = action.payload.data.details;
            state.error = null;
        });
        builder.addCase(adminLogin.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload.message;
        });

        // Fetch Admin Profile
        builder.addCase(adminProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(adminProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.admin = action.payload.data;
            state.error = null;
        });
        builder.addCase(adminProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        // Update Admin Profile
        builder.addCase(updatedProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updatedProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.admin = action.payload.data;
            state.error = null;
        });
        builder.addCase(updatedProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        // Get JDs by Admin
        builder.addCase(getJdByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getJdByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = action.payload.data;
            state.error = null;
        });
        builder.addCase(getJdByAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        // Get Recruiters by Admin
        builder.addCase(getRecruitersByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRecruitersByAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.recruiters = action.payload.recruiters;
            state.error = null;
        });
        builder.addCase(getRecruitersByAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        // Logout Admin
        builder.addCase(logoutAdmin.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.admin = null;
            state.error = null;
        });
        //=============< ACTIVE ALL >===================//
        builder
            .addCase(sendJdEmail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendJdEmail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sendEmail = action.payload;
            })
            .addCase(sendJdEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
        //=============< ACTIVE ALL >===================//
        builder
            .addCase(getAllActiveStatus.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllActiveStatus.fulfilled, (state, action) => {
                state.loading = false
                state.activeRct = action.payload
            })
            .addCase(getAllActiveStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.activeRct = null
            })
        //=============< INACTIVE ALL >===================//
        builder
            .addCase(inActiveStatus.pending, (state) => {
                state.loading = true
            })
            .addCase(inActiveStatus.fulfilled, (state, action) => {
                state.loading = false
                state.inactiveAlert = action.payload.message
            })
            .addCase(inActiveStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
        //=============< Send Jd Multile Email >===================//
        builder
            .addCase(sendMultipleEmails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMultipleEmails.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(sendMultipleEmails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
        //================= < MAKE JD UPDATE ID > =========================//
        builder
            .addCase(makeAnUpdateId.fulfilled, (state, action) => {
                state.makeUpdateById = action.payload
            })
            .addCase(makeAnUpdateId.rejected, (state, action) => {
                state.makeUpdateById = null;
                state.error = action.error.message || 'Failed to update job!';
            })
            //================= < MAKE VIEW JD ID > =========================//
            .addCase(makeAnViewId.fulfilled, (state, action) => {
                state.makeVieById = action.payload
            })
            .addCase(makeAnViewId.rejected, (state, action) => {
                state.makeVieById = null;
                state.error = action.error.message || 'Failed to View User!';
            })
    },
});

export default adminSlice.reducer;
