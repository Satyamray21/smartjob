import React from 'react';
import { Grid, Stack, Box, Typography, OutlinedInput, Divider, Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    EmailOutlined as EmailOutlinedIcon,
    LocationOnOutlined as LocationOutlinedOnIcon,
    CallOutlined as CallOutlinedIcon,
    Facebook as FacebookIcon,
    YouTube as YouTubeIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import Img1 from '../../assets/images/bg11.png';
import { ThemeContext } from '@emotion/react';

const Footer = () => {
    const { spacing, palette } = useTheme();

    return (
        <>
            <Box sx={{ px: { md: spacing(17), xs: 2 }, background: palette.secondary.deem }}>
                <Typography variant='body1' sx={{ py: 1, fontSize: '12px' }}><Typography component={'span'}>IMPORTANT :</Typography> SmartJobs doesn't solicit money from jobseekers. If someone calls citing SmartJobs name and asks for money then pls report to smartjob@corporate.in <Link to="froud">Know more</Link></Typography>
            </Box>
            <Box
                sx={{
                    backgroundImage: `url(${Img1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'relative',
                }}
            >
                <Box sx={{ px: { md: spacing(17), xs: 2 }, background: palette.primary.main, py: 2 }}>
                    <Grid container spacing={3} justifyContent="space-between">
                        <Grid item xs={12} md={2}>
                            <Stack sx={{ my: 1, width: { md: '200px', xs: '100%' } }}>
                                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
                                    Smart
                                    <Typography component="span" sx={{ color: palette.secondary.dark, fontSize: '20px' }}>
                                        Job
                                    </Typography>
                                </Typography>
                                <Divider sx={{ backgroundColor: '#fff', my: 1 }} />
                                <Typography variant="body1" sx={{ color: '#bdbdbd', fontSize: '13px' }}>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur sit eaque maxime nesciunt quasi consectetur facere eveniet molestiae voluptatem ex.
                                </Typography>
                                <Stack direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FacebookIcon to="https://www.facebook.com/profile.php?id=100017834436266" sx={{ '&:hover': { transform: 'scale(1.1)' }, tranaition: 'all linear 0.5s ease', cursor: 'pointer', fontSize: '30px', color: '#fdfdfd', my: 2, mx: 1 }} />
                                    <YouTubeIcon to="https://www.youtube.com/@amit_web_dev" sx={{ '&:hover': { transform: 'scale(1.1)' }, tranaition: 'all linear 0.5s ease', cursor: 'pointer', fontSize: '35px', color: '#fdfdfd', my: 2, mx: 1 }} />
                                    <TwitterIcon sx={{ '&:hover': { transform: 'scale(1.1)' }, tranaition: 'all linear 0.5s ease', cursor: 'pointer', fontSize: '30px', color: '#fdfdfd', my: 2, mx: 1 }} />
                                    <InstagramIcon to="https://www.linkedin.com/in/amit-kumar-492795290" sx={{ '&:hover': { transform: 'scale(1.1)' }, tranaition: 'all linear 0.5s ease', cursor: 'pointer', fontSize: '30px', color: '#fdfdfd', my: 2, mx: 1 }} />
                                </Stack>
                            </Stack>
                        </Grid>

                        {/* Explore Section */}
                        <Grid item xs={12} md={2}>
                            <Stack sx={{ my: 1, width: { md: '200px', xs: '100%' } }}>
                                <Typography variant="h6" sx={{ color: '#fdfdfd', fontWeight: 'bold' }}>
                                    Explore
                                </Typography>
                                <Divider sx={{ backgroundColor: '#fff', my: 1 }} />
                                <Box sx={{ listStyle: 'none', gap: 1 }}>
                                    {[
                                        { label: 'About Us', to: '/aboutus' },
                                        { label: 'Contact Us', to: '/contactus' },
                                        { label: 'My Account', to: '/myacount' },
                                        { label: 'Upload Resume', to: '/services' },
                                        { label: 'Pricing Package', to: '/pricingpackage' },
                                        { label: 'FAQs', to: '/faqs' }
                                    ].map((item, index) => (
                                        <Typography variant='body2' >
                                            <Link
                                                key={index}
                                                to={item.to}
                                                style={{
                                                    color: '#fdfdfd',
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    fontSize: '13px'
                                                }}
                                            >
                                                <ChevronRightIcon sx={{ pr: 1 }} />
                                                {item.label}
                                            </Link>
                                        </Typography>
                                    ))}
                                </Box>
                            </Stack>
                        </Grid>

                        {/* Information Section */}
                        <Grid item xs={12} md={2}>
                            <Stack sx={{ my: 1, width: { md: '250px', xs: '100%' } }}>
                                <Typography variant="h6" sx={{ color: '#fdfdfd', fontWeight: 'bold' }}>
                                    Information
                                </Typography>
                                <Divider sx={{ backgroundColor: '#fff', my: 1 }} />
                                {[
                                    { icon: CallOutlinedIcon, title: 'Phone Number', content: '+91 (1234) 567890', link: 'tel:6393351817' },
                                    { icon: EmailOutlinedIcon, title: 'Email', content: 'abcsd@gmail.com', link: 'mailto:abcsd@gmail.com' },
                                    { icon: LocationOutlinedOnIcon, title: 'Office Address', content: 'Bhavani Market Noida Sector 18', link: '#' }
                                ].map((info, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                                        <Box sx={{ p: 1 }}>
                                            <info.icon sx={{ color: '#FDFDFD', fontSize: '30px' }} />
                                        </Box>
                                        <Stack>
                                            <Typography variant="body1" sx={{ color: palette.secondary.dark, fontSize: '13px' }}>
                                                {info.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                <Link
                                                    to={info.link}
                                                    style={{ color: '#fdfdfd', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '13px' }}
                                                >
                                                    {info.content}
                                                </Link>
                                            </Typography>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>

                        {/* Newsletter Section */}
                        <Grid item xs={12} md={3}>
                            <Box sx={{ my: 1 }}>
                                <Typography variant="h6" sx={{ color: '#fdfdfd', fontWeight: 'bold' }}>
                                    NEWSLETTERS
                                </Typography>
                                <Divider sx={{ backgroundColor: '#fff', my: 1 }} />
                                <Typography variant="body1" sx={{ color: '#bdbdbd', my: 1, fontSize: '13px' }}>
                                    Sign up for free weekly newsletter. Don't miss a thing.
                                </Typography>
                                <Stack direction="row" sx={{ mt: 2 }}>
                                    <OutlinedInput
                                        sx={{
                                            borderRadius: '1px 0 0 1px',
                                            border: '1px solid #fdfdfd',
                                            color: '#fdfdfd',
                                            flex: 1
                                        }}
                                        type="email"
                                        placeholder="Enter your email"
                                        size="small"
                                    />
                                    <Button
                                        sx={{
                                            borderRadius: '0 1px 1px 0',
                                            border: '1px solid #eee',
                                            color: '#ffffff',
                                            backgroundColor: '#FF0343',
                                            '&:hover': { backgroundColor: '#FF0343' }
                                        }}
                                    >
                                        Subscribe
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ backgroundColor: '#fff', my: 2 }} />
                    <Typography variant="body2" textAlign="center" sx={{ color: '#FDFDFD' }}>
                        © 2024 SmartJob. All rights reserved | Designed by Shubham Bhaskar
                    </Typography>
                </Box>
            </Box >
        </>
    );
};

export default Footer;
