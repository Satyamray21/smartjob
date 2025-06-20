import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, Stack, Box, OutlinedInput, TableContainer, TableHead, TableRow, Paper, Tooltip, Typography, useTheme, TablePagination, IconButton, Dialog, DialogTitle, DialogContent, Grid, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteResume, fetchAllResume } from '../../../../reduxSlice/resumeSlice';
import { IMG_BASE_URL } from '../../../../utils/Constants';

const ResumeList = () => {
    const { palette, spacing } = useTheme();
    const dispatch = useDispatch();
    const { resumeData, loading } = useSelector((state) => state.RESUME);
    const [page, setPage] = useState(0);
    const [rowPage, setRowPage] = useState(20);
    const [openModal, setOpenModal] = useState(false); // State to open/close modal
    const [selectedImage, setSelectedImage] = useState(''); // State to store selected image

    useEffect(() => {
        dispatch(fetchAllResume()).then(unwrapResult).then(res => {
            console.log("res", res)
        }).catch(error => {
            console.log('error raised', error)
        });

    }, [dispatch]);

    const handlePage = (e, index) => {
        setPage(index);
    }
    const handleRowPage = (e) => {
        setRowPage(parseInt(e.target.value, 20))
        setPage(0);
    }
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
            backgroundColor: palette.info.light,
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
                    <Grid container alignItems={'center'}>
                        <Grid item xs={12} md={4}>
                            <Typography variant='h5'>
                                Resume Details [ {resumeData?.resumes?.length} ]
                            </Typography>
                            <Typography variant='body2'>
                                List of submitted resume
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mr: { xs: 5, md: 0, lg: 0 } }} md={5}>
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[5, 10, 20, 30]}
                                rowsPerPage={rowPage}
                                page={page}
                                count={resumeData?.resumes?.length || 0}
                                onPageChange={handlePage}
                                onRowsPerPageChange={handleRowPage}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box sx={{ backgroundColor: '#FFF', display: 'flex', borderRadius: '50px', px: 1, mr: 2, alignItems: 'center', border: '1px solid #eee' }}>
                                <SearchIcon sx={{ fontSize: '20px', color: '#9e9e9e' }} />
                                <OutlinedInput fullWidth size='small' type="search" placeholder="Search here..." />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <TableContainer>
                    <Table aria-label="a dense table" sx={{ minWidth: 450 }} size="small">
                        <TableHead >
                            <TableRow style={{ backgroundColor: palette.primary.main }} >
                                <TableCell align="center" sx={{ letterSpacing: '1px', fontSize: '10px', color: '#FFF' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ letterSpacing: '1px', fontSize: '10px', color: '#FFF' }}>Image</TableCell>
                                <TableCell align="left" sx={{ letterSpacing: '1px', fontSize: '10px', color: '#FFF' }}>Id</TableCell>
                                <TableCell align="center" sx={{ letterSpacing: '1px', fontSize: '10px', color: '#FFF' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <TableRow key={index}>
                                        {[{ variant: 'text', width: '20px' }, { variant: 'rectangular', width: '20px' }, { variant: 'text' }, { variant: 'text' },
                                        { variant: 'text' }, { variant: 'text' }, { variant: 'text' }, { variant: 'text' }, { variant: 'text' }
                                        ].map((skeleton, idx) => (
                                            <TableCell key={idx}>
                                                <Skeleton variant={skeleton.variant} sx={{ height: '15px', borderRadius: '3px', width: skeleton.width || '100%' }} />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : resumeData?.resumes && resumeData?.resumes?.length > 0 ? (
                                resumeData?.resumes
                                    ?.slice(page * rowPage, page * rowPage + rowPage)
                                    ?.map((item, index) => (
                                        <TableRow sx={tableCellHoverStyles} key={index} >
                                            <TableCell sx={{ fontSize: '10px' }} align="center">{index + 1}</TableCell>
                                            <TableCell sx={{ fontSize: "10px" }} align="center">
                                                <Box style={{ borderRadius: '50%' }}
                                                    component={'img'} alt={item?.profileImage}
                                                    src={`${IMG_BASE_URL}uploads/${item?.profileImage}`}
                                                    sx={{ width: '20px', height: '20px' }}
                                                    onClick={() => handleImageClick(`${IMG_BASE_URL}/uploads/${item?.profileImage}`)} >
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ fontSize: '10px' }} align="left">{item?._id}</TableCell>
                                            <TableCell sx={{ fontSize: '10px' }} align="left">
                                                <Stack direction={'row'} justifyContent={'center'}>
                                                    <Tooltip>
                                                        <IconButton sx={{ '&:hover': { backgroundColor: '#e8eaf6' }, height: '22px', width: '22px', }} size='small'>
                                                            <Link to={`/viewresume/${item._id}`} style={{ textDecoration: 'none' }}>
                                                                <VisibilityOutlinedIcon sx={{ color: '#1a237e', mt: 0.2, fontSize: '13px' }} />
                                                            </Link>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip>
                                                        <IconButton size='small' sx={{ '&:hover': { backgroundColor: '#c8e6c9' }, height: '22px', width: '22px', mx: 1, alignItems: 'center' }}>
                                                            <Link to={`/updateresume/${item._id}`} style={{ textDecoration: 'none' }}>
                                                                <EditOutlinedIcon sx={{ color: '#1b5e20', mt: 0.5, fontSize: '13px' }} />
                                                            </Link>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={item._id}>
                                                        <IconButton sx={{ height: '22px', width: '22px', '&:hover': { backgroundColor: '#ffc8cc' } }} onClick={() => dispatch(deleteResume(item._id))}>
                                                            <DeleteForeverOutlinedIcon sx={{ color: '#d50', fontSize: '13px' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell sx={{ fontSize: '10px' }} colSpan={9}>
                                        <Typography variant="body1" textAlign={'center'}>No recruiters found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer >
            </Paper>
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

export default ResumeList;
