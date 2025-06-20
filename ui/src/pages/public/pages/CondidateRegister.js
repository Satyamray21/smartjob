import React, { useEffect, useMemo, useState } from 'react';
import {
    Box, Button, CssBaseline, Stack, TextField, Grid, Typography,
    useTheme, InputAdornment, IconButton, Divider, Card, CardContent, Avatar
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginImg from '../../../assets/images/register1.avif';
import MaskImage from '../../../assets/images/registe3.webp';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { uploadCandidate } from '../../../reduxSlice/candidateSlice';

const CondidateRegister = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
    const [resumeName, setResumeName] = useState(null);

    const validationSchema = useMemo(() => yup.object({
        name: yup.object({
            first_name: yup.string().required('First name is required'),
            last_name: yup.string().required('Last name is required'),
        }),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        mobile: yup.string().min(10).required('Mobile number is required')
            .matches(/^[1-9]\d{9}$/, "Invalid Contact Number"),
        job_function: yup.string().required('Job Function is required'),
        experience: yup.object().shape({
            years: yup.number().typeError("Years must be a number").required('Years required'),
            months: yup.number().typeError("Months must be a number").required('Months required')
        }),
        current_location: yup.string().required('Location is required'),
        key_skills: yup.string().required('Key skills are required'),
        password: yup.string().required('Password is required'),
        confirm_password: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        candidateResume: yup.mixed().required('Resume is required'),
        profilePhoto: yup.mixed().required('Profile photo is required'),
    }), []);

    const formik = useFormik({
        initialValues: {
            name: { first_name: '', last_name: '' },
            email: '',
            mobile: '',
            job_function: '',
            experience: {
                years: 0,
                months: 0,
            },
            current_location: '',
            key_skills: '',
            password: '',
            confirm_password: '',
            candidateResume: null,
            profilePhoto: null,
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
            formData.append('years', values.experience.years || 0);
            formData.append('months', values.experience.months || 0);
            formData.append('key_skills', values.key_skills);
            formData.append('password', values.password);
            formData.append('candidateResume', values.candidateResume);
            formData.append('profilePhoto', values.profilePhoto);

            try {
                const res = await dispatch(uploadCandidate(formData)).then(unwrapResult);
                toast.success(res?.message || 'Candidate registered successfully!');
                navigate('/condidatelogin');
            } catch (error) {
                toast.error(error.message || 'Registration failed!');
            }
        },
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleFileChange = (event, fieldName) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue(fieldName, file);
            if (fieldName === 'profilePhoto') {
                const url = URL.createObjectURL(file);
                setProfilePhotoUrl(url);
            }
            if (fieldName === 'candidateResume') {
                setResumeName(file.name);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (profilePhotoUrl) URL.revokeObjectURL(profilePhotoUrl);
        };
    }, [profilePhotoUrl]);

    return (
        <>
            <ToastContainer position='top-right' />
            <CssBaseline />
            <Box sx={{
                position: 'relative',
                backgroundImage: `url(${MaskImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                height: { md: '120vh', xs: 'auto' },
                width: '100%'
            }}>
                <Box sx={{ position: 'absolute', background: 'rgba(0,0,0,0.2)', width: '100%', height: '100%' }}>
                    <Grid container justifyContent={'center'} sx={{ py: 3, p: 1, backdropFilter: 'blur(20px)' }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{
                                backgroundImage: `url(${LoginImg})`,
                                backgroundSize: 'cover',
                                height: '100%',
                                position: 'relative',
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    background: 'rgba(25,55,125,0.5)',
                                    width: '100%',
                                    height: '100%'
                                }}>
                                    <Stack sx={{ p: 10 }}>
                                        <Typography variant='h4' sx={{ color: '#fff', fontWeight: 'bold' }}>
                                            Find your dream job
                                        </Typography>
                                        <Typography variant='h6' sx={{ color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center' }}>
                                            <DoneRoundedIcon sx={{ px: 1 }} /> One Click Apply
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item md={5} xs={12}>
                            <Card elevation={1}>
                                <CardContent component="form" onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} justifyContent="center" display="flex">
                                            <Avatar
                                                src={profilePhotoUrl}
                                                sx={{ width: 80, height: 80 }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="outlined" component="label" fullWidth>
                                                Upload Profile Photo
                                                <input
                                                    hidden
                                                    accept="image/*"
                                                    type="file"
                                                    name="profilePhoto"
                                                    onChange={(e) => handleFileChange(e, 'profilePhoto')}
                                                />
                                            </Button>
                                            {formik.errors.profilePhoto && formik.touched.profilePhoto && (
                                                <Typography color="error" fontSize={12}>
                                                    {formik.errors.profilePhoto}
                                                </Typography>
                                            )}
                                        </Grid>

                                        {[
                                            { label: "First Name", name: "name.first_name" },
                                            { label: "Last Name", name: "name.last_name" },
                                            { label: "Email", name: "email" },
                                            { label: "Mobile", name: "mobile" },
                                            { label: "Job Function", name: "job_function" },
                                            { label: "Current Location", name: "current_location" },
                                            { label: "Key Skills", name: "key_skills" },
                                            { label: "Password", name: "password", type: showPassword ? 'text' : 'password' },
                                            { label: "Confirm Password", name: "confirm_password", type: 'password' }
                                        ].map(({ label, name, type = "text" }) => (
                                            <Grid item xs={12} key={name}>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    label={label}
                                                    type={type}
                                                    {...formik.getFieldProps(name)}
                                                    error={formik.touched[name] && Boolean(formik.errors[name])}
                                                    helperText={formik.touched[name] && formik.errors[name]}
                                                    InputProps={name === "password" ? {
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton onClick={handleClickShowPassword}>
                                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    } : undefined}
                                                />
                                            </Grid>
                                        ))}

                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Experience Years"
                                                type="number"
                                                {...formik.getFieldProps("experience.years")}
                                                error={formik.touched.experience?.years && Boolean(formik.errors.experience?.years)}
                                                helperText={formik.touched.experience?.years && formik.errors.experience?.years}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Experience Months"
                                                type="number"
                                                {...formik.getFieldProps("experience.months")}
                                                inputProps={{ min: 0, max: 12 }}
                                                error={formik.touched.experience?.months && Boolean(formik.errors.experience?.months)}
                                                helperText={formik.touched.experience?.months && formik.errors.experience?.months}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button variant="outlined" component="label" fullWidth>
                                                Upload Resume
                                                <input
                                                    hidden
                                                    accept=".pdf"
                                                    type="file"
                                                    name="candidateResume"
                                                    onChange={(e) => handleFileChange(e, 'candidateResume')}
                                                />
                                            </Button>
                                            {resumeName && (
                                                <Typography fontSize={12} sx={{ mt: 1 }}>
                                                    {resumeName}
                                                </Typography>
                                            )}
                                            {formik.errors.candidateResume && formik.touched.candidateResume && (
                                                <Typography color="error" fontSize={12}>
                                                    {formik.errors.candidateResume}
                                                </Typography>
                                            )}
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button fullWidth variant="contained" type="submit">
                                                Register
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider>OR</Divider>
                                            <Typography textAlign="center">
                                                Already have an account?{" "}
                                                <Link to="/condidatelogin" style={{ color: palette.primary.main, fontWeight: 600 }}>
                                                    Login Now!
                                                </Link>
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

export default CondidateRegister;
