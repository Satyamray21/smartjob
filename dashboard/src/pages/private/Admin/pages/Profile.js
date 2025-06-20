import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import ProfileUpdate from './ProfileUpdate';
import ProfileView from './ProfileView';

const Profile = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Tabs
                size="small"
                value={activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="profile tabs"
            >
                <Tab sx={{ width: { md: '160px', xs: '50%' }, mr: 1, background: activeTab === 0 ? '#fff' : '#F0F1F5', color: activeTab === 0 ? '#fff' : '#000', borderRadius: '2px', }} label="View Profile" />
                <Tab sx={{ width: { md: '160px', xs: '50%' }, background: activeTab === 1 ? '#fff' : '#F0F1F5', color: activeTab === 1 ? '#fff' : '#000', borderRadius: '2px', }} label="Update Profile" />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <ProfileView />
            </TabPanel>
            {/* profile update */}
            <TabPanel value={activeTab} index={1}>
                <ProfileUpdate />
            </TabPanel>
        </Box >
    );
};

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

export default Profile;