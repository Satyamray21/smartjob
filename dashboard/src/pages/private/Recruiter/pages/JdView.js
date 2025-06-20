import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Stack, useTheme, Box, Button, Skeleton } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSingleJd, makeAnViewId } from '../../../../reduxSlice/jdSlice';
import { format, parseISO } from 'date-fns';
import { unwrapResult } from '@reduxjs/toolkit';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const JdView = ({ switchToApplicationTab }) => {
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
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 3 }}>
                        <Stack>
                            <Skeleton variant="text" width="40%" height={40} />
                            <Skeleton variant="text" width="30%" height={30} />
                            <Stack direction={'row'} spacing={2} mt={1}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Skeleton variant="circular" width={20} height={20} />
                                    <Skeleton variant="text" width={80} height={25} sx={{ ml: 1 }} />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Skeleton variant="circular" width={20} height={20} />
                                    <Skeleton variant="text" width={80} height={25} sx={{ ml: 1 }} />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Skeleton variant="circular" width={20} height={20} />
                                    <Skeleton variant="text" width={80} height={25} sx={{ ml: 1 }} />
                                </Box>
                            </Stack>
                            <Skeleton variant="text" width="60%" height={25} sx={{ mt: 2 }} />
                            <Skeleton variant="text" width="50%" height={25} />
                            <Skeleton variant="text" width="70%" height={25} />
                            <Skeleton variant="text" width="40%" height={25} />
                            <Skeleton variant="rectangular" width={100} height={40} sx={{ mt: 3 }} />
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    if (status === 'failed') {
        return <div>{error}</div>;
    }

    if (!viewJd) {
        return <div>Job not found</div>;
    }

    const handleApply = (id) => {
        dispatch(makeAnViewId(id));
        switchToApplicationTab();
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Grid container>
                <Grid item xs={12} md={12}>
                    <Paper elevation={0} sx={{ p: 3 }}>
                        <Stack spacing={1}>
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
                            <Typography variant="body2">
                                <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.deem }}>Qualification:</Typography>
                                {viewJd?.qualification}
                            </Typography>
                            <Typography variant="body2">
                                <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.deem }}>Employee Type:</Typography>
                                Full Time
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} mt={1} alignItems={'center'} justifyContent={'space-between'}>
                            <Button onClick={() => handleApply(viewJd?._id)} size="small" variant='contained' color='error' sx={{ px: 3 }}>Apply</Button>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant='body2'>Job Applicant: {viewJd?.position} <FiberManualRecordIcon sx={{ fontSize: '7px', color: '#9e9e9e' }} /></Typography>
                                <Typography variant='body2'>Posted on {viewJd?.start_date ? format(parseISO(viewJd?.start_date), 'dd MMM, yyyy') : ''}</Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default JdView;
