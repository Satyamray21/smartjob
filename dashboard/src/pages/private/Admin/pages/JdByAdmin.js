import React, { useEffect, useState, useMemo } from 'react';
import {
    Table, TableBody, TableCell, Stack, Box, TableContainer, TableHead,
    TableRow, Paper, IconButton, Tooltip, Typography, useTheme,
    TablePagination, OutlinedInput,
    debounce,
    Grid,
    Skeleton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { makeAnconstantId, makeAnViewId } from '../../../../reduxSlice/jdSlice';
import BackupIcon from '@mui/icons-material/Backup';
import { getJdByAdmin } from '../../../../reduxSlice/adminSlice';

const JdByAdmin = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { jobs, loading } = useSelector((state) => state.ADMIN);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getJdByAdmin())
            .then(unwrapResult)
            .catch((error) => {
                console.error('Error fetching JDs:', error);
            });
    }, [dispatch]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 20));
        setPage(0);
    };

    const handleView = (id) => {
        dispatch(makeAnViewId(id));
    };

    const handleEdit = (id) => {
        dispatch(makeAnconstantId(id));
    };

    const handleSearchChange = debounce((event) => {
        setSearchQuery(event.target.value.toLowerCase());
    }, 300);

    const filteredData = useMemo(() => {
        if (!searchQuery) return jobs?.data || [];

        return jobs?.data?.filter((item) => {
            const searchStr = searchQuery.toLowerCase();
            return (
                item?.job_title.toLowerCase().includes(searchStr) ||
                item?.company_name.toLowerCase().includes(searchStr) ||
                item?.job_id.toString().includes(searchStr)
            );
        });
    }, [jobs, searchQuery]);

    const paginatedData = useMemo(() => {
        if (!Array.isArray(filteredData)) {
            return [];
        }
        return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const tableCellHoverStyles = {
        '&:hover': {
            background: theme.palette.info.light,
            borderLeft: '2px solid red',
            color: 'error.dark',
            '& .MuiListItemIcon-root': {
                color: 'error.dark',
            },
        },
    };
    return (
        <>
            <Paper elevation={0} sx={{ height: { lg: '88vh', md: '88vh' }, width: 'auto', mt: 1, overflowY: 'scroll' }}>
                <Box sx={{ p: theme.spacing(2) }}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={12} md={4}>

                            <Typography variant='h5'>
                                Application Submitted [ {filteredData.length} ]
                            </Typography>
                            <Typography variant='body2'>
                                List of Active Applications Submitted
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mr: { xs: 5, md: 0, lg: 0 } }} md={5}>
                            <TablePagination
                                component="paper"
                                rowsPerPageOptions={[5, 10, 20, 30]}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                count={filteredData.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Box sx={{ backgroundColor: '#FFF', display: 'flex', borderRadius: '50px', px: theme.spacing(1), alignItems: 'center', border: '1px solid #eee' }}>
                                <SearchIcon sx={{ fontSize: '20px', color: '#9e9e9e' }} />
                                <OutlinedInput
                                    size='small'
                                    fullWidth
                                    type="search"
                                    placeholder="Search by Job ID, Title, or Company..."
                                    onChange={handleSearchChange}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer>
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
                                {['JobId', 'JobTitle', 'StartDate', 'CloseDate', 'CompanyName', 'Salary', 'Experience', 'Positions', 'Actions'].map((header) => (
                                    <TableCell
                                        key={header}
                                        sx={{ fontSize: '10px', letterSpacing: '1px', color: '#FFF' }}
                                        align="left"
                                    >
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 10 }).map((_, index) => (
                                    <TableRow key={index}>
                                        {[{ variant: 'text', width: '20px' }, { variant: 'text' }, { variant: 'text' }, { variant: 'text' },
                                        { variant: 'text' }, { variant: 'text' }, { variant: 'text' }, { variant: 'text' }, { variant: 'text' }
                                        ].map((skeleton, idx) => (
                                            <TableCell key={idx}>
                                                <Skeleton variant={skeleton.variant} sx={{ height: '15px', borderRadius: '3px', width: skeleton.width || '100%' }} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((item) => (
                                    <TableRow sx={tableCellHoverStyles} key={item.job_id}>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item.job_id}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item.job_title}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item.start_date}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item.close_date}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item.company_name}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">
                                            {item.salary ? `${(item.salary.s_min).toFixed(2)} - ${(item.salary.s_max).toFixed(2)} lakh` : 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">
                                            {item.experience ? `${item.experience.e_min} - ${item.experience.e_max} years` : 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item.position || 'N/A'} candidates</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">
                                            <Stack direction="row" justifyContent="center">
                                                <Tooltip title="View Jd">
                                                    <IconButton
                                                        sx={{ height: '22px', width: '22px' }}
                                                        size="small"
                                                        onClick={() => handleView(item?._id)}
                                                    >
                                                        <Link to="/jdview" style={{ textDecoration: 'none' }}>
                                                            <VisibilityOutlinedIcon sx={{ color: '#1a237e', pt: 0.1, fontSize: '13px' }} />
                                                        </Link>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Submit">
                                                    <IconButton
                                                        size="small"
                                                        sx={{ height: '22px', width: '22px', mx: theme.spacing(1) }}
                                                        onClick={() => handleEdit(item?._id)}
                                                    >
                                                        <Link to="/job" style={{ textDecoration: 'none' }}>
                                                            <BackupIcon sx={{ color: '#1b5e20', fontSize: '13px' }} />
                                                        </Link>
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} sx={{ fontSize: '10px' }}>
                                        <Typography variant="body1" textAlign="center">No jobs found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default JdByAdmin;
