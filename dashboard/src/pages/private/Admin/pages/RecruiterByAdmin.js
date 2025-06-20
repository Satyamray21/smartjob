import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, Stack, Box, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Typography, useTheme, TablePagination, OutlinedInput, Dialog, DialogContent, DialogTitle, Grid, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { makeAnconstantId, makeAnViewId } from '../../../../reduxSlice/recruiterSlice';
import { Link } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { IMG_BASE_URL } from '../../../../utils/Constants';
import { debounce } from 'lodash';
import { getRecruitersByAdmin } from '../../../../reduxSlice/adminSlice';

const RecruiterByAdmin = () => {
    const { palette, spacing } = useTheme();
    const dispatch = useDispatch();
    const { recruiters, loading } = useSelector((state) => state.ADMIN);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState('');
    const [openModal, setOpenModal] = useState(false); // State to open/close modal
    const [selectedImage, setSelectedImage] = useState(''); // State to store selected image

    useEffect(() => {
        dispatch(getRecruitersByAdmin())
            .then(unwrapResult)
            .catch((error) => {
                console.error('Error fetching recruiters by admin id:', error);
            });
    }, [dispatch]);

    const handlePageChange = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const handleSearchChange = debounce((event) => {
        setSearchQuery(event.target.value.toLowerCase());
    }, 300);

    const filteredData = useMemo(() => {
        if (!searchQuery) return recruiters?.data || [];
        return recruiters?.data?.filter((item) => {
            const searchStr = searchQuery.toLowerCase();
            const mobile = item?.mobile ? item.mobile.toString().toLowerCase() : '';
            return (
                item?.name?.first_name?.toLowerCase().includes(searchStr) ||
                mobile.includes(searchStr) ||
                item?.email?.toLowerCase().includes(searchStr)
            );
        });
    }, [recruiters, searchQuery]);

    const paginatedData = useMemo(
        () => filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [filteredData, page, rowsPerPage]
    );

    const handleView = (id) => {
        dispatch(makeAnViewId(id));
    };

    const handleEdit = (id) => {
        dispatch(makeAnconstantId(id));
    };

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc); // Set the selected image
        setOpenModal(true); // Open the modal
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close the modal
        setSelectedImage(''); // Clear the selected image
    };
    const tableCellHoverStyles = {
        '&:hover': {
            background: palette.info.light,
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
                <Box sx={{ p: spacing(2) }}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={12} md={4} >
                            <Typography variant="h5">
                                Recruiter Details [ {filteredData?.length} ]
                            </Typography>
                            <Typography variant="body2">
                                List of Active Recruiters
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
                            <Box sx={{ backgroundColor: '#FFF', display: 'flex', px: 1, borderRadius: '50px', alignItems: 'center', border: '1px solid #eee' }}>
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
                <TableContainer >
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: palette.primary.main }} >
                                {['S.No', 'Image', 'Name', 'Email Id', 'Mobile No', 'Job Function', 'Address', 'Actions'].map((header) => (
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
                                Array.from({ length: 5 }).map((_, index) => (
                                    <TableRow key={index}>
                                        {[{ variant: 'text', width: '20px' }, { variant: 'rectangular', width: '20px' }, { variant: 'text' }, { variant: 'text' },
                                        { variant: 'text' }, { variant: 'text' }, { variant: 'text' }, { variant: 'text' }
                                        ].map((skeleton, idx) => (
                                            <TableCell key={idx}>
                                                <Skeleton variant={skeleton.variant} sx={{ height: '15px', borderRadius: '3px', width: skeleton.width || '100%' }} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <TableRow sx={tableCellHoverStyles} key={item._id}>
                                        <TableCell sx={{ fontSize: '10px' }} align="center">{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ fontSize: "10px" }} align="center">
                                            <Box
                                                style={{ borderRadius: '5px', cursor: 'pointer' }}
                                                component="img"
                                                alt=""
                                                src={`${IMG_BASE_URL}/uploads/${item?.profileImage}`}
                                                sx={{ width: '22px', height: '22px' }}
                                                onClick={() => handleImageClick(`${IMG_BASE_URL}/uploads/${item?.profileImage}`)} // Open modal on click
                                            >
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "10px" }} align="left">{`${item?.name?.first_name} ${item?.name?.last_name}`}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item.email}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item.mobile}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item.job_function}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="left">{item?.current_location?.locality}, {item?.current_location?.pin_code},{item?.current_location?.city},{item?.current_location?.state}</TableCell>
                                        <TableCell sx={{ fontSize: '10px' }} align="center">
                                            <Stack direction="row" justifyContent="center">
                                                <Tooltip title="View">
                                                    <IconButton
                                                        sx={{ height: '22px', width: '22px' }}
                                                        size="small"
                                                        onClick={() => handleView(item?._id)}
                                                    >
                                                        <Link to="/recruiterview" style={{ textDecoration: 'none' }}>
                                                            <VisibilityOutlinedIcon sx={{ color: '#1a237e', pt: 0.1, fontSize: '13px' }} />
                                                        </Link>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        size="small"
                                                        sx={{ height: '22px', width: '22px' }}
                                                        onClick={() => handleEdit(item?._id)}
                                                    >
                                                        <Link to="/recruiterupdate" style={{ textDecoration: 'none' }}>
                                                            <EditOutlinedIcon sx={{ color: '#2e7d32', pt: 0.1, fontSize: '13px' }} />
                                                        </Link>
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} sx={{ textAlign: 'center' }}>
                                        No data found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Modal to display recruiter image */}
            <Dialog open={openModal} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Recruiter Image
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <img src={selectedImage} alt="Recruiter" style={{ width: '100%', height: '400px' }} />
                </DialogContent>
            </Dialog>

        </>
    );
};

export default RecruiterByAdmin;
