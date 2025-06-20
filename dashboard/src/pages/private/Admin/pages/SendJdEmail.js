import React, { useEffect, useState } from 'react';
import {
    Box, Button, Card, CardContent, Grid, Stack, Typography, Checkbox, Avatar,
    Table, TableBody, TableCell, useTheme, TextField, Divider, TableContainer, TableHead, TableRow, Paper,
    Skeleton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleJd, createJobd } from '../../../../reduxSlice/jdSlice';
import { fetchAllRecruiter } from '../../../../reduxSlice/recruiterSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendMultipleEmails } from '../../../../reduxSlice/adminSlice';
import { IMG_BASE_URL } from '../../../../utils/Constants';

const SendJdEmail = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { constantViewId, status, error } = useSelector((state) => state.JD);
    const { recruiter, loading } = useSelector((state) => state.RECRUITER);
    const [viewJd, setViewJd] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [responseData, setResponseData] = useState(null);
    const [successMap, setSuccessMap] = useState({});
    console.log("all recruiter", recruiter?.data)

    useEffect(() => {
        dispatch(fetchAllRecruiter()).then(unwrapResult).catch(console.error);
    }, [dispatch]);

    useEffect(() => {
        if (responseData?.status) {
            const statusMap = {};
            responseData.status.forEach(({ email, status }) => {
                statusMap[email] = status === 'Success';
            });
            setSuccessMap(statusMap);
        }
    }, [responseData]);

    useEffect(() => {
        if (constantViewId) {
            dispatch(fetchSingleJd(constantViewId))
                .then(unwrapResult)
                .then((res) => setViewJd(res?.data || {}))
                .catch(console.error);
        }
    }, [dispatch, constantViewId]);

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
        onSubmit: async (values) => {
            const emails = selectedItems;
            const text = `Job Title: ${values.job_title}\nCompany: ${values.company_name}\nDescription: ${values.key_skills}`;
            try {
                const result = await dispatch(sendMultipleEmails({ emails, text })).unwrap();
                setResponseData(result);
                await dispatch(createJobd(values)).unwrap();
                toast.success('Emails sent and job description created successfully');
            } catch (error) {
                toast.error(`Failed to complete the operation: ${error.message || error}`);
            }
        },
    });

    const handleSelectAll = () => {
        const failedEmails = recruiter?.data
            ?.filter(({ status }) => status === 'failed')
            ?.map(({ email }) => email);

        if (selectedItems.length === recruiter?.data?.length - failedEmails?.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(
                recruiter?.data
                    ?.filter(({ status }) => status !== 'failed')
                    ?.map(({ email }) => email)
            );
        }
    };

    const handleCheckboxChange = (email) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.includes(email)
                ? prevSelectedItems.filter((item) => item !== email)
                : [...prevSelectedItems, email]
        );
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>{error}</div>;
    if (!viewJd) return <div>Job not found</div>;

    const commonStyle = { background: '#FFFFFF' };

    return (
        <>
            <Paper elevation={0} sx={{ height: { lg: '88vh', md: '88vh' }, width: 'auto', mt: 1, overflowY: 'scroll' }}>
                <Grid container justifyContent="center" alignItems="center">
                    <ToastContainer position="top-center" />
                    <Grid item xs={12}>
                        <Card elevation={2} >
                            <CardContent component="form" onSubmit={formik.handleSubmit}>
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="h4" fontWeight="bold" align="center">
                                        Job Description Form
                                    </Typography>
                                    <Divider />
                                    <TableContainer >
                                        <Table aria-label="customized table" sx={{ minWidth: 450 }} size="small">
                                            <TableHead sx={{ background: theme.palette.primary.main }}>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <Checkbox
                                                            size='small'
                                                            color='success'
                                                            onClick={handleSelectAll}
                                                            sx={{
                                                                backgroundColor: '#F0F0F0',
                                                                '&:hover': { backgroundColor: '#E0E0E0' }
                                                            }}
                                                            checked={
                                                                selectedItems.length === recruiter?.data?.filter(({ status }) => status !== 'failed')?.length
                                                            }
                                                        />
                                                    </TableCell>
                                                    {['Image', 'Full Name', 'Email', 'Job Role', 'Mobile Number', 'Status'].map((header) => (
                                                        <TableCell
                                                            key={header}
                                                            sx={{
                                                                fontSize: '10px',
                                                                letterSpacing: '1px',
                                                                color: '#FFF',
                                                                textAlign: 'left'
                                                            }}
                                                        >
                                                            {header}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {loading ? (
                                                    Array.from({ length: 5 }).map((_, index) => (
                                                        <TableRow key={index}>
                                                            {[{ variant: 'text', width: '20px' }, { variant: 'rectangular', width: '20px' }, { variant: 'text' }, { variant: 'text' },
                                                            { variant: 'text' }, { variant: 'text' }, { variant: 'text' }, { variant: 'text' }, { variant: 'text' }
                                                            ].map((skeleton, idx) => (
                                                                <TableCell key={idx}>
                                                                    <Skeleton variant={skeleton.variant} sx={{ height: '15px', borderRadius: '3px', width: skeleton.width || '100%' }} />
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    recruiter?.data?.map(({ email, job_function, name, mobile, status, profileImage }, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{
                                                                backgroundColor: status === 'failed' ? 'rgba(255, 0, 0, 0.1)' : 'inherit',
                                                            }}
                                                        >
                                                            <TableCell>
                                                                <Checkbox
                                                                    size="small"
                                                                    checked={selectedItems.includes(email)}
                                                                    onChange={() => handleCheckboxChange(email)}
                                                                    disabled={status === 'failed'}
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Avatar
                                                                    variant='rectangular'
                                                                    style={{ height: '20px', width: '20px', borderRadius: '5px' }}
                                                                    alt={name}
                                                                    src={`${IMG_BASE_URL}/uploads/${profileImage}`}
                                                                />
                                                            </TableCell>
                                                            <TableCell>{name?.first_name} {name?.last_name}</TableCell>
                                                            <TableCell>{email}</TableCell>
                                                            <TableCell>{job_function}</TableCell>
                                                            <TableCell>{mobile}</TableCell>
                                                            <TableCell sx={{ color: successMap[email] ? 'green' : 'red' }}>
                                                                {successMap[email] === undefined ? '' : successMap[email] ? 'Success' : 'Failed'}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))

                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Box sx={{ backgroundColor: '#F0F1F5', py: 2, borderRadius: '10px', px: 1 }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('job_title')}
                                                    error={formik.touched.job_title && Boolean(formik.errors.job_title)}
                                                    helperText={formik.touched.job_title && formik.errors.job_title}
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Title of Job*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('job_id')}
                                                    error={formik.touched.job_id && Boolean(formik.errors.job_id)}
                                                    helperText={formik.touched.job_id && formik.errors.job_id}
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Job Id*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('company_name')}
                                                    error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                                                    helperText={formik.touched.company_name && formik.errors.company_name}
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Company Name*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('start_date')}
                                                    error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                                                    helperText={formik.touched.start_date && formik.errors.start_date}
                                                    type="date"
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Start Date*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('close_date')}
                                                    error={formik.touched.close_date && Boolean(formik.errors.close_date)}
                                                    helperText={formik.touched.close_date && formik.errors.close_date}
                                                    type="date"
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Closing Date*"
                                                />
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
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Key Skills*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('location')}
                                                    error={formik.touched.location && Boolean(formik.errors.location)}
                                                    helperText={formik.touched.location && formik.errors.location}
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Location*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('position')}
                                                    error={formik.touched.position && Boolean(formik.errors.position)}
                                                    helperText={formik.touched.position && formik.errors.position}
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
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Qualifications*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('experience.e_min')}
                                                    error={formik.touched.experience?.e_min && Boolean(formik.errors.experience?.e_min)}
                                                    helperText={formik.touched.experience?.e_min && formik.errors.experience?.e_min}
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Experience Min*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('experience.e_max')}
                                                    error={formik.touched.experience?.e_max && Boolean(formik.errors.experience?.e_max)}
                                                    helperText={formik.touched.experience?.e_max && formik.errors.experience?.e_max}
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Experience Max*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('salary.s_min')}
                                                    error={formik.touched.salary?.s_min && Boolean(formik.errors.salary?.s_min)}
                                                    helperText={formik.touched.salary?.s_min && formik.errors.salary?.s_min}
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Salary Min*"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('salary.s_max')}
                                                    error={formik.touched.salary?.s_max && Boolean(formik.errors.salary?.s_max)}
                                                    helperText={formik.touched.salary?.s_max && formik.errors.salary?.s_max}
                                                    fullWidth
                                                    size="small"
                                                    placeholder="Salary Max*"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    style={commonStyle}
                                                    {...formik.getFieldProps('job_description')}
                                                    error={formik.touched.job_description && Boolean(formik.errors.job_description)}
                                                    helperText={formik.touched.job_description && formik.errors.job_description}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    size="small"
                                                    placeholder="Job Description"
                                                />
                                            </Grid>
                                            <Grid item xs={12} container justifyContent="flex-start">
                                                <Button
                                                    type="submit"
                                                    size="small"
                                                    variant="contained"
                                                    sx={{ width: '150px' }}
                                                    style={{ background: theme.palette.primary.main }}
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default SendJdEmail;
