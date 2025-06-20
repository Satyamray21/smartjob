import React from 'react';
import { Box, Button, OutlinedInput, Stack, Typography, useTheme, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IMG1 from '../../../assets/images/download.png'
import LoginImg from '../../../assets/images/girl1.png'

const FindTag = () => {
    const { spacing, palette } = useTheme();
    const navigate = useNavigate();
    // const [country, setCountry] = useState('');

    // const handleChange = (event) => {
    //     setCountry(event.target.value);
    // };
    // const experienceOptions = [
    //     { value: "experience", label: "Experience" },
    //     { value: "entry", label: "Entry Level" },
    //     { value: "one", label: "1 year" },
    //     { value: "two", label: "2 years" },
    //     { value: "three", label: "3 years" },
    //     { value: "four", label: "4 years" },
    //     { value: "five", label: "5 years" }
    // ];

    const commonInputProps = {
        fullWidth: true,
        sx: { width: { lg: '240px', md: '80%', xs: '200px' }, color: '#000' },
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    position: 'relative',
                    background: `url(${IMG1})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                    width: '100%',
                }}
            >
                <Box sx={{ background: 'rgba(26,35,136,0.9)' }}>
                    <Stack direction={'row'} sx={{ px: { lg: spacing(17), md: spacing(1), xs: spacing(1) }, }}>
                        <Box sx={{ width: '100%', height: '100%', }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ pt: spacing(2), width: { lg: '600px', md: '100%', xs: '100%' } }}>
                                    <Typography variant='h3' sx={{ color: '#FDFDFD', py: 2, fontSize: { md: '50px', xs: '30px' }, fontWeight: 'bold', }}>Jobs for the Next Billion
                                        Trusted by 50 Lakh+ Candidates across India
                                    </Typography>
                                    <Box sx={{ my: 5 }}>
                                        <Stack direction={'row'} >
                                            <OutlinedInput style={{ borderRight: '1px solid #9e9e9e', backgroundColor: '#FFFFFF' }} {...commonInputProps} type="search" placeholder="Enter Skills, Designation etc" />
                                            <OutlinedInput style={{ borderRight: '1px solid #9e9e9e', backgroundColor: '#FFFFFF' }} {...commonInputProps} type="search" placeholder="Enter Location" />
                                            {/* <FormControl fullWidth sx={{ width: '130px', display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                                            <Select
                                                size='small'
                                                placeholder='Experience'
                                                id="experience-select"
                                                value={country}
                                                onChange={handleChange}
                                            >
                                                {experienceOptions.map(option => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl> */}
                                            <Button variant="button" sx={{
                                                height: '40px',
                                                width: '150px',
                                                color: '#FFF',
                                                backgroundColor: '#FF0343',
                                                '&:hover': {
                                                    backgroundColor: palette.secondary.dark,
                                                }
                                            }} onClick={() => navigate('/joinnetwork')}>
                                                Find Jobs
                                            </Button>
                                        </Stack>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        height: '350px', width: '350px',
                                    }}>
                                    <img src={LoginImg} alt='recruiter' style={{ filter: 'drop-shadow(-1px 1px 10px #FDFEF2)', background: 'none', height: '100%', width: '100%' }} />
                                </Box>
                            </Box>
                        </Box>
                    </Stack >
                </Box>
            </Box >
        </>
    );
};

export default FindTag;
