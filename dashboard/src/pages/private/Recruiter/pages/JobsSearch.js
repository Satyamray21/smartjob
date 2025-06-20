import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Box, Divider, List, Paper, Stack, TablePagination, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJd } from '../../../../reduxSlice/jdSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchSingleJd } from '../../../../reduxSlice/recruiterSlice';
import { format, parseISO } from 'date-fns';
import MoonLoader from 'react-spinners/MoonLoader';
import ClipLoader from 'react-spinners/ClipLoader';

const JobsSearch = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { jdDetails, loading, error } = useSelector((state) => state.JD);
    // const { loading } = useSelector((state) => state.RECRUITER);
    console.log("job all here...", jdDetails?.data)

    useEffect(() => {
        dispatch(fetchAllJd())
            .then(unwrapResult)
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, [dispatch]);

    const handleJobClick = useCallback((id) => {
        dispatch(fetchSingleJd(id))
            .then(unwrapResult)
            .then(result => console.log(result))
            .catch(error => console.log('Error raised:', error));
    }, [dispatch]);

    const handlePageChange = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const jobList = useMemo(() => {
        return jdDetails?.data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((job, index) => (
                <Box key={index} onClick={() => handleJobClick(job?._id)}>
                    <Stack sx={{ p: theme.spacing(2), m: theme.spacing(1), width: '96%', borderRadius: '10px', cursor: 'pointer', backgroundColor: '#F0F2F5' }}>
                        <Typography variant='h6' fontWeight='semi-bold'>{job?.job_title}</Typography>
                        <Typography variant='body2'>{job?.location}</Typography>
                        <Typography variant='body2'>{job?.start_date ? format(parseISO(job.start_date), 'dd MMM, yyyy') : ''}</Typography>
                    </Stack>
                </Box>
            ));
    }, [jdDetails, page, rowsPerPage, handleJobClick, theme]);

    if (loading) return <Typography textAlign="center"><ClipLoader /></Typography>;
    if (error) return <Typography color="error" textAlign="center">{error}</Typography>;
    return (
        <Paper sx={{ backgroundColor: '#FDFDFD' }}>
            <Typography variant='h5' fontWeight='bold' sx={{ pl: 2, p: 1 }}>Job Details</Typography>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TablePagination
                    component='div'
                    rowsPerPageOptions={[5, 10, 20, 30]}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    count={jdDetails?.data?.length || 0}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Box>
            <List sx={{ background: '#FFFFFF' }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                        <MoonLoader size={20} color="#000" />
                    </Box>
                ) : (
                    jobList
                )}
            </List>
        </Paper>
    );
};

export default JobsSearch;
