import React, { useState } from 'react';
import { Box, Tabs, Stack, Tab, Typography, useTheme, CircularProgress, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Description from './Description';
import Condidate from './Condidate';
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const JobDescribe = ({ data }) => {
    const { spacing } = useTheme();
    const [value, setValue] = useState(0);
    const { loading, getSingleJD, error } = useSelector((state) => state.RECRUITER);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    if (loading) return <Typography textAlign="center"><ClipLoader /></Typography>;
    if (error) return <Typography color="error" textAlign="center">{error}</Typography>;
    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper sx={{ mt: { md: spacing(0), xs: spacing(1) }, ml: { md: spacing(1), xs: spacing(0) }, p: spacing(2), backgroundColor: '#FDFDFD' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Box>
                            <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>{getSingleJD?.data?.job_title}</Typography>
                            <Typography variant='body2' sx={{ mt: 1 }}>{getSingleJD?.data?.company_name}</Typography>
                            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', mt: 1 }}><LocationOnIcon sx={{ fontSize: '20px' }} />{getSingleJD?.data?.location}</Typography>
                        </Box>
                        <Typography color="error">Expired</Typography>
                    </Stack>
                    <Stack>
                        <Typography variant='body2' sx={{ mt: 1 }}>Full Time</Typography>
                    </Stack>
                    <Box sx={{ borderBottom: 1, mt: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="job details tabs">
                            <Tab label="Description" {...a11yProps(0)} />
                            <Tab label="Candidates" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Description sx={{ backgroundColor: '#d55' }} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Condidate />
                    </CustomTabPanel>
                </Paper>
            )}
        </>
    )
};


export default JobDescribe