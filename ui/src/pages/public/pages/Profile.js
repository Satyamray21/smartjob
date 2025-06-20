import React from 'react';
import { Box, Typography, Avatar, Divider, Paper, Grid, Stack, useTheme, Button } from '@mui/material';
import {
    EmailOutlined as EmailOutlinedIcon,
    LocationOnOutlined as LocationOutlinedOnIcon,
    CallOutlined as CallOutlinedIcon,
    BusinessCenterOutlined,
    AccountBalanceWalletOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ResumeUploader from './ResumeUploader';

const Profile = () => {
    const { palette, spacing } = useTheme();

    return (
        <>
            <Box sx={{ background: '#f0f1f5', py: 2, px: { md: spacing(1), lg: spacing(17), xs: spacing(2) } }}>
                <Grid container >
                    <Grid item xs={12} >
                        <Paper elevation={0} sx={{ borderRadius: '10px', px: 4, py: 2 }}>
                            <Stack direction={'row'} spacing={5}>
                                <Avatar style={{ height: '150px', width: '150px', border: '5px solid #1f5' }}
                                    alt="" src="">
                                </Avatar>
                                <Stack spacing={1} sx={{ width: '100%' }}>
                                    <Typography variant='h5' fontWeight='bold'>
                                        Amit Kumar
                                    </Typography>
                                    <Typography variant='body2' >
                                        Full Stack Web Developer
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant='body2'>
                                            amitk221003@gmail.com
                                        </Typography>
                                        <Typography variant='body2'>Profile Last Update 2 Oct, 2024</Typography>
                                    </Box>
                                    <Divider />
                                    <Grid container >
                                        <Grid item sm={6} xs={12}>
                                            <Stack spacing={2}>
                                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                    <LocationOutlinedOnIcon sx={{ color: palette.info.dark, fontSize: '15px' }} />
                                                    <Typography variant='body2'>Noida Delhi , India</Typography>
                                                </Stack>
                                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                    <BusinessCenterOutlined sx={{ color: palette.info.dark, fontSize: '15px' }} />
                                                    <Typography variant='body2'>1 Year 2 Months</Typography>
                                                </Stack>
                                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                    <AccountBalanceWalletOutlined sx={{ color: palette.info.dark, fontSize: '15px' }} />
                                                    <Typography variant='body2'>₹ 2,00,000</Typography>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <Stack spacing={2}>
                                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                    <CallOutlinedIcon sx={{ color: palette.info.dark, fontSize: '15px' }} />
                                                    <Typography variant='body2'>Noida Delhi , India</Typography>
                                                </Stack>
                                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                                    <EmailOutlinedIcon sx={{ color: palette.info.dark, fontSize: '15px' }} />
                                                    <Typography variant='body2'>Noida Delhi , India</Typography>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
                <Box sx={{ my: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item sm={2.5} xs={12}>
                            <Paper elevation={0} sx={{ p: 2, borderRadius: '10px' }}>
                                <Stack spacing={1}>
                                    <Typography variant='h6'>Quick Link</Typography>
                                    <Button sx={{ px: 1, borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography>Resume</Typography>
                                        <Link style={{ textDecoration: 'none', color: palette.success.info }} to={'/resume'}>View Resume</Link>
                                    </Button>
                                    <Button sx={{ px: 1, borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography>Resume Headline</Typography>
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item sm={9.5} xs={12}>
                            <Paper elevation={0} sx={{ px: 1, borderRadius: '10px', p: 2 }}>
                                <ResumeUploader />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
        </>
    );
};

export default Profile;