import React, { useState, useMemo } from 'react';
import { Box, Button, Grid, Typography, TextField, Stack, Card, CardContent, IconButton, InputAdornment, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Visibility, VisibilityOff, DoneRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobImage from '../../../assets/images/bg6.jpeg';
import LoginImg from '../../../assets/images/login3.jpg';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { candidateLogin, sendCandidateResetOtp, resetCandidatePassword, clearOtpStatus } from '../../../reduxSlice/candidateSlice';

const CondidateLogin = () => {
    const navigate = useNavigate();
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const [openForgotModal, setOpenForgotModal] = useState(false);
    const [otpStage, setOtpStage] = useState(false);
    const [otpData, setOtpData] = useState({
        email: '',
        otp: '',
        newPassword: ''
    });

    const validationSchema = useMemo(() => yup.object({
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup.string().min(6, 'Password should be at least 6 characters').max(12, 'Password should not exceed 8 characters').required('Password is required'),
    }), []);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await dispatch(candidateLogin(values)).then(unwrapResult);
                toast.success(res?.message);
                navigate('/')
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
            <Box sx={{
                position: 'relative',
                backgroundImage: `url(${JobImage})`,
                height: { md: '88vh', xs: '80vh' }, width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}>
                <Box sx={{
                    position: 'absolute', display: 'flex', alignItems: 'center', backdropFilter: 'blur(15px)', width: '100%', height: '100%'
                }}>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={4} >
                            <Box
                                sx={{
                                    display: { md: 'block', xs: 'none' },
                                    position: 'relative',
                                    backdropFilter: 'blur(10px)',
                                    backgroundImage: `url(${LoginImg})`,
                                    backgroundSize: 'cover',
                                    height: '100%'
                                }}>
                                <Box sx={{
                                    position: 'absolute', background: 'rgba(0,0,0,0.5)', width: '100%', height: '100%'
                                }}>
                                    <Stack sx={{ p: 10 }}>
                                        <Typography sx={{ color: '#fdfdfd' }} variant='h4' fontWeight={'bold'}>Find your dream job</Typography>
                                        <Typography variant='h6' sx={{ color: '#fdfdfd', display: 'flex', fontSize: '13px', alignItems: 'center' }}><DoneRounded sx={{ px: 1 }} />One Click Apply</Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Card elevation={2} sx={{ p: 1, m: { md: 0, xs: 1 }, backdropFilter: 'blur(10px)', }}>
                                <CardContent component="form" onSubmit={formik.handleSubmit}>
                                    <Stack direction="column" sx={{ p: 3 }}>
                                        <Typography variant='h6' fontWeight={'bold'} textAlign={'center'} sx={{ pb: 2 }}>Login to your Timesjobs account</Typography>
                                        <Stack direction={'column'}>
                                            <Typography sx={{ my: 1, textAlign: 'left' }}>Email / Login Id:</Typography>
                                            <TextField
                                                sx={{ border: '1px solid #9e9e9e' }}
                                                {...formik.getFieldProps('email')}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                                size="small"
                                                fullWidth
                                                placeholder="Email Address"
                                                autoComplete='off'
                                            />
                                        </Stack>
                                        <Stack direction={'column'}>
                                            <Typography sx={{ my: 1, textAlign: 'left' }}>Password:</Typography>
                                            <TextField
                                                sx={{ border: '1px solid #9e9e9e' }}
                                                {...formik.getFieldProps('password')}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helperText={formik.touched.password && formik.errors.password}
                                                size="small"
                                                placeholder="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
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
                                                }}
                                            />
                                        </Stack>
                                        <Stack direction={'row'} sx={{ my: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography onClick={() => setOpenForgotModal(true)} style={{ cursor: 'pointer', textDecoration: 'none', fontSize: '10px', color: '#000' }}>
                                                Forget Password?
                                            </Typography>
                                            <Button
                                                type="submit"
                                                size="small"
                                                variant="contained"
                                                sx={{
                                                    p: 1,
                                                    width: '150px',
                                                    transition: '0.5s ease-out',
                                                    background: palette.secondary.main,
                                                    '&:hover': {
                                                        background: palette.secondary.main,
                                                    }
                                                }}
                                            >
                                                Submit
                                            </Button>
                                        </Stack>
                                        <Typography sx={{ color: '#000', mt: 1 }}>
                                            Don't have an account? <Link to='/condidateregister' style={{ color: palette.secondary.dark, fontWeight: 'bold', fontSize: '12px' }}>Register Now!</Link>
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
            <Dialog open={openForgotModal} onClose={() => {
                setOpenForgotModal(false);
                setOtpStage(false);
                setOtpData({ email: '', otp: '', newPassword: '' });
            }} fullWidth>
                <DialogTitle>Forgot Password</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        {!otpStage ? (
                            <>
                                <TextField
                                    label="Registered Email"
                                    size="small"
                                    fullWidth
                                    value={otpData.email}
                                    onChange={(e) => setOtpData({ ...otpData, email: e.target.value })}
                                />
                                <Button variant="contained" onClick={async () => {
                                    try {
                                        if (!otpData.email) return toast.error("Please enter email");
                                        const result = await dispatch(sendCandidateResetOtp(otpData.email)).then(unwrapResult);
                                        toast.success(result);
                                        setOtpStage(true);
                                    } catch (error) {
                                        toast.error(error.message);
                                    }
                                }}>Send OTP</Button>
                            </>
                        ) : (
                            <>
                                <TextField
                                    label="OTP"
                                    size="small"
                                    fullWidth
                                    value={otpData.otp}
                                    onChange={(e) => setOtpData({ ...otpData, otp: e.target.value })}
                                />
                                <TextField
                                    label="New Password"
                                    type="password"
                                    size="small"
                                    fullWidth
                                    value={otpData.newPassword}
                                    onChange={(e) => setOtpData({ ...otpData, newPassword: e.target.value })}
                                />
                                <Button variant="contained" onClick={async () => {
                                    try {
                                        const result = await dispatch(resetCandidatePassword(otpData)).then(unwrapResult);
                                        toast.success(result);
                                        setOpenForgotModal(false);
                                        setOtpStage(false);
                                        setOtpData({ email: '', otp: '', newPassword: '' });
                                    } catch (error) {
                                        toast.error(error.message);
                                    }
                                }}>Reset Password</Button>
                            </>
                        )}
                    </Stack>
                </DialogContent>
            </Dialog>

        </>
    );
};

export default CondidateLogin;
