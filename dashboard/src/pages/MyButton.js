import React from 'react';
import Button from '@mui/material/Button';

const MyButton = ({ children, onClick, backColor, ...props }) => {
    const handleHover = (event) => {
        event.target.classList.add('hovered');
    };

    const handleMouseOut = (event) => {
        event.target.classList.remove('hovered');
    };

    return (
        <Button
            {...props}
            type='submit'
            sx={{
                position: 'relative',
                overflow: 'hidden',
                ':hover': {
                    '&::after': {
                        transition: '0.4s ease-in', '&:hover': { boxShadow: '1px 1px 10px 1px #F0FAF9' },
                        transform: 'scaleY(1)',
                    },
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 3,
                    backgroundColor: '#F4511E',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: 3,
                    backgroundColor: backColor,
                }
            }}
            onClick={onClick}
            onMouseOver={handleHover}
            onMouseOut={handleMouseOut}
        >
            {children}
        </Button>
    );
};

export default MyButton;
