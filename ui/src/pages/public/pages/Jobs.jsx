import React from 'react';
import { Box, Grid } from '@mui/material';
import LIC from '../../../assets/images/job_loc.jpg';
import Img from '../../../assets/images/job_loc1.jpg';
import JobFound from './JobFound'
import { useTheme } from '@emotion/react';
import JobFilter from './JobFilter';
import Finds from './Finds';

const Jobs = () => {
    const { spacing } = useTheme();
    return (
        <>
            <Finds />
            <Box sx={{ px: { lg: spacing(17), md: spacing(1), xs: spacing(1) }, py: 2, background: '#e9e9e9' }} >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={2.3}>
                        <JobFilter />
                    </Grid>
                    <Grid item xs={12} md={7.5}>
                        <JobFound />
                    </Grid>
                    <Grid item xs={12} md={2.2} sx={{ m: { xs: '20px 20px', md: '0px 0px' } }}>
                        <img style={{ height: '240px', width: '100%' }} src={LIC} alt="Job Location 1" />
                        <img style={{ height: '240px', width: '100%' }} src={Img} alt="Job Location 2" />
                        <img style={{ height: '240px', width: '100%' }} src={LIC} alt="Job Location 3" />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Jobs;