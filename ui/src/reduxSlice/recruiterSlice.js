import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URLA = "https://smartjob-api.onrender.com/rc1";
const API_BASE_URLB = "https://smartjob-api.onrender.com/jd1";

//==============================< SINGLE RECRUITER >========================================//
export const fetchSingleRecruiter = createAsyncThunk("fetchSingleRecruiter", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URLA}/single-recruiter/${id}`);
        console.log("Fetched single data", response?.data?.response);
        return response?.data?.response;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch single recruiter data");
    }
});

//==============================< SINGLE JD >========================================//
export const fetchSingleJd = createAsyncThunk("fetchSingleJd", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URLB}/get-single-jd/${id}`);
        console.log("Fetched single JD data", response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch single JD data");
    }
});

//==============================< ALL RECRUITER >========================================//
export const fetchAllRecruiter = createAsyncThunk("fetchAllRecruiter", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URLA}/get-single-data`);
        console.log("Recruiter Data", response?.data);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch recruiters");
    }
});

//==============================< LOGIN RECRUITER >========================================//
export const recruiterLogin = createAsyncThunk('recruiterLogin', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_BASE_URLA}/login`, data)
        localStorage.setItem('infoData', res?.data?.data)
        console.log("after fetchingrecruites data ", res?.data?.data?.accessToken)
        return res?.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

//==============================< CREATE RECRUITER >========================================//
export const createRecruiter = createAsyncThunk("createRecruiter", async (data, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };

        const formData = new FormData();
        formData.append('first_name', data.name.first_name);
        formData.append('last_name', data.name.last_name);
        formData.append('district', data.address.district);
        formData.append('local', data.address.local);
        formData.append('pin_code', data.address.pin_code);
        formData.append('state', data.address.state);
        formData.append('confirm_password', data.confirm_password);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('password', data.password);
        formData.append('role', data.role);
        formData.append('profileImage', data.profileImage);
        formData.append('status', data.status);

        const response = await axios.post(`${API_BASE_URLA}/create`, formData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add recruiter");
    }
});

//==============================< OTP VERIFY >========================================//
export const verifyOTP = createAsyncThunk('verifyOTP', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URLA}/verify-otp`, data);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to verify OTP");
    }
});

//==============================< DELETE RECRUITER >========================================//
export const removeRecruiter = createAsyncThunk("removeRecruiter", async (id, { rejectWithValue, getState }) => {
    const recruiterInfo = getState()?.localStorage.getItem('recruiterInfo');
    let token = '';
    if (recruiterInfo) {
        const parsedRecruiterInfo = JSON.parse(recruiterInfo);
        token = parsedRecruiterInfo?.data?.accessToken || 'Token currect';
        console.log("mera token", token);
    }
    if (!token) {
        return rejectWithValue('Token not found');
    }
    const header = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': "multipart/form-data",
        }
    };

    try {
        await axios.delete(`${API_BASE_URLA}/delete/${id}`, header);
        window.location.reload();
        return id;
    } catch (error) {
        return rejectWithValue(error?.response?.data || "Failed to remove recruiter");
    }
});

//==============================< UPDATE WITH TOKEN RECRUITER >========================================//
export const updateRecruiter = createAsyncThunk('updateRecruiter', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_BASE_URLA}/update/${id}`);

        if (response.data && response.data.response) {
            return response.data.response;
        } else {
            return rejectWithValue('Invalid response data');
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

//==============================< PROFILE RECRUITER >========================================//
export const recruiterProfile = createAsyncThunk('recruiterProfile', async (_, { rejectWithValue, getState }) => {
    const recruiterInfo = getState()?.localStorage.getItem('infoData');
    let token = '';
    if (recruiterInfo) {
        const parsedRecruiterInfo = JSON.parse(recruiterInfo);
        token = parsedRecruiterInfo?.data?.accessToken || 'Token currect';
        console.log("mera token", token);
    }
    if (!token) {
        return rejectWithValue('Token not found');
    }

    const header = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const res = await axios.get(`${API_BASE_URLA}/active-recruiter`, header);
        return res.data;
    } catch (err) {
        return rejectWithValue(err?.response?.data);
    }
});

//==============================< PROFILE UPDATE OTP >========================================//
export const updatedRecruiter = createAsyncThunk('updatedRecruiter', async (id, { rejectWithValue, getState, }) => {
    const recruiterInfo = getState()?.localStorage.getItem('infoData');
    let token = '';
    if (recruiterInfo) {
        const parsedRecruiterInfo = JSON.parse(recruiterInfo);
        token = parsedRecruiterInfo?.data?.accessToken || 'Token currect';
        console.log("mera token", token);
    }
    if (!token) {
        return rejectWithValue('Token not found');
    }
    const header = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': "multipart/form-data",
        }
    };

    try {
        const res = await axios.get(`${API_BASE_URLA}/update-recruiter/${id}`, header);
        return res.data;
    } catch (error) {
        console.error('Error in InactiveStatus thunk:', error);

        return rejectWithValue(error?.response?.data);
    }
});

