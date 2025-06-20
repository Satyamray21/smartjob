import React, { useState } from 'react';
import { Box, Grid, Tabs, Tab, Stack } from '@mui/material';
import ResumeUploader from './ResumeUploader';
import JdView from './JdView';

const Job = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    const switchToApplicationTab = () => {
        setTabIndex(1);
    };
    return (
        <>
            <Box sx={{ height: '89vh', mt: 1, width: "100%" }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Tabs
                            size="small"
                            value={tabIndex}
                            onChange={handleTabChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="application tabs"
                        >
                            <Tab sx={{ width: { md: '160px', xs: '50%' }, mr: 1, background: tabIndex === 0 ? '#F0F1F5' : '#fff', color: tabIndex === 0 ? '#fff' : '#000', borderRadius: '2px', }} label="Job Description" />
                            <Tab sx={{ width: { md: '160px', xs: '50%' }, background: tabIndex === 1 ? '#F0F1F5' : '#fff', color: tabIndex === 1 ? '#fff' : '#000', borderRadius: '2px', }} label="Application" />
                        </Tabs>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2, overflowY: 'scroll', height: '80vh', width: '100%' }}>
                    <Stack>
                        {tabIndex === 0 && <JdView switchToApplicationTab={switchToApplicationTab} />}
                    </Stack>
                    <Stack>
                        {tabIndex === 1 && <ResumeUploader />}
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default Job;
