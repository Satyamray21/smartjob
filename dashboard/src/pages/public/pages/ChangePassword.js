import React, { useRef, useState } from 'react';
import {
    Box, InputBase, Button, Toolbar, useTheme, Typography, Grid, Paper,
    TextField, IconButton, InputAdornment,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { verifyOTP, confirmPassword, changePasswordByOtp } from '../../../reduxSlice/recruiterSlice';
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import OtpTimer from '../../../pages/private/Admin/pages/OtpTimer';

const OTP = ({ separator, length, value, onChange, disabled }) => {
    const inputRefs = useRef(new Array(length).fill(null));

    const handleFocusChange = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < length) {
            inputRefs.current[newIndex].focus();
        }
    };

    const handleChange = (event, index) => {
        const newValue = event.target.value.slice(-1);
        if (/^\d*$/.test(newValue)) {
            const newOTP = value.substring(0, index) + newValue + value.substring(index + 1);
            onChange(newOTP);
            if (newValue && index < length - 1) handleFocusChange(index, 1);
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            if (value[index]) {
                const newOTP = value.substring(0, index) + '' + value.substring(index + 1);
                onChange(newOTP);
            } else if (index > 0) {
                handleFocusChange(index, -1);
            }
        } else if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
            handleFocusChange(index, event.key === 'ArrowLeft' ? -1 : 1);
        }
    };

    const handlePaste = (event) => {
        const pastedData = event.clipboardData.getData('text').slice(0, length);
        if (/^\d+$/.test(pastedData)) {
            onChange(pastedData.padEnd(length, ''));
            inputRefs.current[Math.min(pastedData.length - 1, length - 1)].focus();
        }
        event.preventDefault();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Array.from({ length }, (_, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                    <InputBase
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        value={value[index] || ''}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        inputProps={{ 'aria-label': `Digit ${index + 1}`, maxLength: 1, disabled }}
                        sx={{
                            width: 40,
                            height: '40px',
                            pl: 2,
                            borderRadius: '5px',
                            backgroundColor: disabled ? '#e0e0e0' : '#f0f2f9',
                            pointerEvents: disabled ? 'none' : 'auto',
                        }}
                    />
                    {index < length - 1 && separator}
                </Box>
            ))}
        </Box>
    );
};

const ChangePassword = () => {
    const { palette, spacing } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [isExpired, setIsExpired] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleTimerComplete = () => {
        setIsExpired(true);
        toast.warning('OTP expired, please request a new one.');
    };
    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password: '',
            otp: '',
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(changePasswordByOtp(values)).unwrap();
                toast.success('Password changed successfully');
                resetForm();
                navigate('/login');
            } catch (error) {
                toast.error(error.message || 'An error occurred');
            }
        },
    });

    return (
        <>
            <Toolbar />
            <ToastContainer position="top-center" />
            <Box sx={{
                // backgroundImage: `url(${RG})`,
                background: palette.primary.main,
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundSize: 'cover',
            }}>
                <Grid container md={9} sx={{ backdropFilter: 'blur(5px)', p: 1 }}>
                    <Grid item xs={12} lg={4} md={4} sx={{ m: 'auto' }}>
                        <Paper sx={{
                            borderRadius: '20px',
                            p: spacing(3),
                            my: spacing(6),
                            background: 'transparent',
                            boxShadow: '1px 1px 10px 1px #F0FAF9',
                            backdropFilter: 'blur(15px)'
                        }}>
                            <Typography variant="h4" sx={{ color: palette.primary.main, fontWeight: 'bold', textAlign: 'center' }}>
                                OTP Verification
                            </Typography>
                            <Typography variant="body1" sx={{ color: palette.primary.dark, fontWeight: 'bold', py: 1, textAlign: 'center' }}>
                                Enter the OTP sent to your reset password
                            </Typography>
                            <Box sx={{ mx: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <TimerOutlinedIcon sx={{ fontSize: '15px', color: palette.error.main, mr: 1 }} />
                                    <OtpTimer initialTime={120} onTimerComplete={handleTimerComplete} />
                                </Box>
                                <Box > <Typography sx={{ mt: -2, }}>Entered value: <Typography component={'span'} sx={{ color: '#5F6DC1' }}>{otp}</Typography></Typography></Box>
                            </Box>
                            <Box
                                component="form"
                                onSubmit={formik.handleSubmit}
                                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}
                            >
                                <OTP separator={<Typography component={'span'} sx={{ mx: 1 }}>-</Typography>} value={otp} onChange={setOtp} length={5} />
                                <TextField
                                    style={{ border: '1px solid #F0FAF9', }}
                                    fullWidth
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    sx={{ marginBottom: "20px", marginTop: "40px" }}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    style={{ border: '1px solid #F0FAF9', }}
                                    fullWidth
                                    id="confirm_password"
                                    name="confirm_password"
                                    placeholder="Confirm Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formik.values.confirm_password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                    helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ my: spacing(2), boxShadow: '1px 1px 10px 1px #F0FAF9', }}
                                >
                                    Change Password
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ChangePassword;
