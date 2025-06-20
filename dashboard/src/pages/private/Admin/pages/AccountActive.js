import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Grid,
    OutlinedInput,
    Chip,
    Skeleton
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTheme } from "@emotion/react";
import { debounce } from 'lodash';
import { IMG_BASE_URL } from "../../../../utils/Constants.js";
import { getAllActiveRecruiters, inActiveStatus } from "../../../../reduxSlice/recruiterSlice.js";
import SearchIcon from '@mui/icons-material/Search';
import { toast } from "react-toastify";

const AccountActive = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const { activeAlert, recruiterDetails } = useSelector((state) => state.RECRUITER);
    console.log("active user find", activeAlert);

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const resultAction = await dispatch(getAllActiveRecruiters());
            toast.success(resultAction.payload.message);
        } catch (error) {
            console.error("Error fetching recruiters:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInactiveClick = async (id) => {
        try {
            const resultAction = await dispatch(inActiveStatus(id));
            const result = unwrapResult(resultAction);
            if (result && result.status) {
                fetchData();
            }
        } catch (error) {
            console.error("Error occurred while making user inactive:", error);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchChange = debounce((event) => {
        setSearchQuery(event.target.value.toLowerCase());
    }, 300);

    const filteredData = useMemo(() => {
        if (!searchQuery) return recruiterDetails || [];
        return recruiterDetails?.filter((item) => {
            const searchStr = searchQuery.toLowerCase();
            const mobile = item?.mobile ? item.mobile.toString().toLowerCase() : '';
            return (
                item?.name?.first_name?.toLowerCase().includes(searchStr) ||
                mobile.includes(searchStr) ||
                item?.email?.toLowerCase().includes(searchStr)
            );
        });
    }, [recruiterDetails, searchQuery]);

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
                    <Grid container alignItems={'center'}>
                        <Grid item xs={12} md={4} >
                            <Typography variant="h5">
                                Recruiter Details [ {filteredData?.length} ]
                            </Typography>
                            <Typography variant="body2">
                                List of Active RecruiterDetails
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mr: { xs: 5, md: 0, lg: 0 } }} md={5}>
                            <TablePagination
                                component="paper"
                                rowsPerPageOptions={[5, 10, 20, 30]}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                count={filteredData?.length || 0}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{ backgroundColor: '#FFF', display: 'flex', borderRadius: '50px', px: 1, alignItems: 'center', border: '1px solid #eee' }}>
                                <SearchIcon sx={{ fontSize: '20px', color: '#9e9e9e' }} />
                                <OutlinedInput
                                    size="small"
                                    type="search"
                                    fullWidth
                                    placeholder="Search by Name, Email, or Mobile..."
                                    onChange={handleSearchChange}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer>
                    <Table aria-label="customized table" sx={{ minWidth: 450 }} size="small">
                        <TableHead>
                            <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
                                {['S.No', 'Image', 'Name', 'Email Id', 'Mobile No', 'Job Function', 'Actions'].map((header) => (
                                    <TableCell TableCell
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
                                        {[{ variant: 'text', width: '20px' }, { variant: 'rectangular', width: '20px' }, { variant: 'text' }, { variant: 'text' },
                                        { variant: 'text' }, { variant: 'text' }, { variant: 'text' }
                                        ].map((skeleton, idx) => (
                                            <TableCell key={idx}>
                                                <Skeleton variant={skeleton.variant} sx={{ height: '15px', borderRadius: '3px', width: skeleton.width || '100%' }} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : paginatedData?.length > 0 ? (
                                paginatedData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => (
                                        <TableRow sx={tableCellHoverStyles} key={item._id}>
                                            <TableCell sx={{ fontSize: "10px" }} align="left">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell sx={{ fontSize: "10px" }} align="left">
                                                <Box
                                                    style={{ borderRadius: '5px', cursor: 'pointer' }}
                                                    component="img"
                                                    alt=""
                                                    src={`${IMG_BASE_URL}/uploads/${item?.profileImage}`}
                                                    sx={{ width: '22px', height: '22px' }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ fontSize: "10px" }} align="left">{`${item?.name?.first_name} ${item?.name?.last_name}`}</TableCell>
                                            <TableCell sx={{ fontSize: "10px" }} align="left">{item.email}</TableCell>
                                            <TableCell sx={{ fontSize: "10px" }} align="left">{item.job_function}</TableCell>
                                            <TableCell sx={{ fontSize: "10px" }} align="left">{item.mobile}</TableCell>
                                            <TableCell sx={{ fontSize: "10px", fontWeight: 'bold' }} align="left">
                                                <Chip
                                                    label={item.status === 1 ? "Active" : "Inactive"}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: item?.status === 1
                                                            ? theme.palette.success.main
                                                            : theme.palette.error.main,
                                                        color: 'white', // Text color for better visibility
                                                        "&:hover": {
                                                            backgroundColor: item?.status === 1
                                                                ? theme.palette.success.dark
                                                                : theme.palette.error.dark,
                                                        },
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleInactiveClick(item._id)} // On click action remains the same
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Typography variant="body1" textAlign="center">No recruiters found.</Typography>
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

export default AccountActive;
