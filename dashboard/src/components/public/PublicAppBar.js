import React, { useEffect, useState } from 'react';
import { Box, Toolbar, IconButton, AppBar, Drawer, Divider, Button, useTheme, Stack, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const PublicAppBar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { palette, spacing } = useTheme();
    const [open, setOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.pageYOffset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDrawerToggle = () => setOpen(!open);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/jobs', label: 'Jobs' },
        { to: '/contact', label: 'Contact' },
        { to: '/services', label: 'Services' },
    ];

    return (
        <>
            <AppBar elevation={0} position="sticky" sx={{ backdropFilter: scrolling ? 'blur(10px)' : 'blur(0px)', backgroundColor: '#fff' }}>
                <Toolbar sx={{ display: { md: 'block', xs: 'block' }, px: { md: spacing(1), lg: spacing(17), xs: spacing(2) }, height: '20px' }} style={{ background: palette.primary.main }} disableGutters>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mt: 0.5, alignItems: 'center' }}>
                        <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', color: '#FAFAF9' }}>
                            <CallIcon sx={{ fontSize: '15px', color: '#FAFAF9' }} />+916393351817
                        </Typography>
                        <Link to='/employeelogin' style={{ textDecoration: 'none', color: '#FAFAF9' }}>Recruiter's Login</Link>
                    </Box>
                </Toolbar>
                <Divider />
                <Toolbar sx={{ py: 1.4 }} disableGutters>
                    <IconButton edge="start" color="#3f51b5" aria-label="menu" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
                        <MenuRoundedIcon sx={{ color: palette.info.dark, backgroundColor: '#FFF', fontSize: '30px', fontWeight: 'bold', ml: 2 }} />
                    </IconButton>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', px: { md: spacing(1), lg: spacing(17), xs: spacing(2) } }}>
                        <Typography variant='h5' sx={{ color: palette.primary.main, fontWeight: 'bold' }}>
                            <Link to={'/'} style={{ textDecoration: 'none' }}>
                                Smart<Typography component={'span'} sx={{ color: '#FF0343' }}>Job</Typography>
                            </Link>
                        </Typography>
                        <Stack direction={'row'} sx={{ gap: spacing(2), display: { xs: 'none', md: 'block', lg: 'flex' } }}>
                            {navLinks.map(link => (
                                <Typography
                                    key={link.to}
                                    component={Link}
                                    to={link.to}
                                    variant='body2'
                                    sx={{ textDecoration: 'none', m: 1, color: palette.primary.main, color: pathname === link.to ? '#FF0343' : '#3f51b5' }}
                                >
                                    {link.label}
                                </Typography>
                            ))}
                        </Stack>
                        <Stack direction={'row'} gap={spacing(1)}>
                            <Button variant='none' size='small' sx={{ fontSize: '10px', '&:hover': { backgroundColor: '#FF0343' }, backgroundColor: '#FF0343' }} onClick={() => navigate('/condidateregister')}>
                                Register
                            </Button>
                            <Button variant='none' size='small' sx={{ fontSize: '10px', '&:hover': { color: '#FF0343' }, border: '1px solid #FF0343', color: '#FF0343' }} onClick={() => navigate('/condidatelogin')}>
                                Login
                            </Button>
                        </Stack>
                    </Box>
                </Toolbar>
                <Divider />
                <Drawer variant="temporary" open={open} onClose={handleDrawerToggle}>
                    <Stack sx={{ width: 340 }}>
                        <Box sx={{ backgroundColor: palette.info.dark, display: 'flex', color: '#FFF', alignItems: 'center', justifyContent: 'space-between', p: spacing(1) }}>
                            <Box sx={{ width: '70px' }}>
                                <img src="" alt='spirale' style={{ height: '100%', width: '100%' }} />
                            </Box>
                            <CloseIcon sx={{ color: '#FFF' }} onClick={handleDrawerToggle} />
                        </Box>
                        <Stack direction={'column'} alignItems={'center'} gap={spacing(2)}>
                            {navLinks.map(link => (
                                <Button
                                    key={link.to}
                                    component={Link}
                                    to={link.to}
                                    onClick={handleDrawerToggle}
                                    sx={{ color: pathname === link.to ? '#FF0343' : '#3f51b5' }}
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Stack>
                    </Stack>
                </Drawer>
            </AppBar>
        </>
    );
};

export default PublicAppBar;
