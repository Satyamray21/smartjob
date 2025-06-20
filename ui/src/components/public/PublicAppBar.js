// src/components/PublicAppBar.jsx

import React, { useEffect, useState } from 'react';
import {
    AppBar, Box, Button, Divider, Badge, IconButton, Stack, Toolbar, Typography,
    useTheme, Avatar, Chip,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    Dialog
} from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Sort as SortIcon,
    Call as CallIcon,
    Mail as MailIcon,
    Notifications as NotificationsIcon,
    MenuRounded as MenuRoundedIcon,
    AccountCircleOutlined
} from '@mui/icons-material';
import { logoutCandidate, changeCandidatePassword } from '../../reduxSlice/candidateSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';


const PublicAppBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const theme = useTheme();
    const { error, success, loading } = useSelector((state) => state.CANDIDATE);
    const loginData = useSelector((state) => state.CANDIDATE.loginData);
    const isLoggedIn = useSelector((state) => state.CANDIDATE.isLoggedIn);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const [scrolling, setScrolling] = useState(false);
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolling(window.pageYOffset > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (success) {
            setOpenChangePasswordModal(false);
            setPasswords({ oldPassword: '', newPassword: '' });
        }
    }, [success]);


    const handleDrawerToggle = () => setOpen(!open);

    const navLinks = [
        { to: '/jobs', label: 'Jobs' },
        { to: '/companies', label: 'Companies' },
        { to: '/services', label: 'Services' },
    ];

    const appBarStyles = {
        backdropFilter: scrolling ? 'blur(10px)' : 'blur(0px)',
        backgroundColor: '#fff',
    };

    const buttonStyle = (selected) => ({
        color: selected ? '#FF0343' : theme.palette.primary.main,
        textDecoration: 'none',
    });

    return (
        <>
            <AppBar elevation={0} position="sticky" sx={appBarStyles}>
                {/* Top Toolbar */}
                <Box
                    sx={{
                        px: { md: theme.spacing(1), lg: theme.spacing(17), xs: theme.spacing(2) },
                        height: '30px',
                        py: 0.5,
                        background: theme.palette.primary.main
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="body1" sx={{ color: theme.palette.info.light, fontSize: '14px' }}>
                            <CallIcon sx={{ fontSize: '15px' }} /> +91 6393351817
                        </Typography>
                        <Typography
                            component={Link}
                            to="/employeelogin"
                            variant="body1"
                            sx={{ textDecoration: 'none', color: theme.palette.info.light, fontSize: '14px' }}
                        >
                            Employee Login
                        </Typography>
                    </Stack>
                </Box>
                <Divider />

                {/* Main Toolbar */}
                <Toolbar sx={{ py: 1 }}>
                    <IconButton edge="start" aria-label="menu" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
                        <MenuRoundedIcon sx={{ color: theme.palette.info.dark, fontSize: '30px', ml: 2 }} />
                    </IconButton>

                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: { md: theme.spacing(1), lg: theme.spacing(17), xs: theme.spacing(2) }
                    }}>
                        {/* Logo */}
                        <Typography variant='h6' sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                Smart<Typography component="span" sx={{ color: '#FF0343' }}>Job</Typography>
                            </Link>
                        </Typography>

                        {/* Navigation Links */}
                        <Stack direction="row" sx={{ gap: theme.spacing(2), display: { xs: 'none', md: 'block', lg: 'flex' } }}>
                            {navLinks.map(link => (
                                <Typography
                                    key={link.to}
                                    component={Link}
                                    to={link.to}
                                    variant="h6"
                                    sx={buttonStyle(pathname === link.to)}
                                    fontWeight="bold"
                                >
                                    {link.label}
                                </Typography>
                            ))}
                        </Stack>

                        {/* Right-side Icons and Buttons */}
                        <Stack direction="row" gap={theme.spacing(2)} alignItems="center">
                            <IconButton size="small" color="primary">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton size="small" color="primary">
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>

                            {!isLoggedIn ? (
                                <Chip
                                    icon={<AccountCircleOutlined />}
                                    label="Login"
                                    onClick={() => navigate('/condidatelogin')}
                                    variant="outlined"
                                    sx={{
                                        color: '#FF0343',
                                        borderColor: '#FF0343',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#FF034320',
                                        },
                                    }}
                                />
                            ) : (
                                <>
                                    <Avatar
                                        src={loginData?.user?.profilePhoto || ''}
                                        alt={loginData?.user?.first_name || ''}
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            cursor: 'pointer',
                                            border: '2px solid #FF0343',
                                        }}
                                        onClick={handleMenuOpen}
                                    />
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={openMenu}
                                        onClose={handleMenuClose}
                                        PaperProps={{
                                            sx: {
                                                borderRadius: 2,
                                                minWidth: 250,
                                                padding: 1,
                                            },
                                        }}
                                    >
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ px: 2, py: 1.5 }}>
                                            <Avatar
                                                src={loginData?.user?.profilePhoto || ''}
                                                alt={loginData?.user?.first_name || ''}
                                                sx={{ width: 48, height: 48 }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight={600}>
                                                    {loginData?.user?.first_name} {loginData?.user?.last_name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {loginData?.user?.email}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <Divider sx={{ my: 1 }} />

                                        {/* 🚀 My Profile */}
                                        <MenuItem
                                            onClick={() => {
                                                handleMenuClose();
                                                navigate('/candidateprofile'); // This should be your profile route
                                            }}
                                            sx={{ py: 1.5, fontWeight: 500 }}
                                        >
                                            👤 My Profile
                                        </MenuItem>

                                        {/* 🔐 Change Password */}
                                        <MenuItem
                                            onClick={() => {
                                                handleMenuClose();
                                                setOpenChangePasswordModal(true);
                                            }}
                                            sx={{ py: 1.5, fontWeight: 500 }}
                                        >
                                            🔐 Change Password
                                        </MenuItem>

                                        {/* 🚪 Logout */}
                                        <MenuItem
                                            onClick={() => {
                                                handleMenuClose();
                                                dispatch(logoutCandidate());
                                                navigate('/');
                                            }}
                                            sx={{ py: 1.5, fontWeight: 500, color: 'error.main' }}
                                        >
                                            🚪 Logout
                                        </MenuItem>
                                    </Menu>

                                </>
                            )}

                        </Stack>
                    </Box>
                </Toolbar>
                <Divider />
            </AppBar>
            <Dialog
                open={openChangePasswordModal}
                onClose={() => setOpenChangePasswordModal(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 2,
                        backgroundColor: '#fefefe'
                    }
                }}
            >
                <DialogTitle>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <LockOutlined color="primary" />
                        <Typography variant="h6" fontWeight="bold">Change Password</Typography>
                    </Stack>
                </DialogTitle>

                <DialogContent dividers>
                    <Stack spacing={2} mt={1}>
                        {error && (
                            <Typography sx={{ color: 'error.main', fontWeight: 500, px: 1 }}>
                                ⚠️ {error}
                            </Typography>
                        )}
                        {success && (
                            <Typography sx={{ color: 'green', fontWeight: 500, px: 1 }}>
                                ✅ Password changed successfully!
                            </Typography>
                        )}

                        <TextField
                            label="Old Password"
                            type={showOld ? 'text' : 'password'}
                            fullWidth
                            value={passwords.oldPassword}
                            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={() => setShowOld(!showOld)} edge="end">
                                        {showOld ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />

                        <TextField
                            label="New Password"
                            type={showNew ? 'text' : 'password'}
                            fullWidth
                            value={passwords.newPassword}
                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                                        {showNew ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={() => setOpenChangePasswordModal(false)}
                        variant="outlined"
                        color="secondary"
                        sx={{ borderRadius: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => dispatch(changeCandidatePassword(passwords))}
                        disabled={loading}
                        sx={{ borderRadius: 2 }}
                    >
                        {loading ? 'Changing...' : 'Change'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PublicAppBar;
