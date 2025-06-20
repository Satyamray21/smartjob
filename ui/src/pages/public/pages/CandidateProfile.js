import React, { useEffect, useState } from 'react';
import {
    Avatar, Box, Card, CardContent, Grid, Typography, Divider, Paper, Button,
    TextField, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidateById, updateCandidate } from '../../../reduxSlice/candidateSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CandidateProfile = () => {
    const dispatch = useDispatch();
    const loginUser = useSelector((state) => state.CANDIDATE.loginData?.user);
    const candidateId = loginUser?.candidateId || loginUser?._id;
    const user = useSelector((state) => state.CANDIDATE.viewedCandidate);
    const loading = useSelector((state) => state.CANDIDATE.loading);
    const [editMode, setEditMode] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        if (candidateId) {
            dispatch(getCandidateById(candidateId));
        }
    }, [candidateId, dispatch]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            mobile: user?.mobile || '',
            job_function: user?.job_function || '',
            current_location: user?.current_location || '',
            key_skills: user?.key_skills || '',
            years: user?.experience?.years || 0,
            months: user?.experience?.months || 0,
            candidateResume: null,
            profilePhoto: null,
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            mobile: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('mobile', values.mobile);
            formData.append('job_function', values.job_function);
            formData.append('current_location', values.current_location);
            formData.append('key_skills', values.key_skills);
            formData.append('years', values.years);
            formData.append('months', values.months);
            if (values.candidateResume) {
                formData.append('candidateResume', values.candidateResume);
            }
            if (values.profilePhoto) {
                formData.append('profilePhoto', values.profilePhoto);
            }

            const resultAction = await dispatch(updateCandidate({ candidateId, formData }));
            if (updateCandidate.fulfilled.match(resultAction)) {
                setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
                setEditMode(false);
                dispatch(getCandidateById(candidateId));
            } else {
                setSnackbar({ open: true, message: resultAction.payload.message, severity: 'error' });
            }
        },
    });

    if (loading && !user) return <Box textAlign="center"><CircularProgress /></Box>;

    return (
        <Box sx={{ p: 4 }}>
            <Paper elevation={3} sx={{ borderRadius: 3, p: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar
                                src={`http://localhost:5005/${user?.profilePhoto?.replace(/\\/g, '/')}`}
                                sx={{ width: 120, height: 120, mb: 2, border: '3px solid #FF0343' }}
                            />
                            <Typography variant="h6" fontWeight={700}>{user?.first_name} {user?.last_name}</Typography>
                            <Typography variant="body1" color="text.secondary">{user?.email}</Typography>
                            {!editMode && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setEditMode(true)}>
                                    Edit Profile
                                </Button>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Card elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    {editMode ? 'Update Information' : 'Profile Information'}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />

                                {editMode ? (
                                    <form onSubmit={formik.handleSubmit}>
                                        <Grid container spacing={2}>
                                            {[{ name: 'first_name', label: 'First Name' }, { name: 'last_name', label: 'Last Name' },
                                            { name: 'mobile', label: 'Mobile' }, { name: 'job_function', label: 'Job Function' },
                                            { name: 'current_location', label: 'Location' }, { name: 'key_skills', label: 'Key Skills' }
                                            ].map(({ name, label }) => (
                                                <Grid item xs={12} sm={6} key={name}>
                                                    <TextField
                                                        fullWidth
                                                        size="medium"
                                                        name={name}
                                                        label={label}
                                                        value={formik.values[name]}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched[name] && Boolean(formik.errors[name])}
                                                        helperText={formik.touched[name] && formik.errors[name]}
                                                        InputProps={{ sx: { fontSize: '0.8rem', py: 1.5 } }}
                                                        InputLabelProps={{ sx: { fontSize: '0.8rem' } }}
                                                    />
                                                </Grid>
                                            ))}
                                            <Grid item xs={6} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    size="medium"
                                                    name="years"
                                                    label="Experience (Years)"
                                                    type="number"
                                                    value={formik.values.years}
                                                    onChange={formik.handleChange}
                                                    InputProps={{ sx: { fontSize: '1rem', py: 1.5 } }}
                                                    InputLabelProps={{ sx: { fontSize: '1rem' } }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    size="medium"
                                                    name="months"
                                                    label="Experience (Months)"
                                                    type="number"
                                                    value={formik.values.months}
                                                    onChange={formik.handleChange}
                                                    inputProps={{ min: 0, max: 12 }}
                                                    InputProps={{ sx: { fontSize: '1rem', py: 1.5 } }}
                                                    InputLabelProps={{ sx: { fontSize: '1rem' } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Button variant="outlined" component="label" fullWidth>
                                                    Upload Resume
                                                    <input hidden type="file" accept=".pdf" name="candidateResume"
                                                        onChange={(e) => formik.setFieldValue('candidateResume', e.currentTarget.files[0])} />
                                                </Button>
                                                {formik.values.candidateResume && (
                                                    <Typography variant="body2" mt={1}>{formik.values.candidateResume.name}</Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Button variant="outlined" component="label" fullWidth>
                                                    Upload Profile Photo
                                                    <input hidden type="file" name="profilePhoto" accept="image/*"
                                                        onChange={(e) => formik.setFieldValue('profilePhoto', e.currentTarget.files[0])} />
                                                </Button>
                                                {formik.values.profilePhoto && (
                                                    <Typography variant="body2" mt={1}>{formik.values.profilePhoto.name}</Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sx={{ mt: 2 }}>
                                                <Button type="submit" variant="contained" color="success">Save Changes</Button>{' '}
                                                <Button variant="outlined" onClick={() => setEditMode(false)}>Cancel</Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                ) : (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}><Typography size="medium"><strong>Mobile:</strong> {user?.mobile}</Typography></Grid>
                                        <Grid item xs={12} sm={6}><Typography size="medium"><strong>Job Function:</strong> {user?.job_function}</Typography></Grid>
                                        <Grid item xs={12} sm={6}><Typography size="medium"><strong>Location:</strong> {user?.current_location}</Typography></Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body1" size="medium">
                                                <strong>Experience:</strong> {user?.experience?.years || 0} yr {user?.experience?.months || 0} mo
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}><Typography size="medium"><strong>Key Skills:</strong> {user?.key_skills}</Typography></Grid>
                                        <Grid item xs={12}>
                                            <Typography size="medium">
                                                <strong>Resume:</strong> <a href={`http://localhost:5005/${user?.candidateResume?.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer" style={{ color: '#1976d2', textDecoration: 'underline' }}>View Resume</a>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default CandidateProfile;
