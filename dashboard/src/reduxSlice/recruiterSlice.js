import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const API_URL_A = "http://213.210.37.236:5005/rc1";
const API_URL_A = "http://localhost:5005/rc1";
const API_URL_B = "http://localhost:5005/jd1";



//==============================< MAKE VIEW JD ID >========================================//
export const makeAnViewId = createAsyncThunk('recruiter/makeAnViewId', async (id, { rejectWithValue }) => {
    console.log("recruiter view id", id)
    return id;
});
//==============================< MAKE UPDATE JD ID >========================================//
export const makeAnconstantId = createAsyncThunk('recruiter/makeAnconstantId', async (id, { rejectWithValue }) => {
    console.log("recruiter update id", id)
    return id;
});
//==============================< SINGLE RECRUITER >========================================//
export const fetchSingleRecruiter = createAsyncThunk("recruiter/fetchSingleRecruiter", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL_A}/single-recruiter/${id}`);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch single recruiter data");
    }
});

//==============================< SINGLE JD >========================================//
export const fetchSingleJd = createAsyncThunk("recruiter/fetchSingleJd", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL_B}/get-single-jd/${id}`);
        console.log("Fetched single JD data", response?.data);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch single JD data");
    }
});

//==============================< ALL RECRUITER >========================================//
export const fetchAllRecruiter = createAsyncThunk("recruiter/fetchAllRecruiter", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL_A}/get-all-recruiters`);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch recruiters");
    }
});


//==============================< CREATE RECRUITER >========================================//
export const recruiterCreated = createAsyncThunk(
    'recruiter/recruiterCreated',
    async (data, { rejectWithValue }) => {
        const accessToken = JSON.parse(localStorage.getItem('userInfo')) || {};
        const token = accessToken?.data?.accessToken;
        if (!token) return rejectWithValue('Token not found');

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        };
        try {
            const response = await axios.post(`${API_URL_A}/create`, data, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create recruiter');
        }
    }
);

//==============================< LOGIN RECRUITER >========================================//
export const recruiterLogin = createAsyncThunk('recruiter/recruiterLogin', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL_A}/login`, data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue({ message: 'Something went wrong' });
        }
    }
});

//==============================< OTP VERIFY >========================================//
export const verifyOTP = createAsyncThunk('recruiter/verifyOTP', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL_A}/verify-otp`, data);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to verify OTP");
    }
});

//==============================< DELETE RECRUITER >========================================//
export const removeRecruiter = createAsyncThunk("recruiter/removeRecruiter", async (id, { rejectWithValue, getState }) => {
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
        await axios.delete(`${API_URL_A}/delete/${id}`, header);
        window.location.reload();
        return id;
    } catch (error) {
        return rejectWithValue(error?.response?.data || "Failed to remove recruiter");
    }
});

//==============================< UPDATE WITH TOKEN RECRUITER >========================================//
export const updatedProfile = createAsyncThunk(
    'recruiter/updatedProfile',
    async (data, { rejectWithValue }) => {
        const accessToken = JSON.parse(localStorage.getItem('userInfo')) || {};
        const token = accessToken?.data?.accessToken;
        if (!token) return rejectWithValue('Token not found');

        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        };
        try {
            const response = await axios.put(`${API_URL_A}/profile-update`, data, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//==============================< PROFILE RECRUITER >========================================//
export const recruiterProfile = createAsyncThunk(
    'recruiter/recruiterProfile',
    async (_, { rejectWithValue }) => {
        const accessToken = JSON.parse(localStorage.getItem('userInfo')) || {};
        const token = accessToken?.data?.accessToken;
        if (!token) return rejectWithValue('Token not found');

        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        };
        try {
            const response = await axios.get(`${API_URL_A}/profile`, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//==============================< ACTIVE RECRUITER >========================================//
export const getAllActiveRecruiters = createAsyncThunk(
    'recruiters/getAllActiveRecruiters',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL_A}/all-active-recruiters`,);
            return response?.data?.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue('Something went wrong');
            }
        }
    }
);

//==============================< INACTIVE RECRUITER >========================================//
export const inActiveStatus = createAsyncThunk('recruiter/inActiveStatus', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL_A}/inactive-recruiter`, { id });
        return res.data;
    } catch (error) {
        console.error('Error in InactiveStatus thunk:', error);

        return rejectWithValue(error.response.data);
    }
});

//==============================< ALL INACTIVE RECRUITER >========================================//
export const fetchInactiveRecruiters = createAsyncThunk(
    'recruiters/fetchInactiveRecruiters',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL_A}/all-inactive-recruiter`,);
            return response?.data?.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue('Something went wrong');
            }
        }
    }
);
//==============================< EMAIL VERIFY >========================================// 
export const verifyEmail = createAsyncThunk('recruiter/verifyEamil', async (email, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL_A}/otp-reset-password`, email);
        return res.data;
    } catch (error) {
        console.error('Error in send thunk:', error);
        return rejectWithValue(error?.response?.data);
    }
});

//==============================< SEND OTP VIEW EMAIL >========================================// 
export const sendOTPViaEmail = createAsyncThunk(
    'otp/sendOTPViaEmail',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL_A}/send-otp-email`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send OTP via email');
        }
    }
);

//==============================< RESEND OTP >========================================// 
export const resendOTP = createAsyncThunk(
    'otp/resendOTP',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL_A}/resend-otp`);
            return response.data;
        } catch (error) {
            // Handle error and return custom error message
            return rejectWithValue(error.response.data);
        }
    }
);
//==============================< CONFIRM PASSWORD >========================================// 
export const changePasswordByOtp = createAsyncThunk(
    'auth/changePasswordByOtp',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL_A}/change-password-otp`, data);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
);
// export const changePasswordByOtp = createAsyncThunk('recruiter/changePasswordByOtp', async (data, { rejectWithValue }) => {
//     try {
//         const res = await axios.post(`${API_URL_A}/change-password-otp`, data);
//         return res.data;
//     } catch (err) {
//         console.error('Error in InactiveStatus thunk:', err);
//         return rejectWithValue(err?.response?.data);
//     }
// });

