import React, { useState } from 'react';
import { testimonial } from '../../../apiData/sliderData';
import { Box, Stack, Typography, useTheme, Grid, Card } from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

const Testimonial = () => {
    const theme = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState(null); // State to track hovered card

    const styles = {
        imageContainer: {
            overflow: 'hidden',
            borderRadius: '8px',
            position: 'relative',
        },
        image: {
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
        },
    };

    return (
        <Box sx={{ my: 1 }}>
            <Stack alignItems="center">
                <Typography variant="h6" sx={{ my: theme.spacing(1) }}>
                    <span style={{ color: '#b71c1c' }}><b>OUR TEAM</b></span>
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, fontSize: '40px' }}>
                    Our Creative Team
                </Typography>
            </Stack>

            <Splide
                options={{
                    drag: 'free',
                    focus: 'center',
                    type: 'loop',
                    arrows: false,
                    perPage: 3,
                    breakpoints: {
                        640: { perPage: 1 },
                        768: { perPage: 2 },
                        1024: { perPage: 3 },
                    },
                    pagination: true,
                    gap: '1rem',
                    autoplay: true,
                }}
                style={{ width: '100%' }}
            >
                {testimonial.map((testi, index) => (
                    <SplideSlide key={index}>
                        <Grid item xs={12}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                            >
                                <Card
                                    elevation={0}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    sx={{ overflow: 'hidden', borderRadius: '8px', position: 'relative' }}
                                >
                                    <Box sx={styles.imageContainer}>
                                        <img
                                            src={testi.image}
                                            alt={testi.name}
                                            style={{
                                                ...styles.image,
                                                transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                                            }}
                                        />
                                    </Box>

                                    {/* Conditionally render the icon buttons based on hoveredIndex */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={hoveredIndex === index ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            padding: '15px',
                                            textAlign: 'center',
                                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                                            borderRadius: '0 0 8px 8px',
                                        }}
                                    >
                                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                            {testi.name}
                                        </Typography>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography sx={{ fontSize: '12px' }}>{testi.position}</Typography>
                                            <Stack direction="row" spacing={1}>
                                                <FacebookIcon sx={{ color: '#b71c1c', fontSize: '18px' }} />
                                                <TwitterIcon sx={{ color: '#b71c1c', fontSize: '18px' }} />
                                                <LinkedInIcon sx={{ color: '#b71c1c', fontSize: '18px' }} />
                                            </Stack>
                                        </Stack>
                                    </motion.div>
                                </Card>
                            </motion.div>
                        </Grid>
                    </SplideSlide>
                ))}
            </Splide>
        </Box>
    );
};

export default Testimonial;
