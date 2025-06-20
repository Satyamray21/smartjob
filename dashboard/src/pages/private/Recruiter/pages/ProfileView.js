import React from 'react'
import { Box, Typography, Avatar, Divider, Paper, Grid, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { IMG_BASE_URL } from '../../../../utils/Constants';
import { useTheme } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import {
    AccountBalanceWalletOutlined, EmailOutlined as EmailOutlinedIcon,
    LocationOnOutlined as LocationOutlinedOnIcon,
    CallOutlined as CallOutlinedIcon,
    BusinessCenterOutlined,
} from '@mui/icons-material';

const ProfileView = () => {
    const theme = useTheme();
    const { recruiter, loading, error } = useSelector((state) => state.RECRUITER);
    const image_path = `${IMG_BASE_URL}/uploads/${recruiter?.profileImage ?? 'defaultImage.jpg'}`;
    if (loading) return <Typography textAlign="center"><ClipLoader /></Typography>;
    if (error) return <Typography color="error" textAlign="center">{error}</Typography>;
    return (
        <>
            <Grid container>
                <Grid item xs={12} >
                    <Paper elevation={0} sx={{ borderRadius: '10px', p: 4 }}>
                        <Box sx={{ flexDirection: { md: 'row', xs: 'column' }, display: 'flex' }} spacing={3}>
                            <Avatar style={{ height: '150px', width: '150px', border: '3px solid #f0f1f5' }}
                                alt={recruiter?.name?.first_name} src={image_path}>
                            </Avatar>
                            <Stack spacing={2} sx={{ width: '100%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <Typography variant='h5' fontWeight='bold'>
                                                {recruiter?.name?.first_name} {recruiter?.name?.last_name}
                                            </Typography>
                                            <Typography variant='body2' >
                                                {recruiter?.skills}
                                            </Typography>
                                            <Box sx={{ display: 'flex', mb: 2, flexDirection: { lg: 'row', md: 'row', xs: 'column' }, justifyContent: 'space-between' }}>
                                                <Typography variant='body2'>
                                                    {recruiter?.email}
                                                </Typography>
                                                <Typography variant='body2' sx={{ mb: 1 }}>Profile Last Update 2 Oct, 2024</Typography>
                                            </Box>
                                        </Stack>
                                        <Divider />
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={2}>
                                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                <LocationOutlinedOnIcon sx={{ color: theme.palette.info.dark, fontSize: '15px' }} />
                                                <Typography variant='body2'>{recruiter?.current_location?.locality}, {recruiter?.current_location?.city}, {recruiter?.current_location?.pin_code}, {recruiter?.current_location?.state}, India</Typography>
                                            </Stack>
                                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                <BusinessCenterOutlined sx={{ color: theme.palette.info.dark, fontSize: '15px' }} />
                                                <Typography variant='body2'>{recruiter?.experience?.years} Year {recruiter?.experience?.months} Months</Typography>
                                            </Stack>
                                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                <AccountBalanceWalletOutlined sx={{ color: theme.palette.info.dark, fontSize: '15px' }} />
                                                <Typography variant='body2'>₹ 2,00,000</Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <Stack spacing={2}>
                                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                <CallOutlinedIcon sx={{ color: theme.palette.info.dark, fontSize: '15px' }} />
                                                <Typography variant='body2'> {recruiter?.mobile}</Typography>
                                            </Stack>
                                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                <EmailOutlinedIcon sx={{ color: theme.palette.info.dark, fontSize: '15px' }} />
                                                <Typography variant='body2'> {recruiter?.email}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfileView