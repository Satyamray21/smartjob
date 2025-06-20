import React, { useEffect, useRef } from 'react';
import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { companySlides } from '../../../apiData/sliderData';
import { useNavigate } from 'react-router-dom';
import { KeyboardArrowRight } from '@mui/icons-material';

const TopCompany = () => {
    const splideRef1 = useRef(null);
    const theme = useTheme();
    const navigate = useNavigate();
    useEffect(() => {
        if (splideRef1.current) {
            const splide = new Splide(splideRef1.current, {
                type: 'loop',
                perPage: 5,
                gap: '1rem',
                autoplay: true,
                padding: '2rem',
                pauseOnHover: true,
                pagination: false, // Disable dots (pagination)
                autoScroll: {
                    speed: 1,
                },
                breakpoints: {
                    1024: {
                        perPage: 4,
                    },
                    768: {
                        perPage: 3,
                    },
                    640: {
                        perPage: 2,
                    },
                    480: {
                        perPage: 1,
                    },
                },
                extensions: { AutoScroll },
            });

            splide.mount();
        }
    }, [splideRef1]);

    return (
        <>
            <Typography
                variant='h5'
                sx={{ textTransform: 'uppercase', fontWeight: 'bold', my: 2, color: theme.palette.primary.main }}>
                Top companies hiring now
            </Typography>
            <Paper
                sx={{
                    width: '100%',
                    my: 2,
                    p: theme.spacing(3),
                    background: '#F1F2F5',
                    borderRadius: '10px'
                }}>

                <Box
                    ref={splideRef1}
                    className="splide"
                    sx={{ mt: theme.spacing(1) }}>
                    <Box className="splide__track">
                        <Box className="splide__list">
                            {companySlides.map((company, index) => (
                                <Button
                                    key={index}
                                    className="splide__slide"
                                    sx={{ background: '#FFFFFF', p: 3, borderRadius: '8px' }}>

                                    <Box onClick={() => navigate('/')}>
                                        <Stack direction={'column'}>
                                            <Typography textAlign={'left'}>{company.title}</Typography>
                                            <Box style={{ textDecoration: 'none', color: '#304ffe', gap: 2, display: 'flex', alignItems: 'left' }} >
                                                <Typography>{company.total_companies} Companies </Typography>
                                                <KeyboardArrowRight sx={{ fontSize: '18px' }} />
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default TopCompany;
