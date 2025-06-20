import React from 'react';
import { Box, Button, OutlinedInput, Stack, useTheme, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IMG1 from '../../../assets/images/download.png'

const Finds = () => {
    const { spacing, palette } = useTheme();
    const navigate = useNavigate();

    const commonInputProps = {
        fullWidth: true,
        sx: {
            width: { lg: '240px', md: '80%', xs: '200px' },
            color: '#000',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #9e9e9e'
        },
    };

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    position: 'relative',
                    background: `url(${IMG1})`,
                    backgroundRepeat: 'Xrepeat',
                    backgroundSize: 'contain',
                    height: '100%',
                    width: '100%',
                }}
            >
                <Box sx={{ background: 'rgba(13,71,161,0.9)' }}>
                    <Stack direction="row" sx={{ px: { lg: spacing(17), md: spacing(1), xs: spacing(1) }, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ my: 5 }}>
                            <Stack direction="row">
                                <OutlinedInput size='small' {...commonInputProps} placeholder="Enter Skills, Designation etc" />
                                <OutlinedInput size='small' {...commonInputProps} placeholder="Enter Location" />
                                <Button
                                    variant="contained"
                                    sx={{
                                        height: '40px',
                                        width: '150px',
                                        color: '#FFF',
                                        backgroundColor: '#FF0343',
                                        '&:hover': {
                                            backgroundColor: palette.secondary.dark,
                                        },
                                    }}
                                    onClick={() => navigate('/joinnetwork')}
                                >
                                    Find Jobs
                                </Button>
                            </Stack>
                        </Box>
                        <Box sx={{ height: '70px', display: 'flex', gap: 1, alignItems: 'center', p: 2, background: '#fdfdfd' }}>
                            <CloudUploadIcon color='error' />
                            <input
                                name="resumeFile"
                                type="file"
                                style={{ display: 'none', overflow: 'hidden' }}
                            />
                            <label htmlFor="resumeFile">
                                <Button variant="outlined" component="span">
                                    Upload Your Resume
                                </Button>
                            </label>
                        </Box>
                    </Stack >
                </Box>
            </Box >
        </>
    );
};

export default Finds;