// Async thunk to fetch recruiters by admin ID
export const fetchRecruitersByAdmin = createAsyncThunk(
    'recruiters/fetchRecruitersByAdmin',
    async (adminId, { rejectWithValue }) => {
        const { accessToken } = JSON.parse(localStorage.getItem('adminInfo')) || {};
        if (!accessToken) return rejectWithValue('Token not found');

        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        };
        try {
            const response = await axios.get(`${API_URL_A}/${adminId}`, { headers });
            return response.data.recruiters;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//==============================< Recruiter Slice >========================================//
const initialState = {
    loading: false,
    infoData: null,
    recruiterDetails: [],
    recruiters: [],
    recruiter: null,
    isAuthenticated: false,
    status: null,
    error: null,
    response: "",
    activeAlert: null,
    inactiveAlert: null,
    emailPassChange: null,
    success: null,
    getSingleJD: null,
    getSingleRc1: null,
    logoutloading: false,
    constantIdforRc1: null,
    constantIdViewRc1: null,
    sendEmail: null,
    otpResent: false,

};

const recruiterSlice = createSlice({
    name: "recruiter",
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.success = null;
            state.error = null;
        },
        recruiterLogout(state) {
            localStorage.removeItem('userInfo');
            state.recruiter = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        //============= < GET ALL >===================//
        builder
            .addCase(fetchAllRecruiter.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchAllRecruiter.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiter = action.payload;
            })
            .addCase(fetchAllRecruiter.rejected, (state, action) => {
                state.status = 'rejected';
                state.loading = false;
                state.error = action.payload;
            });
        //============= < GET SINGLE JD >===================//
        builder
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
            });
        //============= < CREATE >===================//
        builder
            .addCase(recruiterCreated.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recruiterCreated.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiters = action.payload;
                state.response = "Recruiter creating successfully";
            })
            .addCase(recruiterCreated.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        //============= < LOGIN >===================//
        builder
            .addCase(recruiterLogin.pending, (state) => {
                state.loading = true;
            })

            .addCase(recruiterLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recruiter = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));
            })
            .addCase(recruiterLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Login failed';
            });
        //=============< RECRUITER PROFILE >===================//
        builder
            .addCase(recruiterProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(recruiterProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiter = action.payload.data;
                state.error = null;
            })
            .addCase(recruiterProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
        //============= < DELETE >===================//
        builder
            .addCase(removeRecruiter.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiterDetails = state.recruiterDetails?.data?.filter((recruiter) => recruiter._id !== action.payload);
                state.response = "Recruiter removed successfully";
            })
            .addCase(removeRecruiter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        //==============< UPDATE PROFILE >===================//
        builder
            .addCase(updatedProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatedProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiter = action.payload;
                state.error = null;
            })
            .addCase(updatedProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
        //=============< OTP >===================//
        builder
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
            });
        //=============< ACTIVE ALL >===================//
        builder
            .addCase(getAllActiveRecruiters.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllActiveRecruiters.fulfilled, (state, action) => {
                state.loading = false
                state.recruiterDetails = action.payload
            })
            .addCase(getAllActiveRecruiters.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.activeRct = null
            });
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
            });
        //=============< INACTIVE ALL >===================//
        builder
            .addCase(fetchInactiveRecruiters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInactiveRecruiters.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiterDetails = action.payload;
            })
            .addCase(fetchInactiveRecruiters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch inactive recruiters';
            });
        //=============< VERIFY EMAIL >===================//
        builder
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
            });
        //=============< CONFIRM PASSWORD >===================//
        builder
            .addCase(changePasswordByOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePasswordByOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiter = action.payload.data;
            })
            .addCase(changePasswordByOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to change password';
            });
        //================= < SEND EMAIL VIEW > =========================//
        // .addCase(sendOTPViaEmail.pending, (state) => {
        //     state.status = 'loading';
        //     state.error = null;
        // })
        // .addCase(sendOTPViaEmail.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     state.message = action.payload.message;
        // })
        // .addCase(sendOTPViaEmail.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.error = action.payload;
        // })
        //================= < OTP RESENT > =========================//
        builder
            .addCase(resendOTP.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resendOTP.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.otpResent = action.payload.Status;
                state.message = action.payload.message;
            })
            .addCase(resendOTP.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            });
        //================= < MAKE JD UPDATE ID > =========================//
        builder
            .addCase(makeAnconstantId.fulfilled, (state, action) => {
                state.constantIdforRc1 = action.payload
            })
            .addCase(makeAnconstantId.rejected, (state, action) => {
                state.constantIdforRc1 = null;
                state.error = action.error.message || 'Failed to update recruiter!';
            });
        //================= < MAKE VIEW RECRUITER ID > =========================//
        builder
            .addCase(makeAnViewId.fulfilled, (state, action) => {
                state.constantIdViewRc1 = action.payload
            })
            .addCase(makeAnViewId.rejected, (state, action) => {
                state.constantIdViewRc1 = null;
                state.error = action.error.message || 'Failed to View recruiter!';
            });
        //================= < VIEW RECRUITER BY ADMIN ID > =========================//
        builder
            .addCase(fetchRecruitersByAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Handle fulfilled state for the API call
            .addCase(fetchRecruitersByAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.recruiterDetails = action.payload;
            })
            // Handle rejected state for the API call
            .addCase(fetchRecruitersByAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { resetState, recruiterLogout } = recruiterSlice.actions;
export default recruiterSlice.reducer;
