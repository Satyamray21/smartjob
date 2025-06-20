import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URLA = "https://smartjob-api.onrender.com/admin";

//==============================< CREATE admin >========================================//
export const createAdmin = createAsyncThunk("createAdmin", async (data, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        const formData = new FormData();
        formData.append('user_name', data.user_name);
        formData.append('first_name', data.name.first_name);
        formData.append('last_name', data.name.last_name);
        formData.append('email', data.email);
        formData.append('mobile', data.mobile);
        formData.append('password', data.password);
        formData.append('confirm_password', data.confirm_password);
        formData.append('role', data.role);
        formData.append('profileImage', data.profileImage);
        const response = await axios.post(`${API_BASE_URLA}/create`, formData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add admin");
    }
});

//==============================< LOGIN ADMIN >========================================//
export const adminLogin = createAsyncThunk('adminLogin', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_BASE_URLA}/login`, data)
        localStorage.setItem('adminInfo', res?.data?.data)
        console.log("after  data ", res?.data?.data?.accessToken)
        return res?.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

//==============================< PROFILE admin >========================================//
export const adminProfile = createAsyncThunk('adminProfile', async (_, { rejectWithValue, getState }) => {
    const authInfo = getState()?.localStorage.getItem('adminInfo');
    let token = '';
    if (authInfo) {
        const parsedauthInfo = JSON.parse(authInfo);
        token = parsedauthInfo?.data?.accessToken || 'Token currect';
        console.log("mera token", token);
    }
    if (!token) {
        return rejectWithValue('Token not found');
    }
    const header = {
        Accept: 'application/json',
        adminization: `Bearer ${token}`
    };
    try {
        const res = await axios.get(`${API_BASE_URLA}/active-admin`, { header });
        return res.data;
    } catch (e) {
        return rejectWithValue(e.response?.data);
    }
});

//==============================< Recruiter Slice >========================================//
const initialState = {
    loading: false,
    adminDatails: [],
    adminInfo: null,
    activeStatus: null,
    status: null,
    error: null,
    response: "",
    logoutloading: false
};

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState: initialState,
    reducers: {
        setAdminData(state) {
            const admin = JSON.parse(localStorage.getItem('adminInfo'))
            state.adminInfo = admin;
        },
        adminLogout(state) {
            localStorage.clear();
            state.logoutloading = true
            console.log('Logout Successfull!!!')
        }
    },
    extraReducers: (Builder) => {
        //=================== < LOGIN >=======================//
        Builder.addCase(adminLogin.pending, (state) => {
            state.loading = true;
        })
        Builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
            state.loading = false;
            state.logoutloading = false;
        })
        Builder.addCase(adminLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //============= < CREATE >===================//
        Builder.addCase(createAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        Builder.addCase(createAdmin.fulfilled, (state, action) => {
            state.loading = false;
            if (Array.isArray(state.adminDatails)) {
                state.adminDatails.push(action.payload);
            }
            state.response = "admin added successfully";
        })
        Builder.addCase(createAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //=============< ACTIVE ALL >===================//
        Builder.addCase(adminProfile.pending, (state) => {
            state.loading = true
        })
        Builder.addCase(adminProfile.fulfilled, (state, action) => {
            state.loading = false
            state.activeStatus = action.payload
        })
        Builder.addCase(adminProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.activeStatus = null
        })
    }
})
export const { setAdminData, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;