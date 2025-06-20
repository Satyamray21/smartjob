import React, { useState, useCallback } from 'react';
import {
	Box, Button, Card, CardContent, InputAdornment, IconButton,
	FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography,
	useTheme, Divider
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { recruiterLogin } from '../../../reduxSlice/recruiterSlice';
import { adminLogin } from './../../../reduxSlice/adminSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Img1 from '../../../assets/images/newsletter3.jpg';
import { EmailOutlined, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { unwrapResult } from '@reduxjs/toolkit';
const Login = () => {
	const { palette } = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const [role, setRole] = useState('');

	const handleClickShowPassword = () => setShowPassword(prev => !prev);
	const handleRoleChange = useCallback((e) => setRole(e.target.value), []);


	const fieldStyles = {
		borderRadius: '5px',
		border: '1px solid #eee',
		color: '#f0f1f9',
		fontWeight: 100,
		spacing: 1
	};

	const formik = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Email is required'),
			password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
		}),
		onSubmit: async (values) => {
			try {
				let response;
				if (role === 'Admin') {
					response = await dispatch(adminLogin(values)).then(unwrapResult);
				} else if (role === 'Recruiter') {
					response = await dispatch(recruiterLogin(values)).then(unwrapResult);
				}

				if (response) {
					console.log('login process', response?.data?.details?.role);
					if (response?.data?.details?.role === 1) {
						toast.success('Admin login successful!');
						window.location.href = ('/')
					} else if (response?.data?.details?.role === 2) {
						toast.success('Recruiter login successful!');
						window.location.href = ('/')
					}
				}
			} catch (error) {
				console.error('Login error:', error); // Log the error to understand the issue
				toast.error('Invalid Credentials');
			}

		},
	});
	const renderTextField = (label, name, type = 'text', showPasswordToggle = false) => (
		<>
			<Typography variant={'body2'} sx={{ my: 1, textAlign: 'left' }}>{label}:</Typography>
			<TextField
				{...formik.getFieldProps(name)}
				error={formik.touched[name] && Boolean(formik.errors[name])}
				helperText={formik.touched[name] && formik.errors[name]}
				size="small"
				fullWidth
				placeholder={label.toLowerCase()}
				autoComplete="off"
				InputProps={{
					sx: fieldStyles,
					startAdornment: (
						<InputAdornment position="start">
							{name === 'email' ? <EmailOutlined sx={{ fontSize: '15px', color: palette.primary.main }} /> : <LockOutlined sx={{ fontSize: '15px', color: palette.primary.main }} />}
						</InputAdornment>
					),
					...(showPasswordToggle && {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton size="small" onClick={handleClickShowPassword} edge="end">
									{showPassword ? <Visibility sx={{ color: palette.primary.main }} /> : <VisibilityOff sx={{ color: palette.primary.main }} />}
								</IconButton>
							</InputAdornment>
						),
					}),
				}}
				type={showPasswordToggle && name === 'password' ? (showPassword ? 'text' : 'password') : type}
			/>
		</>
	);

	return (
		<>
			<ToastContainer position="top-center" autoClose={3000} pauseOnFocusLoss draggable />
			<Box sx={{ backgroundImage: `url(${Img1})`, backgroundSize: 'cover', height: { md: '100vh', xs: '95vh' }, position: 'relative', backgroundAttachment: 'fixed', }}
			>
				<Box sx={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
					<Grid container item md={8} sx={{ px: 2, m: 1, backgroundColor: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(5px)', border: 1, borderRadius: 2 }}>
						<Grid item xs={12} lg={5} sx={{ margin: 'auto', my: 4 }}>
							<Card sx={{ borderRadius: 2, backgroundColor: 'rgba(0,0,0,0.1)', color: '#f0faf9', backdropFilter: 'blur(15px)' }}>
								<CardContent>
									<Stack alignItems="center" spacing={2}>
										<AccountCircleIcon sx={{ height: 80, width: 80, color: '#F0FAF9' }} />
										<FormControl>
											<Typography variant='h5' textAlign="center">What's your role?</Typography>
											<RadioGroup row value={role} onChange={handleRoleChange}>
												<FormControlLabel value="Admin" control={<Radio />} label="Admin" />
												<FormControlLabel value="Recruiter" control={<Radio />} label="Recruiter" />
											</RadioGroup>
										</FormControl>
									</Stack>
									<Box component="form" onSubmit={formik.handleSubmit} sx={{ px: 2, mt: 2 }}>
										{renderTextField('Email', 'email')}
										{renderTextField('Password', 'password', 'password', true)}
										<Typography
											variant="body2"
											sx={{ mt: 2, cursor: 'pointer', color: '#F0FAF9' }}
											onClick={() => navigate('/email')}
										>
											Forgot password?
										</Typography>
										<Button type="submit" size='lg' variant="contained" sx={{ mt: 2, borderRadius: 2 }}>
											Log In
										</Button>
										<Divider sx={{ bgcolor: '#FDFDFD', mt: 2 }} />
										<Typography variant='body2' sx={{ textAlign: 'center', mt: 2 }}>
											Don't have an account?{' '}
											<Link to="/register" style={{ color: palette.error.main, fontWeight: 'bold' }}>
												Register Now!
											</Link>
										</Typography>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	);
};

export default Login;
