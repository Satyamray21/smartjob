import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleJd, updateJobd } from '../../../../reduxSlice/jdSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import {
    Typography, Grid, Card, CardContent, Stack, Divider, Box,
    Button, TextField,
    useTheme,
} from '@mui/material';

const validationSchema = yup.object().shape({
    job_title: yup.string().required('Title is required'),
    job_id: yup.string().required('Job ID is required'),
    company_name: yup.string().required('Company name is required'),
    start_date: yup.date().required('Start date is required'),
    close_date: yup.date().required('Closing date is required'),
    location: yup.string().required('Location is required'),
    position: yup.number().required('Position is required'),
    key_skills: yup.string().required('Key skills are required'),
    qualification: yup.string().required('Qualifications are required'),
    salary: yup.object().shape({
        s_min: yup.number().required('Salary minimum range is required'),
        s_max: yup.number().required('Salary maximum range is required'),
    }).required(),
    experience: yup.object().shape({
        e_min: yup.number().required('Experience minimum is required'),
        e_max: yup.number().required('Experience maximum is required'),
    }).required(),
});

const JdUpdate = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { constantIdforJobList, loading, error } = useSelector((state) => state.JD);
    const [updated, setUpdated] = useState({});

    useEffect(() => {
        if (constantIdforJobList) {
            const fetchJobData = async () => {
                try {
                    const result = await dispatch(fetchSingleJd(constantIdforJobList)).unwrap();
                    setUpdated(result?.data || {});
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchJobData();
        }
    }, [dispatch, constantIdforJobList]);

    const formik = useFormik({
        initialValues: {
            job_title: updated.job_title || '',
            job_id: updated.job_id || '',
            start_date: updated.start_date || '',
            close_date: updated.close_date || '',
            location: updated.location || '',
            position: updated.position || '',
            company_name: updated.company_name || '',
            key_skills: updated.key_skills || '',
            qualification: updated.qualification || '',
            salary: {
                s_min: updated?.salary?.s_min || '',
                s_max: updated?.salary?.s_max || '',
            },
            experience: {
                e_min: updated?.experience?.e_min || '',
                e_max: updated?.experience?.e_max || '',
            },
            job_description: updated.job_description || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                const resultAction = await dispatch(updateJobd({ id: constantIdforJobList, data: values }));
                toast.success(resultAction.payload?.message || 'Job updated successfully!');
                resetForm();
            } catch (error) {
                toast.error(`Failed to update job: ${error.message}`);
            }
        },
    });

    const commonStyle = { background: '#F1F2F5' };

    const renderTextField = (field, placeholder, type = 'text') => (
        <TextField
            style={commonStyle}
            {...formik.getFieldProps(field)}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field]}
            required
            fullWidth
            size="small"
            placeholder={placeholder}
            type={type}
            InputLabelProps={type === 'date' ? { shrink: true } : undefined}
        />
    );
    if (loading) return <Typography textAlign="center"><ClipLoader /></Typography>;
    if (error) return <Typography color="error" textAlign="center">{error}</Typography>;

    return (
        <>
            <Box sx={{ height: '91vh', mt: 1, width: 'auto', overflowY: 'scroll' }}>
                <Grid container justifyContent="center" alignItems="center">
                    <ToastContainer position="top-center" />
                    <Grid item md={6} xs={12}>
                        <Card elevation={2} sx={{ p: 1, background: 'rgba(255, 255, 255, 0.9)' }}>
                            <CardContent component="form" onSubmit={formik.handleSubmit}>
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="h4" fontWeight="bold" align="center">Job Description Update</Typography>
                                    <Divider />
                                    {renderTextField('job_title', 'Title of Job*')}
                                    {renderTextField('job_id', 'Job Id*')}
                                    {renderTextField('company_name', 'Company Name*')}
                                    <Stack direction="row" spacing={1}>
                                        {renderTextField('start_date', 'Start Date*', 'date')}
                                        {renderTextField('close_date', 'Close Date*', 'date')}
                                    </Stack>
                                    {renderTextField('location', 'Location*')}
                                    {renderTextField('position', 'Position*')}
                                    {renderTextField('qualification', 'Qualification*')}
                                    <Typography>Experience</Typography>
                                    <Stack direction="row" spacing={1}>
                                        {renderTextField('experience.e_min', 'Min*')}
                                        {renderTextField('experience.e_max', 'Max*')}
                                    </Stack>
                                    {renderTextField('key_skills', 'Key Skills*')}
                                    <Typography>Salary</Typography>
                                    <Stack direction="row" spacing={1}>
                                        {renderTextField('salary.s_min', 'Min*')}
                                        {renderTextField('salary.s_max', 'Max*')}
                                    </Stack>
                                    {renderTextField('job_description', 'Job Description', 'text')}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="small"
                                        variant="contained"
                                        sx={{
                                            mt: 5,
                                            width: '200px',
                                            backgroundColor: palette.error.main,
                                            transition: 'background-color 0.6s ease-out',
                                            '&:hover': {
                                                backgroundColor: palette.error.deem,
                                            }
                                        }}
                                    >
                                        Update
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default JdUpdate;
