import { configureStore } from "@reduxjs/toolkit";
import recruiterSlice from '../reduxSlice/recruiterSlice';
import jdSlice from '../reduxSlice/jdSlice';
import adminSlice from '../reduxSlice/adminSlice';
import resumeSlice from '../reduxSlice/resumeSlice'
import applicantSlice from "../reduxSlice/applicantSlice";

export const store = configureStore({
    reducer: {
        RECRUITER: recruiterSlice,
        JD: jdSlice,
        ADMIN: adminSlice,
        RESUME: resumeSlice,
        APPLICATIONS: applicantSlice,
    },
});
