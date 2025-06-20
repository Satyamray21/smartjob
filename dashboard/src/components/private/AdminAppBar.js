import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Drawer, AppBar, Toolbar, List, Typography, ListItemButton,
    ListItemIcon, ListItemText, IconButton, Divider, Avatar, Stack, Tooltip, Collapse,
    useMediaQuery, useTheme, Button, Menu, MenuItem, Paper
} from '@mui/material';
import {
    Dashboard, Menu as MenuIcon, ExpandLess, ExpandMore, Work as WorkIcon, NoteAdd as NoteAddIcon, HideSourceOutlined, Group as GroupIcon,
    LibraryBooks as LibraryBooksIcon, GroupAdd, ForwardToInbox as ForwardToInboxIcon, FileCopy as FileCopyIcon,
    RecentActors as RecentActorsIcon,
    WorkHistoryOutlined
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IMG_BASE_URL } from '../../utils/Constants';
import { adminLogout, makeAnViewId } from '../../reduxSlice/adminSlice';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const drawerWidth = 220;

const AdminAppBar = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const { breakpoints, palette, spacing } = theme;
    const { admin } = useSelector((state) => state.ADMIN);
    const imagePath = `${IMG_BASE_URL}/uploads/${admin?.profileImage ?? 'defaultImage.jpg'}`;
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const isLarge = useMediaQuery(breakpoints.up('xl'));
    const laptopSize = useMediaQuery(breakpoints.down('xl'));

    useEffect(() => {
        setOpen(!laptopSize);
    }, [laptopSize]);

    const handleSectionClick = (section) => () => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };
    const handleDrawerToggle = useCallback(() => setOpen((prevOpen) => !prevOpen), []);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = useCallback(() => {
        dispatch(adminLogout());
        window.location.href = '/';
    }, [dispatch, navigate]);

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
                                alt={admin?.name?.first_name}
                                src={imagePath}
                            />
                        </IconButton>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />
                        <Typography sx={{ fontSize: 10, fontWeight: 'bold', color: palette.success.dark }}>
                            Hello, {admin?.name?.first_name} {admin?.name?.last_name}
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
                                                alt={admin?.name?.first_name}
                                                src={imagePath}
                                            />
                                        </Tooltip>
                                        <Typography variant='body2' sx={{ fontWeight: 'bold', mt: spacing(1) }}>
                                            {admin?.name?.first_name} {admin?.name?.last_name}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {admin?.email}
                                        </Typography>
                                    </Stack>
                                    <Divider />
                                    <Box sx={{ my: 1 }}>
                                        <MenuItem
                                            sx={{ my: 1 }}
                                            onClick={() => {
                                                handleClose();
                                                handleView(admin?._id);
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
                <Box sx={{ overflow: 'auto', background: '#F1F2F5', height: '100%', }}>
                    <Box sx={{ p: 1 }}>
                        <Typography variant='h4' sx={{ color: palette.primary.main, textAlign: 'center', fontWeight: 'bold' }}>
                            <Link to={'/'} style={{ textDecoration: 'none' }}>
                                Smart<Typography variant='h5' component={'span'} sx={{ color: '#FF0343' }}>Job</Typography>
                            </Link>
                        </Typography>
                    </Box>
                    <Divider />
                    <List
                        sx={{
                            '&& .Mui-selected, && .Mui-selected:hover': {
                                borderLeft: '3px solid red',
                                '&, & .MuiListItemIcon-root': { color: 'error.dark' },
                            },
                            '& .MuiListItemButton-root:hover': {
                                '&, & .MuiListItemIcon-root': { color: 'error.dark' },
                                '&, & .ListItemText-root': { color: 'error.dark' },
                            }
                        }}
                    >
                        <ListItemButton
                            size="small"
                            sx={{ mx: spacing(1), fontWeight: 'thin' }}
                            LinkComponent={Link}
                            to='/'
                            selected={location.pathname === '/'}
                            onClick={() => isLarge ? null : setOpen(false)}
                        >
                            <ListItemIcon><Dashboard sx={{ fontSize: '13px' }} /></ListItemIcon>
                            <ListItemText primary='Dashboard' />
                        </ListItemButton>

                        {['recruiter', 'jd']?.map((section) => (
                            <List component={'div'} key={section}>
                                <ListItemButton sx={{ mx: 1 }} onClick={handleSectionClick(section)} >
                                    <ListItemIcon>
                                        <Typography variant='body2'> {section === 'recruiter' && <GroupIcon sx={{ fontSize: '13px' }} />}</Typography>
                                        <Typography variant='body2'> {section === 'jd' && <WorkIcon sx={{ fontSize: '13px' }} />}</Typography>
                                    </ListItemIcon>
                                    <ListItemText primary={capitalizeFirstLetter(section.replace(/([A-Z])/g, ' $1'))} />
                                    {openSections[section] ? <ExpandLess sx={{ fontSize: '18px' }} /> : <ExpandMore sx={{ fontSize: '18px' }} />}
                                </ListItemButton>
                                <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {['create', 'list'].map((action) => (
                                            <Box key={action} sx={{ mx: 1, mt: 1 }}>
                                                <ListItemButton
                                                    size="small"
                                                    component={Link}
                                                    to={`/${section}${action}`}
                                                    selected={location.pathname === `/${section}${action}`}
                                                    onClick={() => (isLarge ? null : setOpen(false))}
                                                >
                                                    <ListItemIcon sx={{ px: 2 }}>
                                                        {action === 'create' ? (
                                                            <NoteAddIcon sx={{ fontSize: '13px' }} />
                                                        ) : (
                                                            <LibraryBooksIcon sx={{ fontSize: '13px' }} />
                                                        )}
                                                    </ListItemIcon>
                                                    <ListItemText primary={`${capitalizeFirstLetter(action)} ${section.replace(/([A-Z])/g, ' $1')}`} />
                                                </ListItemButton>
                                            </Box>
                                        ))}
                                    </List>
                                </Collapse>
                            </List>
                        ))}
                        <ListItemButton
                            size="small"
                            sx={{ fontSize: '10px', mx: 1, mt: spacing(1) }}
                            LinkComponent={Link}
                            to='/accountactive'
                            selected={location.pathname === '/accountactive'}
                            onClick={() => isLarge ? null : setOpen(false)}
                        >
                            <ListItemIcon><GroupAdd sx={{ fontSize: '13px' }} /></ListItemIcon>
                            <ListItemText primary='Active Account' />
                        </ListItemButton>
                        <ListItemButton
                            size="small"
                            sx={{ fontSize: '10px', mx: 1, mt: spacing(1) }}
                            LinkComponent={Link}
                            to='/accountblock'
                            selected={location.pathname === '/accountblock'}
                            onClick={() => isLarge ? null : setOpen(false)}
                        >
                            <ListItemIcon><HideSourceOutlined sx={{ fontSize: '13px' }} /></ListItemIcon>
                            <ListItemText primary='Block Account' />
                        </ListItemButton>
                        <ListItemButton
                            size="small"
                            sx={{ fontSize: '10px', mx: 1, mt: spacing(1) }}
                            LinkComponent={Link}
                            to='/resumelist'
                            selected={location.pathname === '/resumelist'}
                            onClick={() => isLarge ? null : setOpen(false)}
                        >
                            <ListItemIcon><FileCopyIcon sx={{ fontSize: '13px' }} /></ListItemIcon>
                            <ListItemText primary='Resume List' />
                        </ListItemButton>
                        <ListItemButton
                            size="small"
                            sx={{ fontSize: '10px', mx: 1, mt: spacing(1) }}
                            LinkComponent={Link}
                            to='/sendjdemail'
                            selected={location.pathname === '/sendjdemail'}
                            onClick={() => isLarge ? null : setOpen(false)}
                        >
                            <ListItemIcon><ForwardToInboxIcon sx={{ fontSize: '13px' }} /></ListItemIcon>
                            <ListItemText primary='Send Jd Email' />
                        </ListItemButton>
                        <ListItemButton
                            size="small"
                            sx={{ fontSize: '10px', mx: 1, mt: spacing(1) }}
                            LinkComponent={Link}
                            to='/recruiterbyadmin'
                            selected={location.pathname === '/recruiterbyadmin'}
                            onClick={() => isLarge ? null : setOpen(false)}
                        >
                            <ListItemIcon><RecentActorsIcon sx={{ fontSize: '13px' }} /></ListItemIcon>
                            <ListItemText primary='Recruiter By Admin' />
                        </ListItemButton>
                        <ListItemButton
                            size="small"
                            sx={{ fontSize: '10px', mx: 1, mt: spacing(1) }}
                            LinkComponent={Link}
                            to='/jdbyadmin'
                            selected={location.pathname === '/jdbyadmin'}
                            onClick={() => isLarge ? null : setOpen(false)}
                        >
                            <ListItemIcon><WorkHistoryOutlined sx={{ fontSize: '13px' }} /></ListItemIcon>
                            <ListItemText primary='Jd By Admin' />
                        </ListItemButton>
                    </List>
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

export default AdminAppBar;
