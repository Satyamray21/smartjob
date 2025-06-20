import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography, TextField, Divider, useTheme, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createJobd } from '../../../../reduxSlice/jdSlice';
import { ToastContainer, toast } from 'react-toastify';

const JdCreate = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const validationSchema = yup.object().shape({
        job_title: yup.string().required('Title is required'),
        job_id: yup.string().required('Job ID is required'),
        company_name: yup.string().required('Company name is required'),
        start_date: yup.date().required('Start date is required'),
        close_date: yup.date().required('Closing date is required'),
        location: yup.string().required('Location is required'),
        position: yup.number().required('Position is required'),
        key_skills: yup.string().required('Key skills are required'),
        job_function: yup.string().required('Job function are required'),
        qualification: yup.string().required('Qualifications are required'),
        salary: yup.object().shape({
            s_min: yup.number().required('Salary minimum range is required'),
            s_max: yup.number().required('Salary maximum range is required'),
        }).required(),
        experience: yup.object().shape({
            e_min: yup.number().required('Experience minimum is required'),
            e_max: yup.number().required('Experience maximum is required')
        }).required(),
        job_description: yup.string().required('Job description are required'),
    });

    const formik = useFormik({
        initialValues: {
            job_title: '',
            job_id: '',
            start_date: '',
            close_date: '',
            location: '',
            position: '',
            company_name: '',
            job_function: '',
            key_skills: '',
            qualification: '',
            salary: { s_min: '', s_max: '' },
            experience: { e_min: '', e_max: '' },
            job_description: ''
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const action = createJobd(values);
                await dispatch(action).unwrap();
                toast.success('Jd created successfully');
            } catch (error) {
                console.error(`Failed to add: ${error.message}`);
                toast.error('Failed to create jd');
            }
        },
    });
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
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item md={6} xs={12}>
                        <Card elevation={2}>
                            <CardContent component="form" onSubmit={formik.handleSubmit}>
                                <Grid container spacing={1} direction="column">
                                    <Grid item xs={12}>
                                        <Typography variant="h4" fontWeight="bold" align="center">
                                            Job Description Form
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>

                                    <Grid container item spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                style={commonStyle}
                                                {...formik.getFieldProps('job_title')}
                                                error={formik.touched.job_title && Boolean(formik.errors.job_title)}
                                                helperText={formik.touched.job_title && formik.errors.job_title}
                                                required
                                                fullWidth
                                                size="small"
                                                placeholder="Title of Job*"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                style={commonStyle}
                                                {...formik.getFieldProps('job_id')}
                                                error={formik.touched.job_id && Boolean(formik.errors.job_id)}
                                                helperText={formik.touched.job_id && formik.errors.job_id}
                                                required
                                                fullWidth
                                                size="small"
                                                placeholder="Job Id*"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            style={commonStyle}
                                            {...formik.getFieldProps('company_name')}
                                            error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                                            helperText={formik.touched.company_name && formik.errors.company_name}
                                            required
                                            fullWidth
                                            size="small"
                                            placeholder="Company Name*"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            style={commonStyle}
                                            {...formik.getFieldProps('location')}
                                            error={formik.touched.location && Boolean(formik.errors.location)}
                                            helperText={formik.touched.location && formik.errors.location}
                                            name='location'
                                            required
                                            fullWidth
                                            size="small"
                                            placeholder="Location*"
                                        />
                                    </Grid>
                                    <Grid container item spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                style={commonStyle}
                                                {...formik.getFieldProps('start_date')}
                                                error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                                                helperText={formik.touched.start_date && formik.errors.start_date}
                                                required
                                                fullWidth
                                                size="small"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                style={commonStyle}
                                                {...formik.getFieldProps('close_date')}
                                                error={formik.touched.close_date && Boolean(formik.errors.close_date)}
                                                helperText={formik.touched.close_date && formik.errors.close_date}
                                                required
                                                fullWidth
                                                size="small"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            style={commonStyle}
                                            {...formik.getFieldProps('position')}
                                            error={formik.touched.position && Boolean(formik.errors.position)}
                                            helperText={formik.touched.position && formik.errors.position}
                                            name='position'
                                            required
                                            fullWidth
                                            size="small"
                                            placeholder="Position*"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            style={commonStyle}
                                            {...formik.getFieldProps('qualification')}
                                            error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                                            helperText={formik.touched.qualification && formik.errors.qualification}
                                            required
                                            fullWidth
                                            size="small"
                                            placeholder="Qualification*"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>Experience</Typography>
                                    </Grid>
                                    <Grid container item spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                style={commonStyle}
                                                {...formik.getFieldProps('experience.e_min')}
                                                error={formik.touched.experience?.e_min && Boolean(formik.errors.experience?.e_min)}
                                                helperText={formik.touched.experience?.e_min && formik.errors.experience?.e_min}
                                                required
                                                fullWidth
                                                size="small"
                                                placeholder="Min*"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                style={commonStyle}
                                                {...formik.getFieldProps('experience.e_max')}
                                                error={formik.touched.experience?.e_max && Boolean(formik.errors.experience?.e_max)}
                                                helperText={formik.touched.experience?.e_max && formik.errors.experience?.e_max}
                                                required
                                                fullWidth
                                                size="small"
                                                placeholder="Max*"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            style={commonStyle}
                                            {...formik.getFieldProps('job_function')}
                                            error={formik.touched.job_function && Boolean(formik.errors.job_function)}
                                            helperText={formik.touched.job_function && formik.errors.job_function}
                                            required
                                            fullWidth
                                            size="small"
                                            placeholder="Job Function*"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            style={commonStyle}
                                            {...formik.getFieldProps('key_skills')}
                                            error={formik.touched.key_skills && Boolean(formik.errors.key_skills)}
                                            helperText={formik.touched.key_skills && formik.errors.key_skills}
                                            required
                                            fullWidth
                                            size="small"
                                            placeholder="Key Skills*"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography>Salary</Typography>
                                    </Grid>
                                    <Grid container item spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                style={commonStyle}
                                                {...formik.getFieldProps('salary.s_min')}
                                                error={formik.touched.salary?.s_min && Boolean(formik.errors.salary?.s_min)}
                                                helperText={formik.touched.salary?.s_min && formik.errors.salary?.s_min}
                                                required
                                                fullWidth
                                                size="small"
                                                placeholder="Min*"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                style={commonStyle}
                                                {...formik.getFieldProps('salary.s_max')}
                                                error={formik.touched.salary?.s_max && Boolean(formik.errors.salary?.s_max)}
                                                helperText={formik.touched.salary?.s_max && formik.errors.salary?.s_max}
                                                required
                                                fullWidth
                                                size="small"
                                                placeholder="Max*"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            style={commonStyle}
                                            {...formik.getFieldProps('job_description')}
                                            error={formik.touched.job_description && Boolean(formik.errors.job_description)}
                                            helperText={formik.touched.job_description && formik.errors.job_description}
                                            required
                                            fullWidth
                                            multiline
                                            rows={3}
                                            size="small"
                                            placeholder="Job Description"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Stack direction={'row'} gap={2} justifyContent='space-between'>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: theme.palette.error.main,
                                                    transition: 'background-color 0.6s ease-out',
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.error.deem,
                                                    }
                                                }}

                                                disabled={formik.isSubmitting}
                                                fullWidth
                                            >
                                                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
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

export default JdCreate;