//==============================< ACTIVE RECRUITER >========================================//
export const getAllActiveStatus = createAsyncThunk(
    'getAllActiveStatus',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const recruiterInfo = state?.localStorage?.getItem('infoData');
            if (!recruiterInfo) {
                return rejectWithValue('User info data not found in localStorage');
            }
            const parsedRecruiterInfo = JSON.parse(recruiterInfo);
            const token = parsedRecruiterInfo?.data?.accessToken;

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

//==============================< INACTIVE RECRUITER >========================================//
export const inActiveStatus = createAsyncThunk('inActiveStatus', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_BASE_URLA}/inactive-recruiter`, { id });
        return res.data;
    } catch (error) {
        console.error('Error in InactiveStatus thunk:', error);

        return rejectWithValue(error.response.data);
    }
});

//==============================< EMAIL VERIFY >========================================// 
export const verifyEmail = createAsyncThunk('verifyEamil', async (email, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_BASE_URLA}/otp-to-reset-password`, email);
        return res.data;
    } catch (error) {
        console.error('Error in send thunk:', error);
        return rejectWithValue(error?.response?.data);
    }
});

//==============================< CONFIRM PASSWORD >========================================// 
export const ConfirmPassword = createAsyncThunk('confirmPassword', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_BASE_URLA}/change-password-otp`, data);
        return res.data;
    } catch (err) {
        console.error('Error in InactiveStatus thunk:', err);
        return rejectWithValue(err?.response?.data);
    }
});

//==============================< Recruiter Slice >========================================//
const initialState = {
    loading: false,
    infoData: null,
    recruiterDetails: [],
    status: null,
    error: null,
    response: "",
    activeAlert: null,
    inactiveAlert: null,
    emailPassChange: null,
    confirmPassOtp: null,
    getSingleJD: null,
    getSingleRc1: null,
    logoutloading: false,

};

const recruiterSlice = createSlice({
    name: "recruiterSlice",
    initialState,
    reducers: {
        setUserData(state) {
            const users = JSON.parse(localStorage.getItem('infoData'))
            state.infoData = users
        },

        userLogout(state) {
            localStorage.clear();
            state.logoutloading = true
            console.log('Recuiter Logout Successfull!!!')
        }
    },
    extraReducers: (builder) => {
        builder
            //============= < GET ALL >===================//
            .addCase(fetchAllRecruiter.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchAllRecruiter.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiterDetails = action.payload;
            })
            .addCase(fetchAllRecruiter.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload;
            })
            //============= < GET SINGLE JD >===================//
            .addCase(fetchSingleRecruiter.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchSingleRecruiter.fulfilled, (state, action) => {
                state.loading = false;
                state.getSingleRc1 = action.payload;
            })
            .addCase(fetchSingleRecruiter.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload;
            })
            //============= < GET SINGLE JD >===================//
            .addCase(fetchSingleJd.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchSingleJd.fulfilled, (state, action) => {
                state.loading = false;
                state.getSingleJD = action.payload;
            })
            .addCase(fetchSingleJd.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload;
            })
            //============= < CREATE >===================//
            .addCase(createRecruiter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRecruiter.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.recruiterDetails)) {
                    state.recruiterDetails.push(action.payload);
                }
                state.response = "Recruiter added successfully";
            })
            .addCase(createRecruiter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //============= < LOGIN >===================//
            .addCase(recruiterLogin.pending, (state) => {
                state.loading = true
            })
            .addCase(recruiterLogin.fulfilled, (state, action) => {
                state.infoData = action.payload;
                localStorage.setItem('infoData', JSON.stringify(action.payload))
                state.loading = false;
                state.logoutloading = false;
            })
            .addCase(recruiterLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //============= < DELETE >===================//
            .addCase(removeRecruiter.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiterDetails = state.recruiterDetails?.data?.filter((recruiter) => recruiter._id !== action.payload);
                state.response = "Recruiter removed successfully";
            })
            .addCase(removeRecruiter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //==============< UPDATE >===================//
            .addCase(updateRecruiter.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.recruiterDetails.findIndex((recruiter) => recruiter._id === action.payload._id);
                if (index !== -1) {
                    state.recruiterDetails[index] = action.payload;
                    state.response = "Recruiter updated successfully";
                }
            })
            .addCase(updateRecruiter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //=============< OTP >===================//
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.response = "OTP verified";
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //=============< RECRUITER PROFILE >===================//
            .addCase(recruiterProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(recruiterProfile.fulfilled, (state, action) => {
                state.loading = false
                state.recruiterDetails = action.payload
            })
            .addCase(recruiterProfile.rejected, (state, action) => {

                state.loading = false
                state.error = action.payload
                state.recruiterDetails = null
            })
            //=============< ACTIVE ALL >===================//
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
            //=============< VERIFY EMAIL >===================//
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false
                state.emailPassChange = action.payload.message
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            //=============< CONFIRM PASSWORD >===================//
            .addCase(ConfirmPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(ConfirmPassword.fulfilled, (state, action) => {
                state.loading = false
                state.confirmPassOtp = action.payload.message
            })
            .addCase(ConfirmPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
    },
});
export const { setUserData, userLogout } = recruiterSlice.actions;
export default recruiterSlice.reducer;
