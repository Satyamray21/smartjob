import React from 'react';
import { Box, Breadcrumbs, Button, CssBaseline, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import JobImage from '../../../assets/images/background3avif.avif';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DescriptionIcon from '@mui/icons-material/Description';
import { CardComponent } from '../../../apiData/sliderData';
import { motion } from 'framer-motion';
const Services = () => {
    const { palette, spacing } = useTheme();

    const cardData = [
        { icon: <DescriptionIcon sx={{ fontSize: '35px' }} />, title: "Concept", description: "Sed in metus libero. Sed volutpat eget dui ut tempus. Fusce fringilla." },
        { icon: <DescriptionIcon sx={{ fontSize: '35px' }} />, title: "Prepare", description: "Sed in metus libero. Sed volutpat eget dui ut tempus. Fusce fringilla." },
        { icon: <DescriptionIcon sx={{ fontSize: '35px' }} />, title: "Retouch", description: "Sed in metus libero. Sed volutpat eget dui ut tempus. Fusce fringilla." },
        { icon: <DescriptionIcon sx={{ fontSize: '35px' }} />, title: "Finalize", description: "Sed in metus libero. Sed volutpat eget dui ut tempus. Fusce fringilla." },
        { icon: <DescriptionIcon sx={{ fontSize: '35px' }} />, title: "Daily Updates", description: "Sed in metus libero. Sed volutpat eget dui ut tempus. Fusce fringilla." },
        { icon: <DescriptionIcon sx={{ fontSize: '35px' }} />, title: "24/7 Supports", description: "Sed in metus libero. Sed volutpat eget dui ut tempus. Fusce fringilla." },
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    position: 'relative',
                    mx: 0,
                    backgroundImage: `url(${JobImage})`,
                    height: '25vh',
                    width: '100%',
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
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
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ py: 5, width: { lg: '600px', md: '100%', xs: '100%' } }}>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Typography variant="h3" sx={{ color: '#FDFDFD', py: 1, fontWeight: 'bold' }}>
                                    Services
                                </Typography>
                                <Typography sx={{ color: '#b1b2b0', fontSize: { md: '18px', xs: '20px' } }}>
                                    The Unique Solutions for Your Business
                                </Typography>
                            </motion.div>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ px: { lg: spacing(17), md: spacing(17), backgroundColor: '#faf7f7', xs: spacing(3) }, py: 2 }}>
                <Box sx={{ background: '#FDFDFD', p: 1 }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Breadcrumbs separator={<KeyboardDoubleArrowRightIcon sx={{ fontSize: '15px', color: '#b71c1c' }} />} aria-label="breadcrumb" >
                            <Link sx={{ fontWeight: 'bold', fontSize: '10px', textDecoration: 'none', color: '#b71c1c' }} href="/">Home</Link>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '10px', color: palette.primary.dark }}>Service Page</Typography>
                        </Breadcrumbs>
                    </motion.div>

                </Box>
            </Box>
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Box sx={{ background: palette.info.light, px: { lg: spacing(17), md: spacing(1), xs: spacing(3) }, py: 3 }}>
                    <Grid container>
                        <Grid item md={6} xs={12}>
                            <Typography variant="h6">
                                <span style={{ color: '#b71c1c' }}>
                                    <b>What we do?</b>
                                </span>
                            </Typography>
                            <Typography variant='body2' sx={{ fontSize: '35px' }}>
                                The service we offer is specifically designed to meet
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '35px' }}>
                                Your Needs.
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 2, pr: 10 }}>
                                Sed in metus libero. Sed volutpat eget dui ut tempus. Fusce fringilla tincidunt
                                laoreet Morbi ac metus vitae diam scelerisque malesuada eget eu mauris. Cras
                                varius lorem ac velit pharetra.
                            </Typography>
                            <Button variant="contained"
                                type="submit"
                                color="primary"
                                sx={{
                                    textTransform: 'none', width: { md: '150px', xs: '100%' },
                                    py: 1, my: 10, fontSize: '15px', fontWeight: 'bold', borderRadius: '5px'
                                }}>
                                Read More
                            </Button>
                        </Grid>

                        {/* Right section: Images grid */}
                        <Grid item container md={6} xs={12} >
                            <Grid item md={6} xs={12}>
                                <Box sx={{ width: '250px', height: '200px' }}>
                                    <img
                                        src={JobImage}
                                        alt="Job"
                                        style={{
                                            height: '100%',
                                            borderRadius: '15px',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                                <Box sx={{ mt: 2, width: '270px', height: '250px' }}>
                                    <img
                                        src={JobImage}
                                        alt="Job"
                                        style={{
                                            height: '100%',
                                            borderRadius: '15px',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Box sx={{ width: '270px', height: '250px' }}>
                                    <img
                                        src={JobImage}
                                        alt="Job"
                                        style={{
                                            height: '100%',
                                            borderRadius: '15px',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                                <Box sx={{ ml: 2, mt: 2, width: '250px', height: '200px' }}>
                                    <img
                                        src={JobImage}
                                        alt="Job"
                                        style={{
                                            height: '100%',
                                            borderRadius: '15px',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </motion.div >
            <Box sx={{ px: { lg: spacing(17), md: spacing(1), xs: spacing(3) }, py: 4, backgroundColor: '#faf7f7' }}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    <span style={{ color: '#b71c1c' }}>
                        <b>How We Do it?</b>
                    </span>
                </Typography>
                <Typography variant='body2' sx={{ fontSize: '35px', px: 15, textAlign: 'center' }}>We Are A Young And Creative Company & We
                    Offer You<span style={{ fontWeight: 'bold', fontSize: '35px' }}>Fresh Ideas.</span></Typography>

                <Grid container spacing={4} sx={{ mt: '40px' }}>
                    {cardData.map((card, index) => (
                        <Grid item md={4} xs={12} key={index}>
                            <motion.div
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <CardComponent
                                    icon={card.icon}
                                    title={card.title}
                                    description={card.description}
                                />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{
                position: 'relative',
                px: { lg: spacing(17), md: spacing(1), xs: spacing(3) },
                py: spacing(10),
                mx: { xs: 0 },
                backgroundImage: `url(${JobImage})`,
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black overlay
                    zIndex: 1,
                },
                zIndex: 0, // Content above overlay
            }}>
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Typography variant='h5' sx={{ color: '#ff6700' }}>Why Choose Us</Typography>
                    <Typography variant='h3' sx={{ color: '#ffffff', py: spacing(2) }}>
                        <b>Get in touch with us and we’ll help<br /> your business.</b>
                    </Typography>
                    <Typography variant='h6' sx={{ color: '#ffffff', py: spacing(2) }}>
                        <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla non ipsum soluta<br />
                            perferendis veniam qui esse magnam commodi quisquam vitae labore nemo at<br />
                            voluptatem, totam, minima recusandae assumenda.</b>
                    </Typography>
                    <Stack direction={'row'} spacing={2}>
                        <Button variant='contained' sx={{ backgroundColor: '#FFFFFF', color: '#004e98' }}>
                            <b>Read More</b> <KeyboardDoubleArrowRightIcon sx={{ color: '#004e98' }} />
                        </Button>
                        <Button variant='contained' sx={{ backgroundColor: '#ff6700', color: '#FFFFFF' }}>
                            Read More<KeyboardDoubleArrowRightIcon sx={{ color: '#FFFFFF' }} />
                        </Button>
                    </Stack>
                </motion.div>
            </Box>
        </>
    )
}

export default Services;
