import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_BASE_URLA = "http://213.210.37.236:5005/jd1";
const API_BASE_URLA = "https://smartjob-api.onrender.com/jd1";

const initialState = {
    loading: false,
    jdDetails: [],
    status: 'idle',
    error: null,
    response: "",
    jdInfo: null,
    jdData: null,
    logoutloading: false,
    constantIdforJobList: null,
    constantViewId: null,
};

//==============================< MAKE VIEW JD ID >========================================//
export const makeAnViewId = createAsyncThunk('jobs/makeAnViewId', async (id, { rejectWithValue }) => {
    console.log("user view id", id)
    return id;
});
//==============================< MAKE UPDATE JD ID >========================================//
export const makeAnconstantId = createAsyncThunk('jobs/makeAnconstantId', async (id, { rejectWithValue }) => {
    console.log("user id", id)
    return id;
});
//==============================< ALL JD >========================================//
export const fetchAllJd = createAsyncThunk('jobs/fetchAllJd', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URLA}/get-all-jd`);
        console.log("res data after fetching the getall jd data", response?.data);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch jd");
    }
});
//==============================< SINGLE JD >========================================//
export const fetchSingleJd = createAsyncThunk('jobs/fetchSingleJd', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URLA}/get-single-jd/${id}`);
        console.log("finded my single data", response?.data);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to remove recruiter");
    }
});
//==============================< CREATE JD >========================================//
export const createJobd = createAsyncThunk('jobs/createJobd', async (data, { rejectWithValue }) => {
    try {
        const jdInfo = JSON.parse(localStorage.getItem('adminInfo'));
        const token = jdInfo?.data?.accessToken;

        if (!token) {
            return rejectWithValue('Token not found');
        }

        const headers = {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        };

        const response = await axios.post(`${API_BASE_URLA}/create`, data, { headers });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to add jdItem');
    }
});

//==============================< DELETE JD >========================================//
export const deleteJobd = createAsyncThunk('jobs/deleteJobd', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_BASE_URLA}/delete/${id}`);
        window.location.reload();
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to remove jdItem");
    }
});

//==============================< UPDATE JD >========================================//
export const updateJobd = createAsyncThunk('jobs/updateJobd', async ({ id, data }, { rejectWithValue }) => {
    if (!id) {
        return rejectWithValue('ID is required for updating the job description.');
    }
    try {
        const response = await axios.post(`${API_BASE_URLA}/update/${id}`, data);
        return response.data.response || 'Job data not found';
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to update the job description.';
        return rejectWithValue(errorMessage);
    }
}
);

//==============================< JD SLICE >========================================//

const jdSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setJdData(state) {
            const jd = JSON.parse(localStorage.getItem('jdInfo'));
            state.jdInfo = jd;
        },
        jdLogout(state) {
            localStorage.clear();
            state.logoutloading = true;
            console.log('Jd Logout Successful!!!');
        }
    },
    extraReducers: (builder) => {
        builder
            //============= < GET SINGLE JD >===================//
            .addCase(fetchSingleJd.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchSingleJd.fulfilled, (state, action) => {
                state.status = 'success';
                state.loading = false;
                state.jdData = action.payload;
            })
            .addCase(fetchSingleJd.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            })
            //============= < GET ALL >===================//
            .addCase(fetchAllJd.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(fetchAllJd.fulfilled, (state, action) => {
                state.status = 'success';
                state.loading = false;
                state.jdDetails = action.payload;
            })
            .addCase(fetchAllJd.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.payload;
            })
            //============= < CREATE JD >===================//
            .addCase(createJobd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createJobd.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.jdDetails)) {
                    state.jdDetails = [...state.jdDetails, action.payload];
                } else {
                    state.jobs = [action.payload];
                }
                state.response = "jdItem added successfully";
            })
            .addCase(createJobd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //============= < UPDATE JD >===================//
            .addCase(updateJobd.pending, (state) => {
                state.response = 'Updating job...';
            })
            .addCase(updateJobd.fulfilled, (state, action) => {
                state.constantIdforJobList = action.payload
                if (action.payload && action.payload._id) {
                    const index = state.constantIdforJobList.findIndex((job) => job._id !== action.payload);
                    if (index !== -1) {
                        state.constantIdforJobList[index] = action.payload;
                        state.response = "Job updated successfully";
                    } else {
                        state.response = "Job not found in the list";
                    }
                } else {
                    state.response = "Invalid job data";
                }
            })
            .addCase(updateJobd.rejected, (state, action) => {
                state.response = action.payload || 'Failed to update job';
            })
            //============= < DELETE JD >===================//
            .addCase(deleteJobd.fulfilled, (state, action) => {
                state.loading = false;
                state.jdDetails = state.jdDetails?.data?.filter((job) => job._id !== action.payload);
                state.response = "job removed successfully";
            })
            .addCase(deleteJobd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //================= < MAKE JD UPDATE ID > =========================//
            .addCase(makeAnconstantId.fulfilled, (state, action) => {
                state.constantIdforJobList = action.payload
            })
            .addCase(makeAnconstantId.rejected, (state, action) => {
                state.constantIdforJobList = null;
                state.error = action.error.message || 'Failed to update job!';
            })
            //================= < MAKE VIEW JD ID > =========================//
            .addCase(makeAnViewId.fulfilled, (state, action) => {
                state.constantViewId = action.payload
            })
            .addCase(makeAnViewId.rejected, (state, action) => {
                state.constantViewId = null;
                state.error = action.error.message || 'Failed to View User!';
            });
    },
});

export const { setJdData, jdLogout } = jdSlice.actions;
export default jdSlice.reducer;
