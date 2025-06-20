import React from 'react';
import { Card, CardContent, Typography, Grid, Divider, IconButton, Stack, Box, Paper, Toolbar } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ReplyIcon from '@mui/icons-material/Reply';
import Groups3Icon from '@mui/icons-material/Groups3';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CustomLineChart from './CustomLineBar';
import CustomPieChart from './CustomPieChart';
import CustomBarChart from './CustomBarChart';
import { Line } from 'recharts';


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

const data = [
    { name: 'January', TotalApplications: 400, AcceptedApplications: 240, RejectedApplications: 120, amt: 200 },
    { name: 'February', TotalApplications: 320, AcceptedApplications: 210, RejectedApplications: 110, amt: 250 },
    { name: 'March', TotalApplications: 410, AcceptedApplications: 340, RejectedApplications: 170, amt: 300 },
    { name: 'April', TotalApplications: 430, AcceptedApplications: 240, RejectedApplications: 120, amt: 350 },
    { name: 'May', TotalApplications: 230, AcceptedApplications: 200, RejectedApplications: 130, amt: 400 },
    { name: 'June', TotalApplications: 340, AcceptedApplications: 210, RejectedApplications: 140, amt: 450 },
    { name: 'July', TotalApplications: 350, AcceptedApplications: 220, RejectedApplications: 150, amt: 500 },
    { name: 'August', TotalApplications: 240, AcceptedApplications: 230, RejectedApplications: 160, amt: 550 },
    { name: 'September', TotalApplications: 380, AcceptedApplications: 240, RejectedApplications: 170, amt: 600 },
    { name: 'October', TotalApplications: 270, AcceptedApplications: 250, RejectedApplications: 180, amt: 650 },
    { name: 'November', TotalApplications: 260, AcceptedApplications: 160, RejectedApplications: 190, amt: 700 },
    { name: 'December', TotalApplications: 250, AcceptedApplications: 270, RejectedApplications: 220, amt: 750 },
];


const StatCard = ({ value, label, color, icon }) => (
    <Grid item md={3} xs={12}>
        <Card sx={{ borderTop: `3px solid ${color}` }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <IconButton>{icon}</IconButton>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Stack>
                        <Typography sx={{ fontSize: 25, fontWeight: 'bold', color }}>{value}</Typography>
                        <Typography sx={{ fontSize: 10, fontWeight: 'bold' }}>{label}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    </Grid>
);

const Dashboard = () => (
    <>
        <Toolbar />
        <Box sx={{ height: '86vh', overflowY: 'scroll' }}>
            <Grid container spacing={1}>
                {statCards?.map((card, index) => (
                    <StatCard key={index} {...card} />
                ))}
            </Grid>
        </Box>
    </>
);

export default Dashboard;
