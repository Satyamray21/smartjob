import React from 'react';
import { Box, Stack, Typography, useTheme, CssBaseline, Link, Grid, Breadcrumbs, Button } from '@mui/material';
import { motion } from 'framer-motion';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import JobImage1 from '../../../assets/images/simple-tower-isolated-white-background_1308-127465.avif';
// import JobImage2 from '../../../assets/images/register4.webp';
import JobImage3 from '../../../assets/images/registe3.webp';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { testimonial, iconData } from '../../../apiData/sliderData';
import Testimonial from './Testimonial';

const AboutUs = () => {
    const { spacing, palette } = useTheme();

    // Framer Motion variants for animations
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
    };

    const slideUp = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.7 } }
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.3 } }
    };

    return (
        <>
            <CssBaseline />
            <Box
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                sx={{
                    position: 'relative',
                    mx: { xs: 0 },
                    backgroundImage: `url(${JobImage1})`,
                    height: '25vh',
                    width: '100%',
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(26,35,136,0.8)',
                        zIndex: 1
                    },
                    zIndex: 0
                }}
            >
                <Stack direction="row" sx={{ px: { lg: spacing(17), md: spacing(1), xs: spacing(1) }, position: 'relative', zIndex: 2 }}>
                    <Box sx={{ width: '100%', height: '100%' }}>
                        <Box sx={{ display: { md: 'flex', xs: 'block' }, justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Box sx={{ py: 5, width: { lg: '600px', md: '100%', xs: '100%' } }}>
                                <Typography variant="h3" sx={{ color: '#FDFDFD', py: 1, fontSize: { md: '36px', xs: '30px' }, fontWeight: 'bold' }}>About Us</Typography>
                                <Typography sx={{ color: '#b1b2b0', fontSize: { md: '18px', xs: '20px' } }}>The Unique Solutions for Your Business</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ px: { lg: spacing(17), md: spacing(1), xs: spacing(3) }, pt: 2, backgroundColor: '#F0F1F9' }}>
                <Box sx={{ background: '#FDFDFD', p: 1 }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Breadcrumbs separator={<KeyboardDoubleArrowRightIcon sx={{ fontSize: '15px', color: '#b71c1c' }} />} aria-label="breadcrumb" >
                            <Link sx={{ fontWeight: 'bold', fontSize: '10px', textDecoration: 'none', color: '#b71c1c' }} href="/">Home</Link>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '10px', color: palette.primary.dark }}>AboutUs Page</Typography>
                        </Breadcrumbs>
                    </motion.div>
                </Box>
                {/* Info Section */}
                <Grid container sx={{ alignItems: 'center', background: '#FDFDFD', justifyContent: 'space-around', mt: 1, p: spacing(3) }}>
                    <Grid item md={7} xs={12}>
                        <Typography variant="h5" sx={{ mb: '10px' }}>
                            <span style={{ color: '#b71c1c' }}><b>OUR INFO</b></span>
                        </Typography>
                        <Typography variant='h4' fontWeight={'bold'}>Welcome to our site!</Typography>
                        <Stack sx={{ pr: { md: spacing(10), xs: 0 } }}>
                            <Typography variant='h4' fontWeight={'semi-bold'}>Professional, compliant, knowledgeable and attentive - all words synonymous with us.</Typography>
                            <Box sx={{ pr: spacing(5) }}>
                                <Typography variant='body2' py={spacing(3)}>People come to us because they want, need and expect something that they just won't get from other companies. We haven't earned our reputation of leading company overnight. It has taken years of listening to what contractors and freelancers hunger for - and we deliver it in abundance!</Typography>
                                <Typography variant='body2'>Our service is different to other companies because of our unrivalled expertise, attention to detail and outstanding customer service. Companies come and go but RAD has stood the test of time because we understand our industry and more importantly your needs.</Typography>
                            </Box>
                            <Box sx={{ width: '200px', py: spacing(2) }}> <Button variant={'contained'}>Know More</Button></Box>
                        </Stack>
                    </Grid>
                    <Grid item md={5} xs={12} component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp}>
                        <Box component="img" src={JobImage3} sx={{ width: '100%', height: '40vh' }} alt={JobImage3} />
                    </Grid>
                </Grid>
                {/* Icon Data Section */}
                <Box sx={{ p: 2, py: 3, backgroundColor: '#FDFDFD', mt: 1 }}>
                    <Typography variant='h4' fontWeight={'bold'} align='center'>Whether we play a large or small role, by working <br />together we achieve our objectives.</Typography>
                    <Grid container spacing={2} component={motion.div} initial="hidden" animate="visible" variants={staggerContainer}>
                        {iconData.map((item, index) => (
                            <Grid item md={3} xs={12} sx={{ mt: spacing(5), position: 'relative' }} key={index} component={motion.div} variants={slideUp}>
                                <Box sx={{
                                    position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', fontSize: '30px', textAlign: 'center', backgroundColor: palette.error.dark, color: 'white', borderRadius: '50%', width: '50px', heigh: '50px', p: 1
                                }}>
                                    {item.icon}
                                </Box>
                                <Box sx={{ border: '1px solid gray', p: spacing(3), borderRadius: '10px', textAlign: 'center', background: palette.primary.light }}>
                                    <Typography variant="h3">{item.value}</Typography>
                                    <Typography variant="h6">{item.label}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box >
                {/* testimonial */}
                <Box sx={{ p: 2, py: 3, backgroundColor: '#FDFDFD', mt: 1 }}>
                    <Testimonial />
                </Box>
            </Box>
        </>
    );
};

export default AboutUs;
