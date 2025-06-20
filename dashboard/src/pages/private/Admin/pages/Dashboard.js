import React from 'react';
import { Card, CardContent, Typography, Grid, Divider, IconButton, Stack, Box, Paper } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ReplyIcon from '@mui/icons-material/Reply';
import Groups3Icon from '@mui/icons-material/Groups3';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import CustomLineChart from './CustomLineBar';
import CustomPieChart from './CustomPieChart';
import CustomBarChart from './CustomBarChart';
// import { Line } from 'recharts';


const iconStyles = {
    color: 'blue',
    fontSize: 40,
    transition: 'all 0.3s',
    '&:hover': { transform: 'scale(1.1)' },
};

const statCards = [
    { value: 10, label: 'Total Applied Job', color: '#ffc107', icon: <BusinessCenterIcon sx={iconStyles} /> },
    { value: 25, label: 'Application Answered', color: '#ff6f00', icon: <ReplyIcon sx={iconStyles} /> },
    { value: 225, label: 'Interviewed Job', color: '#009688', icon: <Groups3Icon sx={iconStyles} /> },
    { value: 8, label: 'Hired Job', color: '#795548', icon: <PersonAddIcon sx={iconStyles} /> },
];

// const data = [
//     { name: 'January', TotalApplications: 400, AcceptedApplications: 240, RejectedApplications: 120, amt: 200 },
//     { name: 'February', TotalApplications: 320, AcceptedApplications: 210, RejectedApplications: 110, amt: 250 },
//     { name: 'March', TotalApplications: 410, AcceptedApplications: 340, RejectedApplications: 170, amt: 300 },
//     { name: 'April', TotalApplications: 430, AcceptedApplications: 240, RejectedApplications: 120, amt: 350 },
//     { name: 'May', TotalApplications: 230, AcceptedApplications: 200, RejectedApplications: 130, amt: 400 },
//     { name: 'June', TotalApplications: 340, AcceptedApplications: 210, RejectedApplications: 140, amt: 450 },
//     { name: 'July', TotalApplications: 350, AcceptedApplications: 220, RejectedApplications: 150, amt: 500 },
//     { name: 'August', TotalApplications: 240, AcceptedApplications: 230, RejectedApplications: 160, amt: 550 },
//     { name: 'September', TotalApplications: 380, AcceptedApplications: 240, RejectedApplications: 170, amt: 600 },
//     { name: 'October', TotalApplications: 270, AcceptedApplications: 250, RejectedApplications: 180, amt: 650 },
//     { name: 'November', TotalApplications: 260, AcceptedApplications: 160, RejectedApplications: 190, amt: 700 },
//     { name: 'December', TotalApplications: 250, AcceptedApplications: 270, RejectedApplications: 220, amt: 750 },
// ];


const StatCard = ({ value, label, color, icon }) => (
    <Grid item md={3} xs={12}>
        <Card sx={{ borderTop: `3px solid ${color}` }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <IconButton>{icon}</IconButton>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Stack>
                        <Typography sx={{ fontSize: 35, fontWeight: 'bold', color }}>{value}</Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{label}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    </Grid>
);

const Dashboard = () => (
    <>
        <Box sx={{ height: '87vh', mt: 1, overflowY: 'scroll' }}>
            <Grid container spacing={1}>
                {statCards?.map((card, index) => (
                    <StatCard key={index} {...card} />
                ))}
            </Grid>
            <Grid container spacing={1} sx={{ mt: { md: 0, xs: 1 } }}>
                <Grid item md={7.5} xs={12}>
                    <Paper sx={{ minWidth: '60%', width: '100%', height: '47vh', py: 2 }}>
                        <CustomBarChart />
                    </Paper>
                </Grid>
                <Grid item md={4.5} xs={12}>
                    <Paper sx={{ minWidth: '60%', width: '100%', height: '47vh' }}>
                        <CustomPieChart />
                    </Paper>
                </Grid>
            </Grid>
            {/* <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper sx={{ minWidth: '100%', height: '50vh', mt: 1, py: 1 }}>
                        <CustomLineChart
                            chartType={Line}
                            data={data}
                            xAxisKey="name"
                            yAxisKey="amt"
                            linesOrBars={[
                                { dataKey: 'TotalApplications', stroke: '#8884d8', label: true },
                                { dataKey: 'AcceptedApplications', stroke: '#82ca9d', label: true },
                                { dataKey: 'RejectedApplications', stroke: '#ff6347', label: true },
                            ]}
                        />
                    </Paper>
                </Grid>
            </Grid> */}
        </Box>
    </>
);

export default Dashboard;
