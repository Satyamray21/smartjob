import React, { useEffect, useState, useMemo } from 'react';
import {
    Table, TableBody, TableCell, Stack, Box, TableContainer, TableHead,
    TableRow, Paper, IconButton, Typography, useTheme,
    TablePagination, OutlinedInput, Grid, Skeleton,
    TableFooter
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchAllJd, makeAnconstantId, makeAnViewId } from '../../../../reduxSlice/jdSlice';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import debounce from 'lodash.debounce';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { RefreshOutlined } from '@mui/icons-material';
import ClipLoader from 'react-spinners/ClipLoader';

const TablePaginationActions = (props) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5) }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
};

const Jobs = () => {
    const [page, setPage] = useState(0);
    const [data, setData] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const dispatch = useDispatch();
    const { jdDetails, loading, error } = useSelector((state) => state.JD);
    console.log("jd detils", jdDetails)
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(fetchAllJd());
                unwrapResult(result);
            } catch (error) {
                console.error('Error fetching JDs:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleView = (id) => {
        dispatch(makeAnViewId(id));
    };

    const handleEdit = (id) => {
        dispatch(makeAnconstantId(id));
    };

    const handleSearchChange = useMemo(() => {
        return debounce((event) => {
            setSearchQuery(event.target.value.toLowerCase());
        }, 300);
    }, []);

    const filteredData = useMemo(() => {
        if (!searchQuery) return jdDetails?.data || [];

        return jdDetails?.data?.filter((item) => {
            const searchStr = searchQuery.toLowerCase();
            return (
                item?.job_title.toLowerCase().includes(searchStr) ||
                item?.company_name.toLowerCase().includes(searchStr) ||
                item?.job_id.toString().includes(searchStr)
            );
        });
    }, [jdDetails, searchQuery]);

    const paginatedData = useMemo(() => {
        return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const tableCellHoverStyles = {
        '&:hover': {
            backgroundColor: 'lightgray',
            borderLeft: '2px solid red',
            color: 'error.dark',
            '& .MuiListItemIcon-root': {
                color: 'error.dark',
            },
        },
    };
    const handleDownload = () => {
        // Prepare your data in an array of objects or arrays (each representing a row)
        const excelData = jdDetails.data.map(item => ({
            JobId: item.job_id,
            JobTitle: item.job_title,
            StartDate: item.start_date,
            CloseDate: item.close_date,
            CompanyName: `"${item.company_name}"`,  // Wrap in quotes for Excel
            Location: `"${item.location}"`,          // Wrap in quotes for Excel
            Salary: `"${item.salary?.s_min} - ${item.salary?.s_max} lakh"`, // Handle ranges
            Experience: `"${item.experience?.e_min} - ${item.experience?.e_max} years"`, // Handle ranges
            Positions: item.position
            // Add more fields as needed
        }));

        // Create a worksheet from the data
        const ws = XLSX.utils.json_to_sheet(excelData);

        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");

        // Create the Excel file and trigger the download
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(dataBlob, 'data.xlsx');
    };
    const handleRefresh = async () => {
        try {
            const result = await dispatch(fetchAllJd());
            unwrapResult(result);  // Handle successful data fetching
            setData(0);  // Reset pagination to the first page after refresh
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
    };

    const filteredCount = useMemo(() => {
        return filteredData.length; // Get total count for pagination
    }, [filteredData]);

    if (loading) return <Typography textAlign="center"><ClipLoader /></Typography>;
    if (error) return <Typography color="error" textAlign="center">{error}</Typography>;
    return (
        <>
            <Paper elevation={0} sx={{ height: { lg: '88vh', md: '88vh' }, width: 'auto', mt: 1, overflowY: 'scroll' }}>
                <Box sx={{ p: 2 }}>
                    <Grid container>
                        <Grid item xs={12} md={8} >
                            <Typography variant='h5'>
                                Requisitions Assigned [ {filteredData.length} ]
                            </Typography>
                            <Typography variant='body2'>
                                List of Requisitions Assigned
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', width: '100%', mt: { md: 0, xs: 1 }, gap: 1 }}>
                                <IconButton size='small' onClick={handleDownload}>
                                    <FileDownloadOutlinedIcon />
                                </IconButton>
                                <IconButton size='small' onClick={handleRefresh}>
                                    <RefreshOutlined />
                                </IconButton>
                                <Box sx={{ width: '100%', backgroundColor: '#FFF', display: 'flex', borderRadius: '50px', px: theme.spacing(1), alignItems: 'center', border: '1px solid #eee' }}>
                                    <SearchIcon sx={{ fontSize: '20px', color: '#9e9e9e' }} />
                                    <OutlinedInput
                                        size='small'
                                        fullWidth
                                        type="search"
                                        placeholder="Search by Job ID, Title, or Company..."
                                        onChange={handleSearchChange}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer>
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
                                {['JobId', 'JobTitle', 'StartDate', 'Actions', 'CloseDate', 'CompanyName', 'location', 'Salary', 'Experience', 'Positions'].map((header) => (
                                    <TableCell
                                        key={header}
                                        sx={{ fontSize: '13px', letterSpacing: '1px', color: '#FFF' }}
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
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ height: '20px', width: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ widht: '100%', height: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ widht: '100%', height: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ widht: '100%', height: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ widht: '100%', height: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ widht: '100%', height: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ widht: '100%', height: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ widht: '100%', height: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ widht: '100%', height: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" sx={{ widht: '100%', height: '20px', borderRadius: '3px' }} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((item) => (
                                    <TableRow sx={tableCellHoverStyles} key={item.job_id}>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">{item.job_id}</TableCell>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">{item.job_title}</TableCell>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">
                                            {item.start_date}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">
                                            <Stack direction="column" >
                                                <Link
                                                    onClick={() => handleView(item?._id)}
                                                    to="/job"
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            '&:hover': {
                                                                textDecoration: 'underline', // Hover state
                                                            },
                                                        }}
                                                    >
                                                        view jd
                                                    </Typography>
                                                </Link>
                                                <Link onClick={() => handleEdit(item?._id)} to="/job" style={{ textDecoration: 'none' }}>
                                                    <Typography
                                                        sx={{
                                                            '&:hover': {
                                                                textDecoration: 'underline', // Hover state
                                                            },
                                                        }}
                                                    >
                                                        submit
                                                    </Typography>
                                                </Link>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">
                                            {item.close_date}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">{item.company_name}</TableCell>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">{item.location}</TableCell>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">
                                            {item.salary ? `${(item.salary.s_min).toFixed(2)} - ${(item.salary.s_max).toFixed(2)} lakh` : 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">
                                            {item.experience ? `${item.experience.e_min} - ${item.experience.e_max} years` : 'N/A'}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '11px' }} align="left">
                                            {item.position || 'N/A'} candidates
                                        </TableCell>

                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} sx={{ fontSize: '11px' }}>
                                        <Typography variant="body1" textAlign="center">No jobs found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    count={filteredCount}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
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

export default Jobs;
