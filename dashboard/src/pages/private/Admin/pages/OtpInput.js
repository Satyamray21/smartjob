import React, { useRef, useState } from 'react';
import { Box, InputBase, Button, Toolbar, useTheme, Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import OtpTimer from './OtpTimer';
import { resendOTP, verifyOTP } from '../../../../reduxSlice/recruiterSlice';

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

const OTPInput = () => {
    const { palette, spacing } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [isExpired, setIsExpired] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const formik = useFormik({
        initialValues: { otp: '' },
        onSubmit: async () => {
            if (isExpired) {
                toast.error('OTP has expired. Please request a new one.');
                return;
            }

            try {
                const parsedOtp = parseInt(otp, 10);
                const result = await dispatch(verifyOTP({ otp: parsedOtp })).then(unwrapResult);
                toast.success(result.message);
                if (result?.Status) navigate('/createrecruiters');
            } catch {
                toast.error('OTP verification failed');
            }
        },
    });

    const handleTimerComplete = () => {
        setIsExpired(true);
        setIsResendDisabled(false);
        toast.warning('OTP expired, please request a new one.');
    };

    const handleResendOTP = async () => {
        try {
            await dispatch(resendOTP());
            setOtp('');
            setIsResendDisabled(true);
            setIsExpired(false);
            toast.success('OTP has been resent.');
        } catch {
            toast.error('Failed to resend OTP.');
        }
    };

    return (
        <>
            <Toolbar />
            <ToastContainer position="top-center" />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
                <Grid container sx={{ backdropFilter: 'blur(5px)' }}>
                    <Grid item xs={12} lg={4} md={4} sx={{ m: 'auto' }}>
                        <Paper sx={{
                            borderRadius: '20px',
                            // background: palette.info.light,
                            p: spacing(4),
                            py: spacing(6),
                            backdropFilter: 'blur(15px)'
                        }}>
                            <Typography variant="h4" sx={{ color: palette.primary.main, fontWeight: 'bold', textAlign: 'center' }}>
                                OTP Verification
                            </Typography>
                            <Typography variant="body1" sx={{ color: palette.primary.dark, fontWeight: 'bold', py: 1, textAlign: 'center' }}>
                                Enter the OTP sent to your registered mobile number
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
                                sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 3 }}
                            >
                                <OTP separator={<Typography component={'span'} sx={{ mx: 1 }}></Typography>} value={otp} onChange={setOtp} length={5} disabled={isExpired} />
                                <Box sx={{ display: 'flex', alignItems: 'center', mx: 2, justifyContent: 'space-between', width: '100%' }}>
                                    <Button type="submit" variant="contained" disabled={isExpired}>
                                        Verify OTP
                                    </Button>
                                    <Button variant="outlined" onClick={handleResendOTP} disabled={isResendDisabled}>
                                        Resend OTP
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default OTPInput;
