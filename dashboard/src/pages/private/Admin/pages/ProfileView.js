import React from 'react';
import { Box, Typography, Avatar, Divider, Paper, Grid, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { IMG_BASE_URL } from '../../../../utils/Constants';
import { useTheme } from '@emotion/react';
import {
    EmailOutlined as EmailOutlinedIcon,
    CallOutlined as CallOutlinedIcon,
} from '@mui/icons-material';

const ViewProfile = () => {
    const theme = useTheme();
    const { admin } = useSelector((state) => state.ADMIN);
    const image_path = `${IMG_BASE_URL}/uploads/${admin?.profileImage ?? 'defaultImage.jpg'}`;

    return (
        <>

            <Paper elevation={0} sx={{ borderRadius: '10px', mt: 2, p: 4 }}>
                <Box sx={{ flexDirection: { md: 'row', xs: 'column' }, alignItems: "center", display: 'flex', gap: 2 }}>
                    <Avatar style={{ height: '130px', width: '130px', border: '3px solid #F0F1F5' }}
                        alt={admin?.name?.first_name} src={image_path}>
                    </Avatar>
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <Typography variant='h5' fontWeight='bold'>
                                        {admin?.name?.first_name} {admin?.name?.last_name}
                                    </Typography>
                                    <Typography variant='body2' >
                                        {admin?.skills}
                                    </Typography>
                                    <Box sx={{ display: 'flex', mb: 2, flexDirection: { lg: 'row', md: 'row', xs: 'column' }, justifyContent: 'space-between' }}>
                                        <Typography variant='body2'>
                                            {admin?.email}
                                        </Typography>
                                        <Typography variant='body2' sx={{ my: 1 }}>Profile Last Update 2 Oct, 2024</Typography>
                                    </Box>
                                </Stack>
                                <Divider sx={{ my: 1 }} />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Stack spacing={2}>
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <CallOutlinedIcon sx={{ color: theme.palette.info.dark, fontSize: '15px' }} />
                                        <Typography variant='body2'> {admin?.mobile}</Typography>
                                    </Stack>
                                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                        <EmailOutlinedIcon sx={{ color: theme.palette.info.dark, fontSize: '15px' }} />
                                        <Typography variant='body2'> {admin?.email}</Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Paper>

        </ >
    );
};

export default ViewProfile;

