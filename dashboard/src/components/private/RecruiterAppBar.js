import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Drawer, AppBar, Toolbar, List, Typography, ListItemButton,
    ListItemIcon, ListItemText, IconButton, Divider, Avatar, Stack, Tooltip,
    useMediaQuery, useTheme, Button, Menu, MenuItem, Paper
} from '@mui/material';
import {
    Description as DescriptionIcon,
    Menu as MenuIcon,
    AccountBoxOutlined,
    ExitToAppOutlined
} from '@mui/icons-material';
import WorkIcon from '@mui/icons-material/Work';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IMG_BASE_URL } from '../../utils/Constants';
import { makeAnViewId, recruiterLogout } from '../../reduxSlice/recruiterSlice';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const drawerWidth = 220;

const RecruiterAppBar = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const { breakpoints, palette, spacing } = theme;
    const { recruiter } = useSelector((state) => state.RECRUITER);
    const imagePath = `${IMG_BASE_URL}/uploads/${recruiter?.profileImage ?? 'defaultImage.jpg'}`;
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const isLarge = useMediaQuery(breakpoints.up('xl'));
    const laptopSize = useMediaQuery(breakpoints.down('xl'));

    useEffect(() => {
        setOpen(!laptopSize);
    }, [laptopSize]);

    const handleDrawerToggle = useCallback(() => setOpen((prevOpen) => !prevOpen), []);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = useCallback(() => {
        dispatch(recruiterLogout());
        window.location.href = '/';
    }, [dispatch, navigate]);

    const sectionIcons = {
        jobs: <ReceiptLongIcon />,
        jobsCandidate: <WorkIcon />,
        applications: <DescriptionIcon />,
    };

    const handleView = (id) => {
        dispatch(makeAnViewId(id));
    };

    return (
        <Box sx={{ display: 'flex', background: palette.success.light }}>
            <AppBar
                color='info'
                elevation={0}
                position="fixed"
                sx={{
                    backgroundColor: '#FFF',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
                    ml: open ? `${drawerWidth}px` : 0,
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
                    <IconButton
                        color="info"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* <Typography
                        variant="h6"
                        sx={{ textTransform: "uppercase", textAlign: 'center', color: palette.success.dark }}
                        noWrap
                    >
                        Recruiter Panel
                    </Typography> */}

                    <Stack direction="row" alignItems="center">
                        <IconButton
                            size="small"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar
                                variant='circular'
                                style={{ border: '2px solid #dd5' }}
                                alt={recruiter?.name?.first_name}
                                src={imagePath}
                            />
                        </IconButton>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />
                        <Typography sx={{ fontSize: 10, fontWeight: 'bold', color: palette.success.dark }}>
                            Hello, {recruiter?.name?.first_name} {recruiter?.name?.last_name}
                        </Typography>
                        <Paper elevation={0}>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Stack sx={{ width: 260 }}>
                                    <Stack direction={'column'} alignItems="center" sx={{ py: 2 }} spacing={2}>
                                        <Tooltip>
                                            <Avatar
                                                variant='circular'
                                                style={{ height: '70px', width: '70px', border: '3px solid #dd5' }}
                                                alt={recruiter?.name?.first_name}
                                                src={imagePath}
                                            />
                                        </Tooltip>
                                        <Typography variant='body2' sx={{ fontWeight: 'bold', mt: spacing(1) }}>
                                            {recruiter?.name?.first_name} {recruiter?.name?.last_name}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {recruiter?.email}
                                        </Typography>
                                    </Stack>
                                    <Divider />
                                    <Box sx={{ my: 1 }}>
                                        <MenuItem
                                            sx={{ my: 1 }}
                                            onClick={() => {
                                                handleClose();
                                                handleView(recruiter?._id);
                                            }}
                                        >
                                            <Link
                                                to="/profile"
                                                style={{ textDecoration: 'none', color: '#333' }}
                                            >
                                                Profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                    </Box>
                                    <Box sx={{ m: 2 }}>
                                        <Button onClick={handleLogout} fullWidth color='error' variant='outlined'>
                                            Logout
                                        </Button>
                                    </Box>
                                </Stack>
                            </Menu>
                        </Paper>
                    </Stack>
                </Toolbar>
                <Divider />
            </AppBar>
            <Drawer
                variant={isLarge ? 'persistent' : 'temporary'}
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ width: open ? drawerWidth : 0, flexShrink: 0, transition: 'width 0.3s', [`& .MuiDrawer-paper`]: { width: drawerWidth } }}
            >
                {/* Drawer content */}
                <Box sx={{
                    overflow: 'auto', background: palette.success.deem, height: '100%'
                }}>
                    <Box sx={{ p: 1 }}>
                        <Typography variant='h4' sx={{ color: theme.palette.primary.main, textAlign: 'center', fontWeight: 'bold' }}>
                            <Link to={'/'} style={{ textDecoration: 'none' }}>
                                Smart<Typography variant='h5' component={'span'} sx={{ color: '#FF0343' }}>Job</Typography>
                            </Link>
                        </Typography>
                    </Box>
                    <Divider />
                    <Stack direction={'column'} sx={{ display: 'flex', height: '92vh', justifyContent: 'space-between' }} >
                        {/* jobs */}
                        <List
                            sx={{
                                '&& .Mui-selected, && .Mui-selected:hover': {
                                    borderLeft: '2px solid red',
                                    '&, & .MuiListItemIcon-root': { color: 'background.default' },
                                },
                                '& .MuiListItemButton-root:hover': {
                                    '&, & .MuiListItemIcon-root': { color: 'error.dark' },
                                    '&, & .ListItemText-root': { color: 'error.dark' },
                                }
                            }}
                        >
                            <Box sx={{ mx: 1, }}><Typography variant='h6'>Tracker</Typography></Box>
                            {['jobs', 'jobscandidate', 'applications'].map((section) => (
                                <List component="div" disablePadding key={section}>
                                    <Box sx={{ mx: 1, }}>
                                        <ListItemButton
                                            size="small"
                                            sx={{ display: 'flex', borderLeft: '1px dashed #F0F2F5', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}
                                            LinkComponent={Link}
                                            to={`/${section}`}
                                            selected={location.pathname === `/${section}`}
                                            onClick={() => !isLarge && setOpen(false)}
                                        >
                                            <ListItemIcon size="small">
                                                {sectionIcons[section]}
                                            </ListItemIcon>
                                            <ListItemText primary={capitalizeFirstLetter(section.replace(/([A-Z])/g, ' $1'))} />
                                        </ListItemButton>
                                    </Box>
                                </List>
                            ))}
                        </List>
                        <Box>
                            {/* profile */}
                            <List
                                sx={{
                                    '&& .Mui-selected, && .Mui-selected:hover': {
                                        borderLeft: '2px solid red',
                                        '&, & .MuiListItemIcon-root': { color: 'background.default' },
                                    },
                                    '& .MuiListItemButton-root:hover': {
                                        '&, & .MuiListItemIcon-root': { color: 'error.dark' },
                                        '&, & .ListItemText-root': { color: 'error.dark' },
                                    }
                                }}
                            >
                                <Box sx={{ mx: 1, }}><Typography variant='h6'>Profile</Typography></Box>
                                <List component="div" disablePadding>
                                    <Box sx={{ mx: 1, }}>
                                        <ListItemButton
                                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}
                                            LinkComponent={Link}
                                            to={`/profile`}
                                            selected={location.pathname === '/profile'}
                                            onClick={() => !isLarge && setOpen(false)}
                                        >
                                            <ListItemIcon>
                                                <AccountBoxOutlined />
                                            </ListItemIcon>
                                            <ListItemText primary="My Profile" />
                                        </ListItemButton>
                                    </Box>
                                </List>
                                <List>
                                    <ListItemButton onClick={handleLogout} sx={{ mx: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ListItemIcon><ExitToAppOutlined color='error' /></ListItemIcon>
                                        <ListItemText sx={{ color: 'error.main' }}>Logout</ListItemText>
                                    </ListItemButton>
                                </List>
                            </List>
                        </Box>
                    </Stack>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, p: 1, mt: 2, height: '97vh',
                    background: palette.primary.light,
                    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
                }}
            >

                {children}

            </Box>
        </Box>
    );
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default RecruiterAppBar;
