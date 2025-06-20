import React, { useEffect, useMemo, useState } from 'react';
import { Box, Paper, Typography, Stack, useTheme, Pagination, Divider, Grid, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJd } from '../../../reduxSlice/jdSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { KeyboardArrowRight, Star } from '@mui/icons-material';
import { companySlides } from '../../../apiData/sliderData';

const CompanyList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { jdDetails } = useSelector((state) => state.JD);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 8;

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
        return companySlides.slice(startIndex, endIndex).map((company, index) => (
            <Grid item xs={12} sm={6} key={index}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: '8px' }}>
                    <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'} spacing={2}>
                        <Stack spacing={2} direction={'row'}>
                            <Box sx={{ width: 76, height: 56, backgroundSize: 'cover', borderRadius: '10px', display: 'flex', alignItems: 'center', border: '1px solid #eee' }}>
                                <img
                                    style={{ height: '100%', width: '100%' }}
                                    variant='square'
                                    src={company.image}

                                />
                            </Box>
                            <Stack spacing={1}>
                                <Typography variant='h6' sx={{ fontSize: '14px', color: theme.palette.info.main, textTransform: 'uppercase' }}>
                                    {company.title}
                                </Typography>
                                <Stack direction='row' spacing={1} alignItems="center">
                                    <Stack direction={'row'} spacing={1}>
                                        <Typography variant='body2' display={'flex'} alignItems={'center'}> <Star sx={{ fontSize: '15px', color: '#FDAA29' }} />{company.rating}</Typography>
                                        <Divider orientation="vertical" flexItem />
                                        <Typography variant='body2'>{company.reviews} reviews</Typography>
                                    </Stack>
                                </Stack>
                                <Box>
                                    <Chip size='small' label="IT & Consulting" variant="outlined" />
                                </Box>
                            </Stack>
                        </Stack>
                        <KeyboardArrowRight sx={{ fontSize: '20px' }} />
                    </Stack>
                </Paper>
            </Grid >
        ));
    }, [companySlides, currentPage, jobsPerPage, theme]);

    return (
        <Box>
            <Typography variant='body2' sx={{ fontSize: '15px', mb: 2 }}>
                Showing {companySlides.length || 0} companies
            </Typography>
            <Grid container spacing={2}>
                {jobList}
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Pagination
                    size='small'
                    color='error'
                    count={Math.ceil(companySlides.length / jobsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                />
            </Box>
        </Box>
    );
};

export default CompanyList;
