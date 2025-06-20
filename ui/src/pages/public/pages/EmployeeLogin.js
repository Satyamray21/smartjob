import React, { useState, useMemo } from 'react';
import {
    Box, Button, Grid, Typography, TextField, Stack,
    Card, CardContent, IconButton, InputAdornment, Divider
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = useMemo(() =>
        yup.object({
            email: yup.string().email('Enter a valid email').required('Email is required'),
            password: yup.string().min(6, 'Password should be at least 6 characters').max(8, 'Password should not exceed 8 characters').required('Password is required'),
        }), []);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const resultAction = await dispatch((values));
                const result = unwrapResult(resultAction);

                toast[result?.Status ? 'success' : 'error'](result?.message);
                if (result?.Status) {
                    navigate('/');
                    resetForm();
                }
            } catch (error) {
                toast.error(error.message || "Login failed. Please try again.");
            }
        },
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const customTextFieldStyles = {
        fullWidth: true,
        InputLabelProps: {
            sx: { fontSize: '16px' },
        },
        sx: {
            '& .MuiInputBase-root': {
                height: '50px',
                fontSize: '16px',
                borderRadius: '10px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                px: 1,
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ccc',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1e88e5',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1e88e5',
                borderWidth: '2px',
            },
            '& .MuiFormHelperText-root': {
                fontSize: '13px',
                ml: 0,
            },
        }
    };

    return (
        <>
            <ToastContainer />
            <Box
                sx={{
                    minHeight: '50vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
                    py: 4,
                }}
            >
                <Grid container spacing={2} justifyContent="center" maxWidth="lg">
                    <Grid item xs={12} md={6}>
                        <Card
                            elevation={3}
                            sx={{
                                borderRadius: 3,
                                p: { xs: 2, md: 4 },
                                backgroundColor: 'white',
                            }}
                        >
                            <CardContent component="form" onSubmit={formik.handleSubmit}>
                                <Stack spacing={3}>
                                    <Box textAlign="center">
                                        <Typography variant="h5" fontWeight="bold" color="primary.dark">
                                            Login
                                        </Typography>
                                        <Divider sx={{ mt: 1, backgroundColor: 'primary.main' }} />
                                    </Box>

                                    {/* Email */}
                                    <TextField
                                        label="Email Address"
                                        {...formik.getFieldProps('email')}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineIcon fontSize="small" color="action" />
                                                </InputAdornment>
                                            )
                                        }}
                                        {...customTextFieldStyles}
                                    />

                                    {/* Password */}
                                    <TextField
                                        label="Password"
                                        {...formik.getFieldProps('password')}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon fontSize="small" color="action" />
                                                </InputAdornment>
                                            ),
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
                                            )
                                        }}
                                        {...customTextFieldStyles}
                                    />

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{
                                            py: 1.3,
                                            fontWeight: 'bold',
                                            fontSize: '15px',
                                            borderRadius: 2,
                                            textTransform: 'none',
                                        }}
                                    >
                                        Login
                                    </Button>

                                    <Typography textAlign="center" fontSize="14px">
                                        <Link to="/forgetpassword" style={{ textDecoration: 'none', color: '#1e88e5' }}>
                                            Forgot Password?
                                        </Link>
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default EmployeeLogin;
