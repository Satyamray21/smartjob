import React from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { jobSlides } from '../../../apiData/sliderData';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
    const { spacing, palette } = useTheme();
    const navigate = useNavigate();


    return (
        <Box sx={{ mt: spacing(1), mx: { xs: 0 } }}>
            <Splide
                options={{
                    heightRatio: {
                        600: 0.7625,
                        900: 0.5625,
                    },
                    snap: true,
                    cover: true,
                    video: {
                        loop: true,
                    },
                    type: 'loop',
                    drag: 'free',
                    focus: 'center',
                    dots: false,
                    arrows: false,
                    perPage: 1,
                    autoScroll: {
                        speed: 1000,
                    },
                    autoplay: true,
                }}
            >
                {jobSlides.map((slide) => (
                    <SplideSlide key={slide.id}>
                        <Stack sx={{ position: 'relative' }}>
                            <Box sx={{ height: { xs: '50vh', md: '50vh' } }}>
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </Box>
                            <Box sx={{
                                position: 'absolute', width: '100%', height: '100%', backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(255, 255, 255, 0.3))`
                            }}>
                                <Stack sx={{ py: { md: spacing(10), xs: spacing(5) } }}>
                                    <Stack sx={{ color: '#fff', px: { md: spacing(20), xs: spacing(2) } }}>
                                        <Typography>A REVOLUTION IN RECRUITING</Typography>
                                        <Typography variant='h3' sx={{ width: { md: '50%', lg: '50%', xs: '100%' }, fontSize: { md: '50px', xs: '40px' }, fontWeight: 'bold', wordSpacing: 5, py: { xs: spacing(2), md: spacing(5) } }} > {slide.title}</Typography>
                                        <Typography variant='p' sx={{ width: { md: '35%', xs: '90%' }, fontWeight: 'thin', fontFamily: 'sans-serif', wordSpacing: 2 }}>{slide.description}</Typography>
                                    </Stack>
                                    <Box sx={{ width: '200px', px: { md: spacing(20), xs: spacing(2) }, py: spacing(2) }}>
                                        <Button variant={'contained'} style={{ background: palette.primary.main }} onClick={() => navigate('/joinnetwork')}>Join Our Network</Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </SplideSlide>
                ))
                }
            </Splide >
        </Box >
    );
};

export default Hero;
