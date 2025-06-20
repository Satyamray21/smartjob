import React, { useMemo } from 'react';
import { Box, Breadcrumbs, Button, Card, CardContent, Divider, CssBaseline, Grid, Link, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import JobImage1 from '../../../assets/images/simple-tower-isolated-white-background_1308-127465.avif';
import GoogleMap from './GoogleMap';
import MapIcon from '@mui/icons-material/Map';
import HeadsetIcon from '@mui/icons-material/Headset';
import DraftsIcon from '@mui/icons-material/Drafts';
import { motion } from 'framer-motion';

const ContactUs = () => {
    const { spacing, palette } = useTheme();

    const validationSchema = useMemo(() => yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Enter a valid email').required('Email is required'),
        contact: yup.string().min(10, 'Contact number should be at least 10 characters').required('Contact number is required'),
    }), []);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            contact: '',
        },
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log(values);
        },
    });

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    position: 'relative',
                    mx: 0,
                    backgroundImage: `url(${JobImage1})`,
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
                                    Contact Us
                                </Typography>
                                <Typography sx={{ color: '#b1b2b0', fontSize: { md: '18px', xs: '20px' } }}>
                                    The Unique Solutions for Your Business
                                </Typography>
                            </motion.div>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ px: { lg: spacing(17), md: spacing(17), background: palette.info.deem, xs: spacing(3) }, pt: 2 }}>
                <Box sx={{ background: '#FDFDFD', p: 1 }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Breadcrumbs separator={<KeyboardDoubleArrowRightIcon sx={{ fontSize: '15px', color: '#b71c1c' }} />} aria-label="breadcrumb" >
                            <Link sx={{ fontWeight: 'bold', fontSize: '10px', textDecoration: 'none', color: '#b71c1c' }} href="/">Home</Link>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '10px', color: palette.primary.dark }}>Contact Page</Typography>
                        </Breadcrumbs>
                    </motion.div>
                </Box>
                <Box sx={{ my: spacing(2), }}>
                    <Grid container spacing={2} justifyContent={'space-between'} display={'flex'}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Card elevation={0} sx={{ px: 5, background: '#FDFDFD', }}>
                                <CardContent>
                                    <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                        <Box sx={{
                                            backgroundColor: '#ffcdd2', opacity: 50, position: 'relative', height: '85px', width: '85px', borderRadius: '50%'
                                        }}>
                                            <MapIcon sx={{ color: '#fff', backgroundColor: palette.error.main, position: 'absolute', top: 10, left: 10, p: 2, borderRadius: '50%', height: '80px', width: '80px', }} />
                                        </Box>
                                    </Stack>
                                    <Box fontStyle={{ color: palette.primary.main }} sx={{ p: spacing(3), textAlign: 'center' }}>
                                        <Typography variant='h5' fontWeight={'bold'}>Visit Us Anytime</Typography>
                                        <Typography>Bhavani Market ,Third Flour</Typography>
                                        <Typography>Noida Sector 18</Typography>
                                    </Box>
                                </CardContent>
                                <Divider orientation="vertical" variant="middle" flexItem />
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Card elevation={0} sx={{ px: 5, background: '#FDFDFD', }}>
                                <CardContent>
                                    <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                        <Box sx={{
                                            backgroundColor: '#ffcdd2', opacity: 50, position: 'relative', height: '85px', width: '85px', borderRadius: '50%'
                                        }}>
                                            <DraftsIcon sx={{ color: '#fff', backgroundColor: palette.error.main, position: 'absolute', top: 10, left: 10, p: 2, borderRadius: '50%', height: '80px', width: '80px', }} />
                                        </Box>
                                    </Stack>
                                    <Box fontStyle={{ color: palette.primary.main }} sx={{ p: spacing(3), textAlign: 'center' }}>
                                        <Typography variant='h5' fontWeight={'bold'}>Send a Email</Typography>
                                        <Typography>support@example.com</Typography>
                                        <Typography>example.com</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Card elevation={0} sx={{ px: 5, background: '#FDFDFD', }}>
                                <CardContent>
                                    <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                        <Box sx={{
                                            backgroundColor: '#ffcdd2', opacity: 50, position: 'relative', height: '85px', width: '85px', borderRadius: '50%'
                                        }}>
                                            <HeadsetIcon sx={{ color: '#fff', backgroundColor: palette.error.main, position: 'absolute', top: 10, left: 10, p: 2, borderRadius: '50%', height: '80px', width: '80px', }} />
                                        </Box>
                                    </Stack>
                                    <Box fontStyle={{ color: palette.primary.main }} sx={{ p: spacing(3), textAlign: 'center' }}>
                                        <Typography variant='h5' fontWeight={'bold'}>Phone Us</Typography>
                                        <Typography>+012 (345) 78967</Typography>
                                        <Typography>+98653222</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box >
                <Grid container spacing={1} sx={{ py: spacing(2) }}>
                    <Grid item md={5} xs={12}>
                        <Box sx={{ p: 3, background: palette.info.light }}>
                            <Stack spacing={1}>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Stack gap={spacing(3)}>
                                        <Typography variant='h4' fontWeight={'bold'} style={{ color: palette.secondary.main }}>CONTACT US</Typography>
                                        <Stack >
                                            <Typography variant='h3' fontWeight={'bold'}>How Can We Help You?</Typography>
                                            <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />sed do eiusmod temporeum dicant partem scripserit, <br />doctus appetere interpretaris.</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.1 }}
                                            >
                                                <FacebookIcon sx={{ color: palette.primary.main, '&:hover': { color: '#D84315', transform: 'scale(1.1)' }, tranaition: 'all linear 0.5s ease', }} />
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                            >
                                                <TwitterIcon sx={{ color: palette.primary.main, '&:hover': { color: '#D84315', transform: 'scale(1.1)' }, tranaition: 'all linear 0.5s ease', }} />
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                            >
                                                <LinkedInIcon sx={{ color: palette.primary.main, '&:hover': { color: '#D84315', transform: 'scale(1.1)' }, tranaition: 'all linear 0.5s ease', }} />
                                            </motion.div>
                                        </Stack>
                                    </Stack>
                                </motion.div>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Card elevation={0} sx={{ p: 4, mx: 'auto', background: palette.info.light, backdropFilter: 'blur(5px)', textAlign: 'center' }}>
                            <CardContent component="form" onSubmit={formik.handleSubmit}>
                                <Grid container spacing={3}>
                                    {['name', 'email', 'contact', 'address', 'message_title'].map((field, index) => {
                                        const placeholderMap = {
                                            name: 'Full Name',
                                            email: 'Email',
                                            contact: 'Mobile Number',
                                            address: 'Address',
                                            message_title: 'Message Title',
                                        };

                                        return (
                                            <Grid item xs={12} md={index === 2 ? 6 : 6} key={field}>
                                                <TextField
                                                    style={{ border: '1px solid #9e9e9e' }}
                                                    fullWidth
                                                    size="small"
                                                    placeholder={placeholderMap[field]}
                                                    autoComplete="off"
                                                    type={field === 'contact' ? 'tel' : 'text'}
                                                    {...formik.getFieldProps(field)}
                                                    error={formik.touched[field] && Boolean(formik.errors[field])}
                                                    helperText={formik.touched[field] && formik.errors[field]}
                                                />
                                            </Grid>
                                        );
                                    })}

                                    <Grid item xs={12}>
                                        <TextField
                                            style={{ border: '1px solid #9e9e9e' }}
                                            fullWidth
                                            size="small"
                                            placeholder="Enter Your Message..."
                                            autoComplete="off"
                                            multiline
                                            rows={3}
                                            {...formik.getFieldProps('message')}
                                            error={formik.touched.message && Boolean(formik.errors.message)}
                                            helperText={formik.touched.message && formik.errors.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                        >
                                            Send
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box >

            <GoogleMap />
        </>
    );
};

export default ContactUs;
