import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Stack, useTheme, Divider, Box } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSingleRecruiter } from '../../../../reduxSlice/recruiterSlice';
import { IMG_BASE_URL } from '../../../../utils/Constants';
import ClipLoader from 'react-spinners/ClipLoader';

const RecruiterView = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const { constantIdViewRc1, loading, error } = useSelector((state) => state.RECRUITER);
    const [viewRc1, setViewRc1] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (constantIdViewRc1) {
                try {
                    const result = await dispatch(fetchSingleRecruiter(constantIdViewRc1)).unwrap();
                    toast.success("Recruiter data fetched successfully!");
                    setViewRc1(result?.data || null);
                } catch (err) {
                    toast.error("Error fetching recruiter data");
                    setViewRc1(null);
                }
            }
        };
        fetchData();
    }, [constantIdViewRc1, dispatch]);

    const handleToggle = () => {
        setToggle((prev) => !prev);
    };
    if (loading) return <Typography textAlign="center"><ClipLoader /></Typography>;
    if (error) return <Typography color="error" textAlign="center">{error}</Typography>;

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={toggle}
                newestOnTop={toggle}
                closeOnClick={handleToggle}
                rtl={toggle}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


            <Paper elevation={2} sx={{ px: theme.spacing(2), mt: 1, py: theme.spacing(2) }}>
                <Stack direction="column" spacing={2}>
                    <Typography variant="h4" fontWeight='bold'>
                        {viewRc1?.name.first_name} {viewRc1?.name.last_name}
                    </Typography>
                    <Divider />
                    <Stack direction={'row'} sx={{ display: { md: 'flex', xs: 'block' } }} gap={2}>
                        <Box
                            style={{ borderRadius: '5px', mt: 1, cursor: 'pointer' }}
                            component="img"
                            alt={viewRc1?.name.first_name}
                            src={`${IMG_BASE_URL}/uploads/${viewRc1?.profileImage}`}
                            sx={{ width: { md: '340px', xs: '100%' }, height: '400px' }}
                        >
                        </Box>
                        <Grid container sx={{ background: '#F1F2F5', borderRadius: '5px', p: 2 }}>
                            {/* First Name */}
                            <Grid item sm={6} xs={6}>
                                <Typography>First Name</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.name?.first_name || 'N/A'}</Typography>
                            </Grid>
                            {/* Last Name */}
                            <Grid item sm={6} xs={6}>
                                <Typography>Last Name</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.name?.last_name || 'N/A'}</Typography>
                            </Grid>
                            {/* Role */}
                            <Grid item sm={6} xs={6}>
                                <Typography>Role</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.role || 'N/A'}</Typography>
                            </Grid>
                            {/* Mobile */}
                            <Grid item sm={6} xs={6}>
                                <Typography>Mobile</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.mobile || 'N/A'}</Typography>
                            </Grid>
                            {/* Email */}
                            <Grid item sm={6} xs={6}>
                                <Typography>Email</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.email || 'N/A'}</Typography>
                            </Grid>
                            {/* Gender */}
                            <Grid item sm={6} xs={6}>
                                <Typography>Gender</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.gender || 'N/A'}</Typography>
                            </Grid>
                            {/* Skills */}
                            <Grid item sm={6} xs={6}>
                                <Typography>Skills</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.skills || 'N/A'}</Typography>
                            </Grid>
                            {/* Education */}
                            <Grid item sm={6} xs={6}>
                                <Typography>Education</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.education || 'N/A'}</Typography>
                            </Grid>
                            {/* Experience */}
                            <Grid item sm={6} xs={6}>
                                <Typography>Experience in Years</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.experience?.years || 'N/A'}</Typography>
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <Typography>Experience in Months</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.experience?.months || 'N/A'}</Typography>
                            </Grid>
                            {/* Current Location */}
                            <Grid item sm={6} xs={6}>
                                <Typography>Pin Code</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.current_location?.pin_code || 'N/A'}</Typography>
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <Typography>Locality</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.current_location?.locality || 'N/A'}</Typography>
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <Typography>City</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.current_location?.city || 'N/A'}</Typography>
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <Typography>State</Typography>
                                <Typography variant='body2' sx={{ color: theme.palette.primary.main }}>{viewRc1?.current_location?.state || 'N/A'}</Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Paper>

        </>
    );
};

export default RecruiterView;
