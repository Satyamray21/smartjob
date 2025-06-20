import React, { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Typography, Stack, useTheme, Button, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJd } from '../../../reduxSlice/jdSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { format, parseISO } from 'date-fns';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const JobSearch = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { jdDetails } = useSelector((state) => state.JD);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 4;

    useEffect(() => {
        dispatch(fetchAllJd())
            .then(unwrapResult)
            .catch((error) => {
                console.error(error);
            });
    }, [dispatch]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const jobList = useMemo(() => {
        const startIndex = (currentPage - 1) * jobsPerPage;
        const endIndex = startIndex + jobsPerPage;
        return jdDetails?.data?.slice(startIndex, endIndex).map((job, index) => (
            <Box sx={{ my: 1 }} key={index}>
                <Paper sx={{ p: 2 }}>
                    <Stack>
                        <Typography sx={{ fontSize: '15px', color: theme.palette.primary.main }}>{job.job_title}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h5' sx={{ fontSize: '13px', color: theme.palette.info.main, textTransform: 'uppercase' }}>{job.company_name}</Typography>
                        </Box>
                        <Stack direction={'row'}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WorkOutlineIcon sx={{ color: theme.palette.info.dark, fontSize: '13px', mr: 1 }} />
                                <Typography variant='body2' sx={{ mr: 1 }}>
                                    {job.experience?.e_min} - {job.experience?.e_max} Years
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CurrencyRupeeIcon sx={{ color: theme.palette.info.dark, fontSize: '13px', mr: 1 }} />
                                <Typography variant='body2' sx={{ mr: 1 }}>
                                    {job.salary?.s_min} - {job.salary?.s_max} Lacs p.a.
                                </Typography>
                            </Box>
                            <Box variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon sx={{ color: theme.palette.info.dark, fontSize: '13px', mr: 1 }} />
                                <Typography variant='body2'>{job.location}</Typography>
                            </Box>
                        </Stack>
                        <Typography variant="body2">
                            <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.dark }}>Job Description:</Typography>
                            {job.job_description}
                        </Typography>
                        <Typography variant="body2">
                            <Typography component={'span'} fontWeight={'semi-bold'} sx={{ mr: 1, color: theme.palette.info.dark }}> Key Skills:</Typography>
                            {job.key_skills}
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} marginTop={1} justifyContent={'space-between'}>
                        <Button size="small" variant='contained' color='error' sx={{ px: 2 }}>Apply</Button>
                        <Typography variant='body2'>Posted on {job.start_date ? format(parseISO(job.start_date), 'dd MMM, yyyy') : 'Posted few days ago'}</Typography>
                    </Stack>
                </Paper>
            </Box>
        ));
    }, [jdDetails, currentPage, jobsPerPage, theme]);

    return (
        <Box>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {jdDetails?.data?.length || 0} Jobs Found
            </Typography>
            <Box>{jobList}</Box>
            <Box sx={{ textAlign: 'center', my: 2 }}>
                <Pagination
                    size='small'
                    color='error'
                    count={Math.ceil(jdDetails?.data?.length / jobsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                />
            </Box>
        </Box>
    );
};

export default JobSearch;
