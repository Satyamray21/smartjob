import React, { useMemo } from 'react';
import { Box, Button, Container, Stack, TextField, Typography, CircularProgress, useTheme, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import RG from '../../../assets/images/newsletter3.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../../reduxSlice/recruiterSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Email = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.RECRUITER);

    // Memoized validation schema for performance optimization
    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                email: yup.string().email('Invalid email address').required('Email is required'),
            }),
        []
    );

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                await dispatch(verifyEmail({ email: values.email })).unwrap();
                toast.success('OTP sent to your email successfully');
                navigate('/changepassword');
            } catch (error) {
                toast.error(error.message || 'Failed to send email. Please try again.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${RG})`,
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Box
                    sx={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0, 0.5)',
                    }}
                >
                    <Container maxWidth='sm'>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                backgroundColor: 'rgba(255,255,255,0.3)',
                                boxShadow: '-2px 0px 20px -10px',
                            }}
                        >
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <Typography component='h1' variant='h5' align='center'>
                                        OTP Sent to Your Email
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        id='email'
                                        name='email'
                                        type='email'
                                        variant='outlined'
                                        placeholder='Enter your email'
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        sx={{ border: '1px solid #1b5e20' }}
                                        required
                                    />
                                    <Box textAlign='center'>
                                        {loading ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            <Button
                                                type='submit'
                                                fullWidth
                                                variant='contained'
                                                sx={{ backgroundColor: theme.palette.primary.main }}
                                            >
                                                Send Email
                                            </Button>
                                        )}
                                    </Box>
                                </Stack>
                            </form>
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default Email;
