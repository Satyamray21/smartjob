import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Stack, useTheme, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { fetchSingleJd, makeAnconstantId } from '../../../../reduxSlice/jdSlice';
import { format, parseISO } from 'date-fns';
import { unwrapResult } from '@reduxjs/toolkit';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const JdView = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { constantViewId, loading, status, error } = useSelector((state) => state.JD);
    const [viewJd, setViewJd] = useState({});

    useEffect(() => {
        if (constantViewId) {
            dispatch(fetchSingleJd(constantViewId))
                .then(unwrapResult)
                .then((res) => {
                    setViewJd(res?.data || {});
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [dispatch, constantViewId]);
    if (status === 'loading') {
        return <div>{loading}....</div>;
    }

    if (status === 'failed') {
        return <div>{error}</div>;
    }

    if (!viewJd) {
        return <div>Job not found</div>;
    }
    const editOnClickFunction = (id) => {
        dispatch(makeAnconstantId(id))
    }
    return (
        <>
            <Paper elevation={0} sx={{ height: { lg: '88vh', md: '88vh' }, width: 'auto', mt: 1, overflowY: 'scroll' }}>
                <Grid container>
                    <Grid item sx={12} md={9}>
                        <Box sx={{ p: 2 }}>
                            <Stack>
                                <Typography variant='h5' sx={{ color: theme.palette.primary.main }}>{viewJd?.job_title}</Typography>
                                <Typography sx={{ textTransform: 'uppercase' }} variant="body1" fontWeight="bold" align="left">
                                    {viewJd.company_name}
                                </Typography>
                                <Stack direction={'row'}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <WorkOutlineIcon sx={{ color: theme.palette.info.deem, fontSize: '13px', mr: 1 }} />
                                        <Typography variant='body2' sx={{ mr: 1 }}>
                                            {viewJd?.experience?.e_min} - {viewJd?.experience?.e_max} Years
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CurrencyRupeeIcon sx={{ color: theme.palette.info.deem, fontSize: '13px', mr: 1 }} />
                                        <Typography variant='body2' sx={{ mr: 1 }}>
                                            {viewJd?.salary?.s_min} - {viewJd?.salary?.s_max} Lacs p.a.
                                        </Typography>
                                    </Box>
                                    <Box variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocationOnIcon sx={{ color: theme.palette.info.deem, fontSize: '13px', mr: 1 }} />
                                        <Typography variant='body2'>{viewJd?.location}</Typography>
                                    </Box>
                                </Stack>
                                <Typography variant="body2">
                                    <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.deem, }}>Job Function:</Typography>
                                    {viewJd?.job_function}
                                </Typography>
                                <Typography variant="body2">
                                    <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.deem }}> Key Skills:</Typography>
                                    {viewJd?.key_skills}
                                </Typography>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} marginTop={1} justifyContent={'space-between'}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant='body2'>Job Applicant: {viewJd?.position} <FiberManualRecordIcon sx={{ fontSize: '7px', color: '#9e9e9e' }} /></Typography>
                                    <Typography variant='body2'>Posted on {viewJd?.start_date ? format(parseISO(viewJd?.start_date), 'dd MMM, yyyy') : ''}</Typography>
                                </Box>
                            </Stack>
                            <Stack direction="column" spacing={1}>
                                <Typography sx={{ textTransform: 'uppercase' }} variant="h6" fontWeight="bold" align="left">
                                    Job Description
                                </Typography>
                                <Typography variant="body1" fontWeight="bold" align="left">
                                    {viewJd.job_title} Job Responsibilities
                                </Typography>
                                <Typography>
                                    {viewJd?.job_description
                                        ?.split('.')
                                        .filter(sentence => sentence.trim() !== '')
                                        .map((sentence, index) => (
                                            <Typography variant='body2' key={index}>
                                                {sentence.trim()}.<br />
                                            </Typography>
                                        ))}
                                </Typography>
                                <Typography variant="body2">
                                    <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.deem }}>Job Function:</Typography>
                                    {viewJd?.job_function}
                                </Typography>
                                <Typography variant="body2">
                                    <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.deem }}>Qualification:</Typography>
                                    {viewJd?.qualification}
                                </Typography>
                                <Typography variant="body2">
                                    <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.deem }}>Employee Type:</Typography>
                                    Full Time
                                </Typography>
                            </Stack>
                            <Stack direction="column" marginTop={1} spacing={2}>
                                <Typography sx={{ textTransform: 'uppercase' }} variant="h6" fontWeight="bold" align="left">
                                    Key Skills
                                </Typography>
                                <Typography variant="body2">
                                    <Button variant='none' color='info' sx={{ background: theme.palette.info.light }}> {viewJd?.job_title}</Button>
                                </Typography>
                            </Stack>
                            <Stack direction="column" marginTop={1} spacing={2}>
                                <Typography sx={{ textTransform: 'uppercase' }} variant="h6" fontWeight="bold" align="left">
                                    About Hiring Company
                                </Typography>
                                <Typography variant="body2">
                                    <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.deem }}>Company:</Typography>
                                    {viewJd?.company_name}
                                </Typography>
                            </Stack>
                            <Stack>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 5,
                                        width: '110px'
                                    }}
                                    onClick={() => editOnClickFunction(viewJd?._id)} >
                                    <Link to={'/jdupdate'} style={{ textDecoration: 'none', color: '#fff', p: theme.spacing(1) }}>Edit Job</Link>
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
                <ToastContainer />
            </Paper>
        </>
    );
}

export default JdView;
