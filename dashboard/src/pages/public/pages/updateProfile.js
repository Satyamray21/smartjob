import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button, TextField, Paper, Grid, Stack, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateProfile } from '../../../../reduxSlice/adminSlice';
import { toast } from 'react-toastify';
import { IMG_BASE_URL } from '../../../../utils/Constants';

const ProfileUpdate = () => {
    const dispatch = useDispatch();
    const { loading, error, adminInfo } = useSelector((state) => state.ADMIN);
    const [selectedImage, setSelectedImage] = useState(null); // State for image preview

    // Formik initialization with Yup validation
    const formik = useFormik({
        initialValues: {
            first_name: adminInfo?.data?.details?.name?.first_name || '',
            last_name: adminInfo?.data?.details?.name?.last_name || '',
            email: adminInfo?.data?.details?.email || '',
            mobile: adminInfo?.data?.details?.mobile || '',
            user_name: adminInfo?.data?.details?.user_name || '',
            profileImage: '', // For file upload
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('First Name is required'),
            last_name: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            mobile: Yup.string().required('Mobile number is required'),
            user_name: Yup.string().required('user_name is required'),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('email', values.email);
            formData.append('mobile', values.mobile);
            formData.append('user_name', values.user_name);
            if (selectedImage) {
                formData.append('profileImage', selectedImage); // Append image if selected
            }

            dispatch(updateProfile(formData)); // Dispatch with FormData
        },
    });

    // Handle image selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            formik.setFieldValue('profileImage', file); // Set the file to formik state
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const commonStyle = { background: '#cbcaa5' };

    return (
        <Paper elevation={2} sx={{ background: 'linear-gradient( #acbb78 23%, #ffffff 20%)', px: 4, py: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#fdfdfd' }}>
                        Update Profile
                    </Typography>
                    <Divider sx={{ backgroundColor: '#fdfdfd', mb: 1 }} />
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Profile Image Display */}
                    <Avatar
                        variant="square"
                        src={
                            selectedImage
                                ? URL.createObjectURL(selectedImage) // Preview selected image
                                : `${IMG_BASE_URL}/uploads/${adminInfo?.data?.details?.profileImage}` // Display current image if no image selected
                        }
                        style={{ height: '170px', width: '150px' }}
                        alt="Profile Image"
                    />
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleImageChange} // Handle image selection
                        style={{ marginTop: '10px' }}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    placeholder="First Name"
                                    fullWidth
                                    {...formik.getFieldProps('first_name')}
                                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                    helperText={formik.touched.first_name && formik.errors.first_name}
                                    style={commonStyle}
                                />
                                <TextField
                                    placeholder="Last Name"
                                    fullWidth
                                    {...formik.getFieldProps('last_name')}
                                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                    helperText={formik.touched.last_name && formik.errors.last_name}
                                    style={commonStyle}
                                />
                            </Stack>
                            <TextField
                                placeholder="Email"
                                fullWidth
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                style={commonStyle}
                            />
                            <TextField
                                placeholder="Mobile"
                                fullWidth
                                {...formik.getFieldProps('mobile')}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                                style={commonStyle}
                            />
                            <TextField
                                placeholder="user_name"
                                fullWidth
                                {...formik.getFieldProps('user_name')}
                                error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                                helperText={formik.touched.user_name && formik.errors.user_name}
                                style={commonStyle}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#acbb78',
                                    '&:hover': { backgroundColor: '#acbb78' },
                                }}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </Button>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProfileUpdate;
