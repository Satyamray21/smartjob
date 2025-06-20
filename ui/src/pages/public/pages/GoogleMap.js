import React from 'react';
import { Box, Grid } from '@mui/material';

const GoogleMap = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box
                    sx={{
                        width: '100%',
                        height: '400px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1751.9590260468199!2d77.32409253866982!3d28.572223393924386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce44e94a2663f%3A0x96317734f1be41f7!2sNoida%20Sector%2018%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1725966414674!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </Box>
            </Grid>
        </Grid>
    );
};

export default GoogleMap;
