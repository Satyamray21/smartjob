'use client';
import React, { useState } from 'react';
import { Avatar, Box, Card, CardContent, CssBaseline, Grid, IconButton, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Hadrabad from '../../../assets/images/job_loc.jpg';
import Bangeluru from '../../../assets/images/job_loc1.jpg';
import CompanySlider from './CompanySlider';
import { jobSlides } from '../../../apiData/sliderData';

const JobRole = () => {
    const { palette, spacing } = useTheme();
    const [hoverIndex, setHoverIndex] = useState(null); // Track the hovered card

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <>
            <CssBaseline />
            <Box sx={{ backgroundColor: palette.primary.light, position: 'relative', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
                <Box sx={{ width: '100%', px: { lg: spacing(17), md: spacing(1), sm: spacing(1), xs: spacing(1) }, backdropFilter: 'blur(10px)' }}>
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <Typography variant='h4' sx={{ textTransform: 'uppercase', fontWeight: 'bold', py: spacing(3), color: palette.primary.main }}>
                            Browse Jobs
                        </Typography>
                    </motion.div>

                    <Stack direction={{ md: 'row', xs: 'column' }} gap={spacing(1)}>
                        <Box>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: '5px', background: '#FFFFFF' }}>
                                <Grid container gap={2}>
                                    {jobSlides.map((role, index) => (
                                        <Grid item xs={6} sm={4} md={3} lg={2.2} key={index}>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.1 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <Card
                                                    elevation={0}
                                                    onMouseEnter={() => setHoverIndex(index)}
                                                    onMouseLeave={() => setHoverIndex(null)}
                                                    sx={{
                                                        height: '150px',
                                                        width: '100%',
                                                        borderRadius: '10px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        background: palette.primary.light,
                                                        transition: 'all 0.5s ease-in-out',
                                                        '&:hover': {
                                                            cursor: 'pointer',
                                                            boxShadow: '1px 1px 10px -1px #1f11fd',
                                                            background: '#FFFFFF',
                                                            borderRadius: '15px',
                                                        }
                                                    }}
                                                >
                                                    <Tooltip>
                                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                            <IconButton variant="contained">
                                                                <Avatar src={role.icon} alt="" style={{ height: '40px', width: '40px' }} />
                                                            </IconButton>
                                                            <Typography variant="body1" textAlign="center">{role.title}</Typography>
                                                            <Typography variant="body2" color="error">{role.activeJobs} Active Jobs</Typography>
                                                        </CardContent>
                                                    </Tooltip>
                                                </Card>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                    <Grid item xs={6} sm={4} md={3} lg={2.2}>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    height: '150px',
                                                    width: '100%',
                                                    borderRadius: '10px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    background: palette.primary.light,
                                                    transition: 'all 0.5s ease-in-out',
                                                    '&:hover': {
                                                        cursor: 'pointer',
                                                        boxShadow: '1px 1px 10px -1px #1f11fd',
                                                        background: '#FFFFFF',
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <DashboardIcon sx={{ fontSize: 40 }} />
                                                    <Typography sx={{ color: palette.secondary.main }}>View All</Typography>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <CompanySlider />
                        </Box>
                        <Stack direction={'column'} spacing={1} sx={{ display: { md: 'block', xs: 'none' } }}>
                            <Box sx={{ height: '290px', width: '250px' }}>
                                <img src={Hadrabad} alt='Hyderabad' style={{ height: '100%', width: '100%' }} />
                            </Box>
                            <Box sx={{ height: '290px', width: '250px' }}>
                                <img src={Bangeluru} alt='Bangalore' style={{ height: '100%', width: '100%' }} />
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default JobRole;
