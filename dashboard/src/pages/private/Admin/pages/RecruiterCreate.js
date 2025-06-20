import React, { useState, useEffect, useMemo } from 'react';
import {
    Box, Button, Divider, FormControl, FormControlLabel, Grid, IconButton, InputAdornment,
    Stack, TextField, Typography, Card, CardContent, Radio, RadioGroup,
    useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDispatch } from 'react-redux';
import { recruiterCreated } from '../../../../reduxSlice/recruiterSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecruiterCreate = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const validationSchema = useMemo(() => yup.object({
        first_name: yup.string().min(3, 'First name should be at least 3 characters').required('First name is required'),
        last_name: yup.string().min(3, 'Last name should be at least 3 characters').required('Last name is required'),
        role: yup.number().min(1, 'Role should be at least 1').required('Role is required'),
        mobile: yup.string().min(10, 'Phone number should be at least 10 characters').required('Phone number is required'),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        gender: yup.string().required('Gender is required'),
        job_function: yup.string().required('Job functio is required'),
        years: yup.number().required('Experience in years is required'),
        months: yup.number().required('Experience in months is required'),
        skills: yup.string().required('Skills are required'),
        education: yup.string().required('Education is required'),
        pin_code: yup.string().min(6, 'Pin code should be at least 6 characters').max(6, 'Pin code should be 6 characters').required('Pin code is required'),
        locality: yup.string().required('Locality is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        password: yup.string().min(6, 'Password should be at least 6 characters').max(8, 'Password should not exceed 8 characters').required('Password is required'),
        profileImage: yup.mixed().required("Profile Image is required").test("fileType", "Unsupported File Format", value => {
            return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }),
    }), []);

    const formik = useFormik({
        initialValues: {
            first_name: "", last_name: "", gender: "", email: "",
            role: "", mobile: "", years: "", months: "", job_function: "",
            skills: "", education: "", pin_code: "", locality: "",
            city: "", state: "", password: "", profileImage: null
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                await dispatch(recruiterCreated(values)).unwrap();
                toast.success('OTP sent to your email successfully');
                navigate('/otpinput');
            } catch (error) {
                console.error('Failed to create recruiter:', error);
                toast.error('Failed to send OTP to your email');
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        return () => {
            if (profileImage) {
                URL.revokeObjectURL(profileImage);
            }
        };
    }, [profileImage]);

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("profileImage", file);

        if (file) {
            if (profileImage) {
                URL.revokeObjectURL(profileImage);
            }
            const newUrl = URL.createObjectURL(file);
            setProfileImage(newUrl);
        }
    };

    const commonStyle = { background: '#F1F2F5' };

    const handleToggle = () => {
        setToggle((prev) => !prev);
    };
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={toggle}
                newestOnTop={toggle}
                closeOnClick={handleToggle}
                rtl={toggle}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Box sx={{ height: '91vh', mt: 1, overflowY: 'scroll' }}>
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item md={6} xs={12}>
                        <Card elevation={2} sx={{ backdropFilter: 'blur(10px)' }}>
                            <CardContent component='form' onSubmit={formik.handleSubmit}>
                                <Stack alignItems="center">
                                    <Typography variant="h4" fontWeight='bold'>
                                        Create Recruiter
                                    </Typography>
                                </Stack>
                                <Divider sx={{ my: 2 }} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Stack direction={'row'} justifyContent={'center'} alignItems="center">
                                            <Box
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    mb: 2,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#F1F2F5',
                                                    backgroundImage: profileImage ? `url(${profileImage})` : 'none',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    position: 'relative',
                                                }}
                                            >
                                                {profileImage && (
                                                    <Box
                                                        component="img"
                                                        alt="Profile Image"
                                                        src={profileImage}
                                                        sx={{ display: 'none' }}
                                                    />
                                                )}
                                            </Box>
                                            <IconButton
                                                component="label"
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                            >
                                                <AddAPhotoIcon sx={{
                                                    zIndex: 99,
                                                    borderRadius: '50%',
                                                    color: '#1FEFE',
                                                    border: '1px solid #F1F2F5',
                                                    fontSize: '25px',
                                                    p: 0.5,
                                                    position: 'absolute',
                                                    right: 4,
                                                    top: 2,
                                                }} />
                                                <input
                                                    hidden
                                                    name='profileImage'
                                                    accept="image/*"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                            </IconButton>
                                            {formik.touched.profileImage && formik.errors.profileImage && (
                                                <Typography variant="body2" color="error">
                                                    {formik.errors.profileImage}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Grid>

                                    {[
                                        { name: 'first_name', label: 'First Name', md: 6 },
                                        { name: 'last_name', label: 'Last Name', md: 6 },
                                        { name: 'role', label: 'Role', md: 6 },
                                        { name: 'mobile', label: 'Phone Number', md: 6 },
                                        { name: 'years', label: 'Years of Experience', md: 6 },
                                        { name: 'months', label: 'Months of Experience', md: 6 },
                                        { name: 'skills', label: 'Skills', md: 12 },
                                        { name: 'job_function', label: 'job_function', md: 12 },
                                        { name: 'education', label: 'Education', md: 12 },
                                        { name: 'pin_code', label: 'Pin Code', md: 6 },
                                        { name: 'locality', label: 'Locality', md: 6 },
                                        { name: 'city', label: 'City', md: 6 },
                                        { name: 'state', label: 'State', md: 6 },
                                        { name: 'email', label: 'Email', md: 12 }
                                    ].map(({ name, label, md }) => (
                                        <Grid item xs={12} md={md} key={name}>
                                            <Typography variant="body2">{label}*</Typography>
                                            <TextField
                                                style={commonStyle}
                                                {...formik.getFieldProps(name)}
                                                error={formik.touched[name] && Boolean(formik.errors[name])}
                                                helperText={formik.touched[name] && formik.errors[name]}
                                                fullWidth
                                                size="small"
                                            // placeholder={label}
                                            />
                                        </Grid>
                                    ))}

                                    <Grid item xs={12}>
                                        <Typography variant="body2">Gender*</Typography>
                                        <FormControl>
                                            <RadioGroup
                                                {...formik.getFieldProps('gender')}
                                                row
                                                name='gender'
                                            >
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography variant="body2">Password*</Typography>
                                        <TextField
                                            style={commonStyle}
                                            {...formik.getFieldProps('password')}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                            fullWidth
                                            size="small"
                                            type={showPassword ? 'text' : 'password'}
                                            // placeholder="Password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} mt={1}>
                                        <Stack direction={'row'} gap={2} justifyContent='space-between'>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: theme.palette.primary.main,
                                                    transition: 'background-color 0.6s ease-out',
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.primary.deem,
                                                    }
                                                }}
                                                disabled={formik.isSubmitting}
                                                fullWidth
                                            >
                                                {formik.isSubmitting ? 'Submitting...' : 'Create Recruiter'}
                                            </Button>
                                            <Button
                                                type="reset"
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                fullWidth
                                                onClick={() => formik.resetForm()}
                                            >
                                                Reset
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default RecruiterCreate;
