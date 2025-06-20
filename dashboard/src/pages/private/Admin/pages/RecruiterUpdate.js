import React, { useEffect, useState } from 'react';
import {
    Box, Button, Divider, Grid, IconButton, Typography, Card,
    CardContent, TextField, Stack,
    useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleRecruiter, updatedProfile } from '../../../../reduxSlice/recruiterSlice';
import { IMG_BASE_URL } from '../../../../utils/Constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

// Validation schema for form fields
const validationSchema = yup.object({
    name: yup.object({
        first_name: yup.string().min(3).required('First name is required'),
        last_name: yup.string().min(3).required('Last name is required'),
    }).required(),
    role: yup.number().min(1).required('Role is required'),
    mobile: yup.string().min(10).required('Mobile number is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    experience: yup.object({
        years: yup.number().required('Experience in years is required'),
        months: yup.number().required('Experience in months is required'),
    }).required(),
    skills: yup.string().required('Skills are required'),
    job_function: yup.string().required('Job Function is required'),
    education: yup.string().required('Education is required'),
    current_location: yup.object({
        pin_code: yup.string().length(6, 'Pin code must be 6 characters').required('Pin code is required'),
        locality: yup.string().required('Locality is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
    }).required(),
    profileImage: yup.mixed().required('Profile image is required').test("fileType", "Unsupported File Format", value =>
        value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
    ),
});

// Input field component for formik
const InputField = ({ name, formik, ...props }) => (
    <TextField
        {...formik.getFieldProps(name)}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        fullWidth
        size="small"
        sx={{ background: '#F1F2F5' }}
        {...props}
    />
);

const RecruiterUpdate = () => {

    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { constantIdforRc1, loading, error } = useSelector(state => state.RECRUITER);
    // const [profileImage, setProfileImage] = useState(null);
    const [updated, setUpdated] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    // Fetch recruiter data from API
    const fetchRecruiterData = async () => {
        if (constantIdforRc1) {
            try {
                const result = await dispatch(fetchSingleRecruiter(constantIdforRc1)).unwrap();
                setUpdated(result?.data || {});
            } catch (error) {
                console.error("Error fetching recruiter data:", error);
            }
        }
    };

    useEffect(() => {
        fetchRecruiterData();
    }, [constantIdforRc1]);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: {
                first_name: updated?.name?.first_name || '',
                last_name: updated?.name?.last_name || '',
            },
            email: updated?.email || '',
            mobile: updated?.mobile || '',
            experience: {
                years: updated?.experience?.years || '',
                months: updated?.experience?.months || '',
            },
            skills: updated?.skills || '',
            job_function: updated?.job_function || '',
            education: updated?.education || '',
            current_location: {
                pin_code: updated?.current_location?.pin_code || '',
                locality: updated?.current_location?.locality || '',
                city: updated?.current_location?.city || '',
                state: updated?.current_location?.state || '',
            },
            profileImage: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (typeof value === 'object') {
                        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                            formData.append(`${key}[${nestedKey}]`, nestedValue);
                        });
                    } else {
                        formData.append(key, value);
                    }
                });

                // Only append the image if it exists
                if (values.profileImage) {
                    formData.append('profileImage', values.profileImage);
                }

                const resultAction = await dispatch(updatedProfile({ id: constantIdforRc1, data: formData }));
                toast.success(resultAction?.payload?.message || 'Recruiter updated successfully!');
                resetForm();
            } catch (error) {
                toast.error(`Failed to update recruiter: ${error.message}`);
            } finally {
                setSubmitting(false);
            }
        },
    });

    // Handle image change event
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            formik.setFieldValue('profileImage', file);
        }
    };

    if (loading) return <Typography textAlign="center"><ClipLoader /></Typography>;
    if (error) return <Typography color="error" textAlign="center">{error}</Typography>;

    return (
        <Box sx={{ height: '91vh', mt: 1, overflowY: 'scroll' }}>
            <ToastContainer position="top-right" />
            <Grid container alignItems="center" justifyContent="center">
                <Grid item sm={6} xs={12}>
                    <Card elevation={2} sx={{ p: 1, backdropFilter: 'blur(10px)' }}>
                        <CardContent component="form" onSubmit={formik.handleSubmit}>
                            <Stack alignItems="center">
                                <Typography variant="h4" fontWeight="bold">Update Recruiter</Typography>
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Stack direction="row" justifyContent="center" alignItems="center" mb={2}>
                                <Box
                                    sx={{
                                        width: 100, height: 100, borderRadius: '50%',
                                        backgroundColor: '#F1F2F5', position: 'relative',
                                        backgroundImage: previewImage
                                            ? `url(${previewImage})`
                                            : updated?.profileImage
                                                ? `url(${IMG_BASE_URL}/uploads/${updated?.profileImage})`
                                                : `url(/default-profile.jpg)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                                <IconButton component="label" size="small">
                                    <AddAPhotoIcon sx={{
                                        borderRadius: '50%', color: '#1FEFE',
                                        border: '1px solid #F1F2F5',
                                        fontSize: 25, p: 0.5, position: 'absolute', right: 4, top: 2
                                    }} />
                                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                                </IconButton>
                            </Stack>

                            <Grid container spacing={1}>
                                {[
                                    { name: 'name.first_name', label: 'First Name' },
                                    { name: 'name.last_name', label: 'Last Name' },
                                    { name: 'email', label: 'Email' },
                                    { name: 'mobile', label: 'Mobile' },
                                    { name: 'experience.years', label: 'Experience (Years)', type: 'number' },
                                    { name: 'experience.months', label: 'Experience (Months)', type: 'number' },
                                    { name: 'skills', label: 'Skills' },
                                    { name: 'job_function', label: 'Job Function' },
                                    { name: 'education', label: 'Education' },
                                    { name: 'current_location.pin_code', label: 'Pin Code' },
                                    { name: 'current_location.locality', label: 'Locality' },
                                    { name: 'current_location.city', label: 'City' },
                                    { name: 'current_location.state', label: 'State' },
                                ].map((field) => (
                                    <Grid item sm={6} xs={12} key={field.name}>
                                        <Typography>{field.label}</Typography>
                                        <InputField name={field.name} formik={formik} type={field.type} />
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        sx={{ background: palette.primary.main, color: '#fff', '&:hover': { background: palette.primary.deem } }}
                                    >
                                        Update Recruiter
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RecruiterUpdate;
