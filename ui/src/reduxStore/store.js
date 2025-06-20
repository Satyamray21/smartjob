import { configureStore } from '@reduxjs/toolkit';
import adminSlice from '../reduxSlice/adminSlice'
import recruiterSlice from '../reduxSlice/recruiterSlice';
import jdSlice from '../reduxSlice/jdSlice';
import candidateSlice from '../reduxSlice/candidateSlice';

export const store = configureStore({
    reducer: {
        ADMIN: adminSlice,
        RECRUIER: recruiterSlice,
        JD: jdSlice,
        CANDIDATE: candidateSlice
    },
});