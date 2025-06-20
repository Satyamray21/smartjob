import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@emotion/react';
import JobFilter from './JobFilter';
import TopCompany from './TopComany';
import CompanyList from './CompanyList';

const Jobs = () => {
    const { spacing } = useTheme();
    return (
        <>
            <Box sx={{ px: { lg: spacing(17), md: spacing(1), xs: spacing(1) }, py: 2, background: '#e9e9e9' }} >
                <TopCompany />
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <JobFilter />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <CompanyList />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Jobs;