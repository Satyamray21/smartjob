import React, { useState, useMemo, useEffect } from 'react';
import {
    Box, Button, CssBaseline, Stack, TextField, Grid, Typography,
    useTheme, InputAdornment, IconButton, Divider, Card, CardContent
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
import LoginImg from '../../../assets/images/register1.avif';
import MaskImage from '../../../assets/images/registe3.webp';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { uploadEmployee } from '../../../reduxSlice/employeeSlice';


const EmployeeRegister = () => {
    const { palette, spacing } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cImage, setCImage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = useMemo(() => yup.object({
        name: yup.object({
            first_name: yup.string().required('First name is required'),
            last_name: yup.string().required('Last name is required'),
        }),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        mobile: yup.string().min(10, 'Mobile number should be at least 10 characters').required('Mobile number is required').matches(/^[1-9]\d{9}$/, "Invalid Contact Number"),
        job_function: yup.string().required('Job Function is required'),
        experience: yup.object().shape({
            years: yup.number().positive().required('Experience years is required!'),
            months: yup.number().positive().required('Experience months is required')
        }).required(),
        current_location: yup.string().required('Location is required'),
        key_skills: yup.string().required('Key skills are required'),
        password: yup.string().required('Password is required'),
        confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        employeeImage: yup.mixed().required('Resume is required'),
    }), []);

    const formik = useFormik({
        initialValues: {
            name: { first_name: '', last_name: '' },
            email: "",
            mobile: "",
            job_function: "",
            experience: { years: '', months: '' },
            current_location: "",
            key_skills: "",
            password: "",
            confirm_password: "",
            employeeImage: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('first_name', values.name.first_name);
            formData.append('last_name', values.name.last_name);
            formData.append('email', values.email);
            formData.append('mobile', values.mobile);
            formData.append('job_function', values.job_function);
            formData.append('current_location', values.current_location);
            formData.append('years', values.experience.years);
            formData.append('months', values.experience.months);
            formData.append('key_skills', values.key_skills);
            formData.append('password', values.password);
            formData.append('employeeImage', values.employeeImage);
            try {
                const res = await dispatch(uploadEmployee(formData)).then(unwrapResult);
                toast.success(res?.message || 'Employee registered successfully!');
                navigate('/success'); // Navigate to a success page if needed
            } catch (error) {
                toast.error(error.message || 'Registration failed!');
            }
        },
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("employeeImage", file); // Update the correct field name

        if (file) {
            if (cImage) {
                URL.revokeObjectURL(cImage);
            }
            const newUrl = URL.createObjectURL(file);
            setCImage(newUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (cImage) {
                URL.revokeObjectURL(cImage);
            }
        };
    }, [cImage]);

    return (
        <>
            <ToastContainer position='top-right' />
            <CssBaseline />
            <Box sx={{
                position: 'relative',
                backgroundImage: `url(${MaskImage})`,
                height: { md: '15vh', xs: '15vh' }, width: '100%',
                backgroundRepeat: 'repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}>
                <Stack direction={'row'} sx={{ px: { md: spacing(17), xs: spacing(1) }, width: '100%', position: 'absolute', height: '100%', background: '#CD473B', opacity: 50, backdropFilter: 'blur(1px)', }}>
                    <Stack sx={{ flexDirection: { md: 'row', xs: 'column' }, m: 'auto' }} alignItems={'center'} gap={1}>
                        <Typography variant='h5' sx={{ textAlign: 'center', color: '#FDFDFD', fontWeight: 'bold' }}>
                            Registration Form for Employer
                        </Typography>
                        <Typography sx={{ textAlign: 'center', color: '#EE956C', }}>
                            <Link to='/employeelogin' style={{ color: '#EE956C', textDecoration: 'underline', fontWeight: 'bold', fontSize: '12px' }}> Already Registered Member? Sign in</Link>
                        </Typography>
                        <Typography sx={{ textAlign: 'center', color: '#EE956C', }}>
                            <Link to='/employeeregister' style={{ color: '#EE956C', textDecoration: 'underline', fontWeight: 'bold', fontSize: '12px' }}>If you are a Job Seeker? Register here</Link>
                        </Typography>
                    </Stack>
                </Stack >
            </Box >
            <Box sx={{
                position: 'relative',
                backgroundImage: `url(${MaskImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: { md: '93vh', xs: '157vh' },
                width: '100%',
                backgroundAttachment: 'fixed',
            }}>
                <Box sx={{ position: 'absolute', background: 'rgba(0,0,0,0.2)', width: '100%', height: '100%' }}>
                    <Grid container justifyContent={'center'} sx={{ py: { md: 2, xs: 3 }, p: 1, boxShadow: '1px 1px 20px 1px #fdfdfd', backdropFilter: 'blur(20px)' }}>
                        <Grid item xs={12} md={4} >
                            <Box
                                sx={{
                                    position: 'relative',
                                    backgroundImage: `url(${LoginImg})`,
                                    backgroundSize: 'cover',
                                    height: '100%',
                                }}>
                                <Box sx={{
                                    position: 'absolute', background: 'rgba(25,55,125,0.5)', width: '100%', height: '100%'
                                }}>
                                    <Stack sx={{ p: 10 }}>
                                        <Typography sx={{ color: '#fdfdfd' }} variant='h4' fontWeight={'bold'}>Find your dream job</Typography>
                                        <Typography variant='h6' sx={{ color: '#fdfdfd', display: 'flex', fontSize: '13px', alignItems: 'center' }}><DoneRoundedIcon sx={{ px: 1 }} />One Click Apply</Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Card elevation={0}>
                                <CardContent component="form" onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={1}>
                                        {[
                                            { label: "First Name", name: "name.first_name", type: "text" },
                                            { label: "Last Name", name: "name.last_name", type: "text" },
                                            { label: "Email", name: "email", type: "email" },
                                            { label: "Mobile Number", name: "mobile", type: "tel" },
                                            { label: "Job Function", name: "job_function", type: "text" },
                                            { label: "Current Location", name: "current_location", type: "text" },
                                            { label: "Key Skills", name: "key_skills", type: "text" },
                                            { label: "Password", name: "password", type: showPassword ? "text" : "password" },
                                            { label: "Confirm Password", name: "confirm_password", type: "password" },
                                        ].map((field, index) => (
                                            <React.Fragment key={index}>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <Typography>{field.label}:</Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={8}>
                                                    <TextField
                                                        sx={{ border: '1px solid #9e9e9e' }}
                                                        {...formik.getFieldProps(field.name)}
                                                        error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                                                        helperText={formik.touched[field.name] && formik.errors[field.name]}
                                                        size="small"
                                                        fullWidth
                                                        placeholder={field.label}
                                                        autoComplete='off'
                                                        type={field.type}
                                                        InputProps={field.label === "Password" ? {
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={handleClickShowPassword}
                                                                        onMouseDown={handleMouseDownPassword}
                                                                        edge="end"
                                                                    >
                                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        } : undefined}
                                                    />
                                                </Grid>
                                            </React.Fragment>
                                        ))}

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography>Experience:</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={8}>
                                            <Grid container spacing={2}>
                                                {["years", "months"].map((label, index) => (
                                                    <Grid item xs={6} key={index}>
                                                        <TextField
                                                            sx={{ border: '1px solid #9e9e9e' }}
                                                            {...formik.getFieldProps(`experience.${label}`)}
                                                            error={formik.touched.experience?.[label] && Boolean(formik.errors.experience?.[label])}
                                                            helperText={formik.touched.experience?.[label] && formik.errors.experience?.[label]}
                                                            size="small"
                                                            placeholder={label.charAt(0).toUpperCase() + label.slice(1)}
                                                            autoComplete='off'
                                                            type="number"
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography>Upload Your Resume:</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={8}>
                                            <Button variant='outlined' component="label" fullWidth >
                                                Upload Resume
                                                <input hidden accept="image/*" type="file" name="employeeImage" onChange={handleImageChange} />
                                            </Button>
                                            {cImage && (
                                                <Typography sx={{ mt: 2, color: 'green' }}>Resume: {cImage.split('/').pop()}</Typography>
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box textAlign="center">
                                                <Button type="submit" fullWidth variant="contained">Register</Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider>OR</Divider>
                                            <Typography sx={{ color: '#000', textAlign: 'center' }}>
                                                Already have an account? <Link to='/employeelogin' style={{ color: palette.secondary.dark, fontWeight: 'bold', fontSize: '12px' }}>Login Now!</Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default EmployeeRegister;
