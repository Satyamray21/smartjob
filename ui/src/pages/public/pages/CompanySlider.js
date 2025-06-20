import React, { useEffect, useRef } from 'react';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { companySlides } from '../../../apiData/sliderData';

const CompanySlider = () => {
    const splideRef1 = useRef(null);
    const splideRef2 = useRef(null);
    const { palette, spacing } = useTheme();

    useEffect(() => {
        // Initialize the first Splide instance
        const splide1 = new Splide(splideRef1.current, {
            type: 'loop',
            drag: 'free',
            focus: 'center',
            arrows: false,
            pagination: false,
            perPage: 5,
            autoScroll: {
                speed: 1,
            },
        });

        splide1.mount({ AutoScroll });

        // Initialize the second Splide instance
        const splide2 = new Splide(splideRef2.current, {
            type: 'loop',
            drag: 'free',
            focus: 'center',
            arrows: false,
            pagination: false,
            perPage: 5,
            autoScroll: {
                speed: -1,
            },
        });

        splide2.mount({ AutoScroll });
    }, []);

    return (
        <>
            <Box sx={{ width: '100%', my: spacing(5), background: '#FFFFFF', borderRadius: '5px', }}>
                <Typography variant='h4' sx={{ textTransform: 'uppercase', fontWeight: 'bold', my: 2, p: 2, color: palette.primary.main }}>Top Companies</Typography>
                <Box ref={splideRef1} className="splide">
                    <Box className="splide__track">
                        <Box component="ul" className="splide__list">
                            {companySlides.map((slide, index) => (
                                <Tooltip arrow title={slide.title}>
                                    <Box component="li" key={index} className="splide__slide">
                                        <img src={slide.image} alt={`Slide ${index + 1}`} style={{ cursor: 'pointer', border: '1px solid #dfdfdf', width: '99%' }} />
                                    </Box>
                                </Tooltip>
                            ))}
                        </Box>
                    </Box>
                </Box>
                <Box ref={splideRef2} className="splide" sx={{ mt: spacing(1) }}>
                    <Box className="splide__track">
                        <Box component="ul" className="splide__list">
                            {companySlides.map((slide, index) => (
                                <Tooltip arrow title={slide.title}>
                                    <Box component="li" key={index} className="splide__slide">
                                        <img src={slide.image} alt={`Slide ${index + 1}`} style={{ cursor: 'pointer', border: '1px solid #dfdfdf', width: '99%' }} />
                                    </Box>
                                </Tooltip>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default CompanySlider;
