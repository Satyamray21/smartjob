import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { uploadResume } from '../../../../reduxSlice/resumeSlice';
import { useFormik } from 'formik';

const Resume = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);

    const validationSchema = yup.object({
        resume: yup.mixed().required('Resume is required'),
    });

    const formik = useFormik({
        initialValues: {
            resume: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('resume', file);
            try {
                await dispatch(uploadResume(formData)).unwrap();
                toast.success('Resume uploaded successfully!');
            } catch (error) {
                toast.error('Failed to upload resume.');
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        setFile(file);
        formik.setFieldValue('resume', file);
    };

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Button variant="contained" component="label">
                Upload Resume
                <input
                    type="file"
                    name="resume"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
            {formik.errors.resume && (
                <Typography color="error" variant="body2">
                    {formik.errors.resume}
                </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
};

export default Resume;




// success full