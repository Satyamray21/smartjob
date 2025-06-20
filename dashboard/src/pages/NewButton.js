import React from 'react';
import { Button } from '@mui/material';

const ArrowButton = ({ children }) => {
    return (
        <Button
            fullWidth
            variant="contained"
            sx={{
                '&& .Mui-selected, && .Mui-selected:hover': {
                    bgcolor: 'primary.main',
                    '&, & .MuiListItemIcon-root': { color: 'background.default' },
                },
                '& .MuiListItemButton-root:hover': {
                    bgcolor: '',
                    '&, & .MuiListItemIcon-root': { color: 'primary.main' },
                    '&, & .ListItemText-root': { color: 'primary.main' },
                },
                backgroundColor: 'primary.main',
                color: 'white',
                borderRadius: '0px',
                clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)',
                '&:hover': {
                    backgroundColor: 'primary.dark',
                },
            }}
        >
            {children}
        </Button>
    );
};


export default ArrowButton;
