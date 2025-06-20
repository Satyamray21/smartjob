import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, Stack, Grid, Box, TableContainer, Dialog, TableHead, TableRow, Paper, IconButton, Tooltip, Typography, useTheme, DialogTitle, Divider, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRecruiter, removeRecruiter, } from '../../../../reduxSlice/recruiterSlice';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { IMG_BASE_URL } from '../../../../utils/Constants';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ListOfRecruiter = () => {
    const { palette, spacing } = useTheme();
    const dispatch = useDispatch();
    const { recruiterDetails, loading } = useSelector((state) => state.RECRUITER);
    const [showJd, setShowJd] = useState(null);
    const [page, setPage] = useState(0);
    const [rowPage, setRowPage] = useState(10);

    function recruiterId(data) {
        console.log("getId", data)
        setShowJd(data);
    }

    useEffect(() => {
        dispatch(fetchAllRecruiter()).then(unwrapResult).then(res => {
            console.log("res", res)
        }).catch(error => {
            console.log('error raised', error)
        });
        if (showJd) {
            setShowJd(showJd)
        }
    }, [dispatch, showJd]);

    // view dialog
    const [view, setView] = useState(false);

    const handleClickView = () => {
        setView(true);
    };
    const handleCloseView = () => {
        setView(false);
    };

    const handlePage = (e, index) => {
        setPage(index);
    }
    const handleRowPage = (e) => {
        setRowPage(parseInt(e.target.value, 10))
        setPage(0);
    }
    return (
        <>

            <Stack direction={'row'} sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#F0F2F5', justifyContent: 'space-between', }}>
                <Box sx={{ pl: 2 }}>
                    <Typography variant='h5'>All Recruiter Count [{recruiterDetails?.data?.length}]</Typography>
                </Box>
                <TablePagination
                    component='paper'
                    rowsPerPageOptions={[5, 10, 20, 30]}
                    rowsPerPage={rowPage}
                    page={page}
                    count={recruiterDetails?.data?.length}
                    onPageChange={handlePage}
                    onRowsPerPageChange={handleRowPage}
                >
                </TablePagination>
            </Stack>
            <TableContainer elevation={1} sx={{ border: '1px solid #e0e0e0', width: { md: '100%', xs: '375px' } }} component={Paper}>
                <Table aria-label="customized table" sx={{ minWidth: 450 }} size="small">
                    <TableHead >
                        <TableRow style={{ backgroundColor: palette.primary.main }} >
                            <TableCell align="center" sx={{ color: '#FFF' }}>S.No.</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF' }}>Image</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF' }}>Name</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF' }}>Email</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF' }}>Contact</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', width: '150px' }}>Local/City</TableCell>
                            {/* <TableCell align="center" sx={{ color: '#FFF' }}>Role</TableCell> */}
                            <TableCell align="center" sx={{ color: '#FFF' }}>State</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF', width: '150px' }}>District</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF' }}>PinCode</TableCell>
                            <TableCell align="center" sx={{ color: '#FFF' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <Typography variant="body1">Loading...</Typography>
                        ) : recruiterDetails?.data && recruiterDetails?.data?.length > 0 ? (
                            recruiterDetails?.data
                                ?.slice(page * rowPage, page * rowPage + rowPage)
                                ?.map((item, index) => (
                                    <TableRow key={item._id} >
                                        <TableCell sx={{ fontSize: "10px" }} align="center">{index + 1}</TableCell>
                                        <TableCell sx={{ fontSize: "10px" }} align="center"><Box style={{ borderRadius: '50%' }} component={'img'} alt={item?.profileImage} src={IMG_BASE_URL + 'uploads/' + item?.profileImage} sx={{ width: 30, height: 30 }} /></TableCell>
                                        <TableCell sx={{ fontSize: "10px" }} align="center">{`${item?.name?.first_name} ${item?.name?.last_name}`}</TableCell>
                                        <TableCell sx={{ fontSize: "10px" }} align="center">{item.email}</TableCell>
                                        <TableCell sx={{ fontSize: "10px" }} align="center">{item.phone}</TableCell>
                                        <TableCell sx={{ fontSize: "10px" }} align="center">{item?.address?.local}</TableCell>
                                        {/* <TableCell sx={{ fontSize: "10px" }} align="center">{item.role}</TableCell> */}
                                        <TableCell sx={{ fontSize: "10px" }} align="center">{item?.address?.state}</TableCell>
                                        <TableCell sx={{ fontSize: "10px" }} align="center">{item?.address?.district}</TableCell>
                                        <TableCell sx={{ fontSize: "10px" }} align="center">{item?.address?.pin_code}</TableCell>
                                        <TableCell align="center" sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                                            <Tooltip>
                                                <IconButton sx={{ '&:hover': { backgroundColor: '#e8eaf6' }, backgroundColor: '#dfdfdf', height: '35px', width: '35px', }} onClick={() => {
                                                    handleClickView();
                                                    recruiterId(item._id)
                                                }} size='small'>
                                                    <VisibilityOutlinedIcon sx={{ color: '#1a237e', p: 0.2, mt: 0.2 }} />
                                                </IconButton>
                                                <BootstrapDialog
                                                    onClose={handleCloseView}
                                                    aria-labelledby="customized-dialog-title"
                                                    open={view}
                                                >
                                                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                                        {item._id}
                                                    </DialogTitle>
                                                    <IconButton
                                                        aria-label="close"
                                                        onClick={handleCloseView}
                                                        sx={{
                                                            position: 'absolute',
                                                            right: 8,
                                                            top: 8,
                                                            color: (theme) => theme.palette.grey[500],
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                    <Divider />
                                                    <Box component={'form'} width={'400px'} sx={{ p: spacing(2) }}>
                                                        {/* Rest of your form */}
                                                        <Grid container md={12}>
                                                            <Grid item md={12} spacing={1}>
                                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                                    <Typography>First Name</Typography>
                                                                    <Typography variant='body2'>{item.name?.first_name}</Typography>
                                                                </Stack>
                                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                                    <Typography>Last Name</Typography>
                                                                    <Typography variant='body2'>{item.name?.last_name}</Typography>
                                                                </Stack>

                                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                                    <Typography>Email</Typography>
                                                                    <Typography variant='body2'>{item?.email}</Typography>
                                                                </Stack>

                                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                                    <Typography>Phone</Typography>
                                                                    <Typography variant='body2'>{item?.phone}</Typography>
                                                                </Stack>

                                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                                    <Typography>Local</Typography>
                                                                    <Typography variant='body2'>{item?.address?.local}</Typography>
                                                                </Stack>

                                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                                    <Typography>State</Typography>
                                                                    <Typography variant='body2'>{item?.address?.state}</Typography>
                                                                </Stack>

                                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                                    <Typography>Pin Code</Typography>
                                                                    <Typography variant='body2'>{item?.address?.pin_code}</Typography>
                                                                </Stack>
                                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                                    <Typography>District</Typography>
                                                                    <Typography variant='body2'>{item?.address?.district}</Typography>
                                                                </Stack>
                                                                <Stack direction={'row'} justifyContent={'space-between'}>
                                                                    <Typography>Password</Typography>
                                                                    <Typography variant='body2'>{item.password}</Typography>
                                                                </Stack>

                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </BootstrapDialog>
                                            </Tooltip>
                                            <Tooltip>
                                                <IconButton size='small' sx={{ '&:hover': { backgroundColor: '#c8e6c9' }, backgroundColor: '#dfdfdf', height: '35px', width: '35px', mx: 1, alignItems: 'center' }}>
                                                    <Link to={`/updaterecruiter/${item._id}`} style={{ textDecoration: 'none' }}>
                                                        <EditOutlinedIcon sx={{ color: '#1b5e20', p: 0.2, mt: 0.5 }} />
                                                    </Link>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip>
                                                <IconButton sx={{ height: '35px', width: '35px', '&:hover': { backgroundColor: '#ffc8cc' }, backgroundColor: '#dfdfdf' }} onClick={() => dispatch(removeRecruiter(item._id))}>
                                                    <DeleteForeverOutlinedIcon sx={{ color: '#d50' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9}>
                                    <Typography variant="body1" textAlign={'center'}>No recruiters found.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer >
        </>
    );
};

export default ListOfRecruiter;
