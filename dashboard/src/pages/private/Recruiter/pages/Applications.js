import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, OutlinedInput, TablePagination, IconButton, Grid, useTheme,
    TableFooter
} from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage, Search as SearchIcon, FileCopyOutlined } from '@mui/icons-material';
import { fetchApplicationsAll } from '../../../../reduxSlice/applicantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { format, parseISO } from 'date-fns';
import ClipLoader from 'react-spinners/ClipLoader';

// Pagination Controls
const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {
    const theme = useTheme();
    const isRtl = theme.direction === 'rtl';
    const handlePageChange = (newPage) => (event) => onPageChange(event, newPage);

    return (
        <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5) }}>
            <IconButton onClick={handlePageChange(0)} disabled={page === 0}>
                {isRtl ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton onClick={handlePageChange(page - 1)} disabled={page === 0}>
                {isRtl ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handlePageChange(page + 1)} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {isRtl ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handlePageChange(Math.ceil(count / rowsPerPage) - 1)} disabled={page >= Math.ceil(count / rowsPerPage) - 1}>
                {isRtl ? <FirstPage /> : <LastPage />}
            </IconButton>
        </div>
    );
};

const Applications = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { applications, loading, error } = useSelector((state) => state.APPLICATIONS);
    const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 10 });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchApplicationsAll()).then(unwrapResult).catch(console.error);
    }, [dispatch]);

    const handlePageChange = useCallback((_, newPage) => setPagination((prev) => ({ ...prev, page: newPage })), []);
    const handleRowsPerPageChange = useCallback((e) => setPagination({ page: 0, rowsPerPage: parseInt(e.target.value, 10) }), []);

    const filteredData = useMemo(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return applications?.data?.filter(({ name, email, contact }) =>
            name?.first_name?.toLowerCase().includes(lowercasedSearchTerm) ||
            email?.toLowerCase().includes(lowercasedSearchTerm) ||
            contact?.toString().includes(lowercasedSearchTerm)
        ) || [];
    }, [applications, searchTerm]);

    const paginatedData = useMemo(() => {
        const { page, rowsPerPage } = pagination;
        return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredData, pagination]);

    if (loading) return <Typography textAlign="center"><ClipLoader /></Typography>;
    if (error) return <Typography color="error" textAlign="center">{error}</Typography>;

    return (
        <>
            <Paper sx={{ height: { lg: '88vh', md: '88vh' }, width: 'auto', mt: 1, overflowY: 'scroll' }}>
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h5">Application Submitted [{filteredData.length}]</Typography>
                            <Typography variant="body2">List of Active Applications submitted</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', px: 1, backgroundColor: '#FDFDFD', border: '1px solid #eee', borderRadius: '50px' }}>
                                <SearchIcon sx={{ fontSize: '20px', color: '#9e9e9e' }} />
                                <OutlinedInput
                                    fullWidth size="small" placeholder="Search by Name, Email, or Mobile..."
                                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <TableContainer >
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ background: theme.palette.success.main }}>
                                {['Applicant Name', 'Applicant Email', 'Applicant Contact', 'For Requisition', 'Submitted On', 'App Status'].map((head) => (
                                    <TableCell key={head} sx={{ fontSize: '10px', color: '#FFF' }}>{head}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map(({ _id, name, email, contact, designation, createdAt, appStatus }) => (
                                    <TableRow key={_id}>
                                        <TableCell>{name}</TableCell>
                                        <TableCell>{email}</TableCell>
                                        <TableCell>
                                            <Typography variant='body2' sx={{ display: 'flex', gap: theme.spacing(1), alignItems: 'center' }}>
                                                <FileCopyOutlined fontSize='20px' /> {contact}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{designation}</TableCell>
                                        <TableCell>{createdAt ? format(parseISO(createdAt), 'MMM dd, yyyy') : ''}</TableCell>
                                        <TableCell>{appStatus}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Typography variant="body2">No applications found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    size="small"
                                    onPageChange={handlePageChange}
                                    rowsPerPage={pagination.rowsPerPage}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    count={filteredData.length}
                                    page={pagination.page}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default Applications;
