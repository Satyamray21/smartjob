import React, { useState, useRef } from 'react';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { Box, Button, Grid, Stack, Paper, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { verifyOTP } from '../../../reduxSlice/adminSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const OtpInput = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState(new Array(5).fill(""));
    const inputs = useRef([]);

    const formik = useFormik({
        initialValues: {
            otp: ""
        },

        onSubmit: async (values) => {
            const combinedOtp = otp.join("");
            const data = {
                otp: combinedOtp,
            };

            try {
                const resultAction = await dispatch(verifyOTP(data));
                const res = unwrapResult(resultAction);
                toast(res.message);
                if (res?.Status) {
                    navigate('/login');
                }
            } catch (error) {
                toast.error('Verification failed');
            }
        },
    });

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index !== 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <Box style={{ backgroundColor: palette.primary.dark }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: { md: '60vh', xs: '100%' } }}>
            <Paper sx={{ m: 2, mt: 2, p: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <Stack alignItems="center" sx={{ px: 2 }}>
                            <Box sx={{ borderRadius: '50%', height: '40px', width: '40px', p: 1 }} style={{ backgroundColor: palette.primary.main }}>
                                <GppGoodIcon sx={{ fontSize: '40px', color: '#fff' }} />
                            </Box>
                            <Typography component="h1" variant="h5" sx={{ py: 2 }}>
                                OTP Verification
                            </Typography>
                            <Typography style={{ color: palette.primary.main }} sx={{ py: 1 }}>
                                Enter the 5 digit verification code received on your Email ID
                            </Typography>
                        </Stack>
                        <Stack sx={{ px: 2 }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography>Verification Code</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} mt={2} justifyContent={'center'}>
                            {otp.map((data, index) => (
                                <TextField
                                    key={index}
                                    type="text"
                                    inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                    value={data}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputs.current[index] = el)}
                                    sx={{ width: '45px', margin: '0 8px' }}
                                />
                            ))}
                        </Stack>
                        <Stack display={'flex'} m={2} alignItems={'center'} justifyContent={'center'}>
                            <Button
                                sx={{ width: '150px' }}
                                type="submit"
                                variant="contained"
                                onClick={formik.handleSubmit}
                            >
                                Verify OTP
                            </Button>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                            <Typography>Didn't receive code?</Typography>
                            <Button variant='text' size='small'>Resend OTP</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default OtpInput;
