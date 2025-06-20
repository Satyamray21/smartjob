import React, { useMemo } from 'react';
import {
    Box, Button, CssBaseline, Stack, TextField, Grid, Typography,
    Checkbox,
    Select,
    MenuItem
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

const JobApplication = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = useMemo(() => yup.object({
        email: yup.string().email('Enter a valid email').required('Email is required'),
        mobile: yup.string().min(10, 'Mobile number should be at least 10 characters').required('Mobile number is required').matches(/^[1-9]\d{9}$/, "Invalid Contact Number"),
        job_function: yup.string().required('Job Function is required'),
        experience: yup.object().shape({
            years: yup.string().min(1, 'Experience years is required').required('Experience years is required!'),
            months: yup.string().min(1, 'Experience months is required').required('Experience months is required')
        }).required(),
        current_location: yup.string().required('Location is required'),
        key_skills: yup.string().required('Key skills are required'),
        check_box: yup.string().required('Check box is required'),
        password: yup.string().min(6, 'Password should be at least 6 characters').max(8, 'Password should not exceed 8 characters').required('Password is required'),
        confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    }), []);

    const formik = useFormik({
        initialValues: {
            email: "",
            mobile: "",
            job_function: "",
            experience: { years: '', months: '' },
            current_location: "",
            key_skills: "",
            check_box: "",
            password: "",
            confirm_password: "",
            pdfResume: null
        },
        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('mobile', values.mobile);
            formData.append('job_function', values.job_function);
            formData.append('current_location', values.current_location);
            formData.append('key_skills', values.key_skills);
            formData.append('check_box', values.check_box);
            formData.append('password', values.password);
            formData.append('confirm_password', values.confirm_password);
            formData.append('pdfResume', values.pdfResume);
            formData.append('experience_years', values.experience.years);
            formData.append('experience_months', values.experience.months);
            try {
                const resultAction = await dispatch(/* your action here */ formData);
                const result = unwrapResult(resultAction);
                toast.success(result?.message);
                if (result?.Status) {
                    navigate('/otpinput');
                }
            } catch (error) {
                toast.error(error.message);
            }
        },
    });
    const FormSection = ({ title, children }) => (
        <Stack direction="column" spacing={2}>
            {title && <Typography>{title}</Typography>}
            {children}
        </Stack>
    );

    const FormField = ({ label, formik, name, type = 'text' }) => (
        <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
            <Typography sx={{ my: 1, textAlign: 'left' }}>{label}</Typography>
            <TextField
                sx={{ border: '1px solid #9e9e9e' }}
                {...formik.getFieldProps(name)}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
                size="small"
                fullWidth
                type={type}
                autoComplete="off"
            />
        </Box>
    );

    return (
        <>
            <ToastContainer position='top-right' />
            <CssBaseline />
            <Box sx={{ backgroundColor: '#f0f1f5' }}>
                <Grid container md={8} sx={{ dispatch: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, py: { md: 2, xs: 3 }, }}>
                    <Grid item xs={12}>
                        <Stack direction="column" spacing={2}>
                            {/* Resume Upload */}
                            <FormSection title="RESUME(Attach the CV to auto populate the form)">
                                <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '50%' }}>
                                    <Typography sx={{ my: 1, textAlign: 'left' }}>Attach CV *(doc/docx/pdf only)</Typography>
                                    <TextField
                                        sx={{ border: '1px solid #9e9e9e' }}
                                        id="pdfResume"
                                        name="pdfResume"
                                        type="file"
                                        fullWidth
                                        onChange={(event) => formik.setFieldValue('pdfResume', event.currentTarget.files[0])}
                                        onBlur={formik.handleBlur}
                                    />
                                </Box>
                            </FormSection>

                            {/* Personal Details */}
                            <FormSection title="Candidate Personal Details">
                                <Stack direction="row" spacing={2}>
                                    <FormField label="First Name*" formik={formik} name="first_name" />
                                    <FormField label="Last Name*" formik={formik} name="last_name" />
                                    <FormField label="Email*" formik={formik} name="email" />
                                </Stack>
                            </FormSection>

                            {/* Other Details */}
                            <FormSection>
                                <FormField label="Mobile Number*" formik={formik} name="mobile" />
                            </FormSection>

                            {/* Address and DOB */}
                            <FormSection>
                                <Stack direction="row" spacing={2}>
                                    <FormField label="Address*" formik={formik} name="address" />
                                    <FormField label="Full Address*" formik={formik} name="full_address" />
                                </Stack>
                            </FormSection>
                            <FormSection>
                                <Stack direction="row" spacing={2}>
                                    <FormField label="Date Of Birth (min 18 years)*" formik={formik} name="dob" type="date" />
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Gender*</Typography>
                                        <Select sx={{ border: '1px solid #9e9e9e', width: '200px' }} size="small" id="gender" value="">
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="others">Others</MenuItem>
                                        </Select>
                                    </Box>
                                </Stack>
                            </FormSection>

                            {/* Employment Details */}
                            <FormSection title="EMPLOYMENT DETAILS">
                                <Stack direction="row" spacing={2}>
                                    <FormField label="Total Experience (years)*" formik={formik} name="total_experience" />
                                    <FormField label="Relevant Experience (years)*" formik={formik} name="relevant_experience" />
                                    <FormField label="Current Company*" formik={formik} name="current_company" />
                                </Stack>
                            </FormSection>

                            {/* Footer */}
                            <FormSection>
                                <Typography>
                                    <Checkbox {...formik.getFieldProps('check_box')} defaultChecked size="small" />I agree
                                </Typography>
                                <Typography>
                                    By registering with us you agree to our <Link to="/terms" style={{ textDecoration: 'none', color: '#1A237E' }}>Terms of Service</Link> and <Link to="/privacy" style={{ textDecoration: 'none', color: '#1A237E' }}>Privacy Policy</Link>
                                </Typography>
                                <Box textAlign="center" sx={{ width: { md: '300px', xs: '220px' } }}>
                                    <Button type="submit" fullWidth variant="contained">Submit</Button>
                                </Box>
                            </FormSection>
                        </Stack>
                    </Grid>
                </Grid>
            </Box >
        </>
    );
};

export default JobApplication;
