import React, { useState } from 'react';
import { Divider, List, ListItem, Paper, Typography, Checkbox, Stack, Radio, Button } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { experience, jobFunction, location, salary } from '../../../apiData/sliderData';
import { useTheme } from '@mui/material/styles';

const JobFilter = () => {
    const theme = useTheme();
    const [selectedFilters, setSelectedFilters] = useState({
        jobFunction: [],
        location: '',
        experience: '',
        salary: ''
    });

    // Handle radio button change
    const handleRadioChange = (type, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [type]: value
        }));
    };

    // Handle checkbox change
    const handleCheckboxChange = (type, value) => {
        setSelectedFilters((prev) => {
            const updatedValues = prev[type].includes(value)
                ? prev[type].filter((item) => item !== value)
                : [...prev[type], value];

            return {
                ...prev,
                [type]: updatedValues
            };
        });
    };

    // Function to generate sx styles based on the selection state
    const getButtonStyles = (isSelected) => ({
        justifyContent: 'flex-start',
        color: isSelected ? theme.palette.primary.main : 'inherit',
        backgroundColor: isSelected ? theme.palette.action.selected : 'transparent',
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.action.hover,
        }
    });

    // Render filter sections
    const renderCheckboxSection = (title, items, type) => (
        <>
            <Typography sx={{ fontWeight: 'bold', p: theme.spacing(1), fontSize: '12px' }}>{title}</Typography>
            <List size="small">
                {items?.map((item, index) => {
                    const isSelected = selectedFilters[type].includes(item.value || item.spcl);
                    return (
                        <ListItem key={index} sx={{ p: theme.spacing(0) }}>
                            <Button
                                fullWidth
                                size='small'
                                sx={getButtonStyles(isSelected)}
                            >
                                <Checkbox size="small" value={item.value || item.spcl} checked={isSelected} onChange={(e) => handleCheckboxChange(type, e.target.value)} />
                                <Typography variant="body2">
                                    {item.spcl}
                                </Typography>
                            </Button>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );

    const renderRadioSection = (title, items, type) => (
        <>
            <Typography sx={{ fontWeight: 'bold', p: theme.spacing(1), fontSize: '12px', color: 'black' }}>
                {title}
            </Typography>
            <List size="small">
                {items?.map((item, index) => {
                    const isSelected = selectedFilters[type] === (item.value || item.loc || item.exp || item.slry);
                    return (
                        <ListItem key={index} sx={{ p: theme.spacing(0) }}>
                            <Button
                                fullWidth
                                size='small'
                                sx={getButtonStyles(isSelected)}
                            >
                                <Radio size="small" value={item.value || item.loc || item.exp || item.slry} checked={isSelected} onChange={(e) => handleRadioChange(type, e.target.value)} />
                                <Typography variant="body2">
                                    {type === 'experience' ? `${item.exp} years` :
                                        type === 'salary' ? `${item.slry} lacs` :
                                            item.loc}
                                </Typography>
                            </Button>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
    return (
        <Paper sx={{ p: theme.spacing(1) }}>
            <Stack direction="row" alignItems="center">
                <TuneIcon sx={{ fontSize: 15, color: 'red' }} />
                <Typography sx={{ fontWeight: 'bold', p: theme.spacing(0.5), fontSize: '12px', color: 'black' }}>
                    ALL FILTERS
                </Typography>
            </Stack>
            <Divider />
            {renderCheckboxSection('Job Function', jobFunction, 'jobFunction')}
            <Divider />
            {renderRadioSection('Location', location, 'location')}
            <Divider />
            {renderRadioSection('Experience', experience, 'experience')}
            <Divider />
            {renderRadioSection('Salary', salary, 'salary')}
            <Divider />
        </Paper>
    );
};
export default JobFilter;
