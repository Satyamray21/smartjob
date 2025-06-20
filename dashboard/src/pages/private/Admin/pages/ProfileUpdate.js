import React, { useEffect, useState } from 'react';
import { TextField, Paper, Grid, Stack, Button, IconButton, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updatedProfile } from '../../../../reduxSlice/adminSlice';
import { toast } from 'react-toastify';
import { Edit } from '@mui/icons-material';
import { IMG_BASE_URL } from '../../../../utils/Constants';

const ProfileUpdate = () => {
    const dispatch = useDispatch();
    const { loading, error, admin } = useSelector((state) => state.ADMIN);
    const [previewImage, setPreviewImage] = useState(null);

    // Handle image change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            formik.setFieldValue('profileImage', file);
        }
    };

    // Formik initialization with Yup validation
    const formik = useFormik({
        initialValues: {
            first_name: admin?.name?.first_name || '',
            last_name: admin?.name?.last_name || '',
            email: admin?.email || '',
            mobile: admin?.mobile || '',
            user_name: admin?.user_name || '',
            profileImage: '',
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('First Name is required'),
            last_name: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            mobile: Yup.string().required('Mobile number is required'),
            user_name: Yup.string().required('Username is required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            try {
                const formData = new FormData();
                for (const key in values) {
                    formData.append(key, values[key]);
                }
                await dispatch(updatedProfile(formData)).unwrap();
                toast.success('Profile updated successfully');
                resetForm();
            } catch (error) {
                console.error('Failed to update profile:', error);
                toast.error('Failed to update');
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const commonStyle = { background: '#F0F1F5' };

    return (
        <Paper elevation={0} sx={{ borderRadius: '10px', mt: 2, p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, gap: 2 }}>
                <Stack direction="column" alignItems="center">
                    <Box
                        sx={{
                            width: 130,
                            height: 130,
                            borderRadius: '50%',
                            border: '3px solid #F0F1F5',
                            backgroundImage: previewImage
                                ? `url(${previewImage})`
                                : admin?.profileImage
                                    ? `url(${IMG_BASE_URL}/uploads/${admin.profileImage})`
                                    : `url(/default-profile.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <IconButton
                        size='small'
                        component="label"
                        aria-label="Edit profile image"
                        sx={{
                            mt: -5,
                            ml: 12,
                            zIndex: 1,
                            backgroundColor: '#FFF',
                            border: '1px solid #F1F2F5',
                            '&:hover': { backgroundColor: '#f0f0f0' },
                        }}
                    >
                        <Edit sx={{ fontSize: '20px' }} />
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </IconButton>
                </Stack>

                <Stack
                    component="form"
                    sx={{ flexGrow: 1 }}
                    onSubmit={formik.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={commonStyle}
                                placeholder="First Name"
                                fullWidth
                                {...formik.getFieldProps('first_name')}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.first_name && formik.errors.first_name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={commonStyle}
                                placeholder="Last Name"
                                fullWidth
                                {...formik.getFieldProps('last_name')}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && formik.errors.last_name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={commonStyle}
                                placeholder="Email"
                                fullWidth
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={commonStyle}
                                placeholder="Mobile"
                                fullWidth
                                {...formik.getFieldProps('mobile')}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={formik.isSubmitting || loading}
                                sx={{
                                    backgroundColor: '#acbb78',
                                    '&:hover': { backgroundColor: '#9ca870' },
                                }}
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </Button>
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </Paper>
    );
};

export default ProfileUpdate;
