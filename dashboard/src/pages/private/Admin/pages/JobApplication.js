import React, { useState, useMemo } from 'react';
import {
    Box, Button, CssBaseline, Stack, TextField, Grid, Typography, Radio,
    FormControl, RadioGroup, useTheme, Avatar, InputAdornment, IconButton, Divider, Card, CardContent, FormControlLabel,
    InputLabel,
    Checkbox,
    Select,
    MenuItem,
    Paper
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginImg from '../../../assets/images/login2.webp'
import MaskImage from '../../../assets/images/bg6.jpeg'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

const JobApplication = () => {
    const { palette, spacing } = useTheme();
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
            resumeFile: null
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
            formData.append('resumeFile', values.resumeFile);
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

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <>
            <ToastContainer position='top-right' />
            <CssBaseline />
            <Box sx={{ backgroundColor: '#f0f1f5' }}>
                <Grid container md={8} sx={{ dispatch: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, py: { md: 2, xs: 3 }, }}>
                    <Grid item xs={12}>
                        <Stack direction="column" spacing={2}>
                            <Stack direction={'column'}>
                                <Typography>RESUME(Attach the CV to auto populate the form)</Typography>
                                <Stack direction={'row'} >
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '50%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Attach CV *(doc/docx/pdf only)</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            id="resumeFile"
                                            name="resumeFile"
                                            plaseholder="choose file"
                                            type="file"
                                            fullWidth
                                            onChange={(event) => {
                                                formik.setFieldValue("resumeFile", event.currentTarget.files[0]);
                                            }}
                                            onBlur={formik.handleBlur}
                                        // style={{ display: 'none' }}
                                        />
                                    </Box>

                                </Stack>
                            </Stack>
                            <Stack direction={'column'}>
                                <Typography>Condidate Personal Details</Typography>
                                <Stack direction={'row'} spacing={2}>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>First Name*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('first_name')}
                                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                            helperText={formik.touched.first_name && formik.errors.first_name}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Last Name*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('last_name')}
                                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                            helperText={formik.touched.last_name && formik.errors.last_name}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Email*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('email')}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack direction={'column'}>
                                <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                    <Typography sx={{ my: 1, textAlign: 'left' }}>Mobile Number*</Typography>
                                    <TextField
                                        sx={{ border: '1px solid #9e9e9e', }}
                                        {...formik.getFieldProps('mobile')}
                                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                        helperText={formik.touched.mobile && formik.errors.mobile}
                                        size="small"
                                        fullWidth
                                        autoComplete='off'
                                    />
                                </Box>
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                    <Typography sx={{ my: 1, textAlign: 'left' }}>Address*</Typography>
                                    <TextField
                                        sx={{ border: '1px solid #9e9e9e', }}
                                        {...formik.getFieldProps('address')}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                        size="small"
                                        fullWidth
                                        autoComplete='off'
                                    />
                                </Box>
                                <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                    <Typography sx={{ my: 1, textAlign: 'left' }}>Full Address*</Typography>
                                    <TextField
                                        sx={{ border: '1px solid #9e9e9e', }}
                                        {...formik.getFieldProps('full_address')}
                                        error={formik.touched.full_address && Boolean(formik.errors.full_address)}
                                        helperText={formik.touched.full_address && formik.errors.full_address}
                                        size="small"
                                        fullWidth
                                        autoComplete='off'
                                    />
                                </Box>
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                    <Typography sx={{ my: 1, textAlign: 'left' }}>Date Of Birth (min 18 years)*</Typography>
                                    <TextField
                                        sx={{ border: '1px solid #9e9e9e', }}
                                        {...formik.getFieldProps('dob')}
                                        error={formik.touched.dob && Boolean(formik.errors.dob)}
                                        helperText={formik.touched.dob && formik.errors.dob}
                                        size="small"
                                        type='date'
                                        fullWidth
                                        autoComplete='off'
                                    />
                                </Box>
                                <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                    <Typography sx={{ my: 1, textAlign: 'left' }}>Gender*</Typography>
                                    <Select
                                        sx={{ border: '1px solid #9e9e9e', width: '200px' }}
                                        size='small'
                                        id="gender"
                                        value=""
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="others">Others</MenuItem>
                                    </Select>
                                </Box>
                            </Stack>
                            <Stack direction={'row'} spacing={2}>
                                <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                    <Typography>IDENTITY</Typography>
                                    <Typography sx={{ my: 1, textAlign: 'left' }}>Passport Number*</Typography>
                                    <TextField
                                        sx={{ border: '1px solid #9e9e9e', }}
                                        {...formik.getFieldProps('passport_number')}
                                        error={formik.touched.passport_number && Boolean(formik.errors.passport_number)}
                                        helperText={formik.touched.passport_number && formik.errors.passport_number}
                                        size="small"
                                        type='date'
                                        fullWidth
                                        autoComplete='off'
                                    />
                                </Box>
                            </Stack>
                            <Stack direction={'column'}>
                                <Typography>EMPLOYMENT DETAILS</Typography>
                                <Stack direction={'row'} spacing={2}>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Total Experience (years)*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('total_experience')}
                                            error={formik.touched.total_experience && Boolean(formik.errors.total_experience)}
                                            helperText={formik.touched.total_experience && formik.errors.total_experience}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Relevant Experience (years)*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('relevant_experience')}
                                            error={formik.touched.relevant_experience && Boolean(formik.errors.relevant_experience)}
                                            helperText={formik.touched.relevant_experience && formik.errors.relevant_experience}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Current Company*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('current_company')}
                                            error={formik.touched.current_company && Boolean(formik.errors.current_company)}
                                            helperText={formik.touched.current_company && formik.errors.current_company}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack direction={'column'}>
                                <Stack direction={'row'} spacing={2}>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Notice Period (days)*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('notice_period')}
                                            error={formik.touched.notice_period && Boolean(formik.errors.notice_period)}
                                            helperText={formik.touched.notice_period && formik.errors.notice_period}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Reason For Leaving*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('reason_leave')}
                                            error={formik.touched.reason_leave && Boolean(formik.errors.reason_leave)}
                                            helperText={formik.touched.reason_leave && formik.errors.reason_leave}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Notice Period Comments*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('notice_comment')}
                                            error={formik.touched.notice_comment && Boolean(formik.errors.notice_comment)}
                                            helperText={formik.touched.notice_comment && formik.errors.notice_comment}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack direction={'column'}>
                                <Stack direction={'row'} spacing={2}>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Current Salary*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('current_salary')}
                                            error={formik.touched.current_salary && Boolean(formik.errors.current_salary)}
                                            helperText={formik.touched.current_salary && formik.errors.current_salary}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Expected Salary*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('expected_salary')}
                                            error={formik.touched.expected_salary && Boolean(formik.errors.expected_salary)}
                                            helperText={formik.touched.expected_salary && formik.errors.expected_salary}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Salary Structure Details*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('salary_details')}
                                            error={formik.touched.salary_details && Boolean(formik.errors.salary_details)}
                                            helperText={formik.touched.salary_details && formik.errors.salary_details}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack direction={'column'} spacing={2}>
                                <Typography>PARTNER SCREENING</Typography>
                                <Stack>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Communication Skills*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('communication_skills')}
                                            error={formik.touched.communication_skills && Boolean(formik.errors.communication_skills)}
                                            helperText={formik.touched.communication_skills && formik.errors.communication_skills}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                </Stack>
                                <Stack>
                                    <Box sx={{ backgroundColor: '#e9e9e9', p: 1, borderRadius: '5px', width: '100%' }}>
                                        <Typography sx={{ my: 1, textAlign: 'left' }}>Screener Comments*</Typography>
                                        <TextField
                                            sx={{ border: '1px solid #9e9e9e', }}
                                            {...formik.getFieldProps('communication_skills')}
                                            error={formik.touched.communication_skills && Boolean(formik.errors.communication_skills)}
                                            helperText={formik.touched.communication_skills && formik.errors.communication_skills}
                                            size="small"
                                            fullWidth
                                            autoComplete='off'
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack direction={'column'}>
                                <Typography>
                                    <Checkbox {...formik.getFieldProps('check_box')} defaultChecked size='small' />I agree
                                </Typography>
                                <Typography>
                                    By registering with us you agree to our <Link style={{ textDecoration: 'none', color: '#1A237E' }} to="/terms">Terms of Service</Link> and <Link style={{ textDecoration: 'none', color: '#1A237E' }} to="/privacy">Privacy Policy</Link>
                                </Typography>
                            </Stack>
                            <Box textAlign="center" sx={{ width: { md: '300px', xs: '220px' } }}>
                                <Button type="submit" fullWidth variant="contained">Submit</Button>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Box >
        </>
    );
};

export default JobApplication;
