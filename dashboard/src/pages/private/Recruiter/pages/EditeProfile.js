import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Grid, Typography, useTheme, Paper, IconButton, Tooltip, Avatar, Divider } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { updateRecruiter } from "../../../../reduxSlice/recruiterSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { IMG_BASE_URL } from '../../../../utils/Constants';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const EditProfile = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { _id } = useParams();
    const dispatch = useDispatch();
    const [updateData, setUpdateData] = useState({});
    const { recruiterDetails, userInfoData, loading } = useSelector((state) => state.RECRUITER);
    const image_path = `${IMG_BASE_URL}uploads/${userInfoData?.data?.details?.profileImage ?? 'defaultImage.jpg'}`;

    useEffect(() => {
        if (_id && recruiterDetails?.data) {
            const singleUser = recruiterDetails?.data?.find((ele) => ele._id === _id);
            setUpdateData(singleUser);
        }
    }, [_id, recruiterDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevData) => ({
            ...prevData,
            [name]: value,
            name: {
                ...prevData.name,
                [name]: value,
            },
            address: {
                ...prevData.address,
                [name]: value,
            },
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateRecruiter(updateData));
        toast.success("Update Successful!!!");
        navigate('/listofrecruiter');
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Grid container display={'flex'} justifyContent={'center'}>
                <Grid item md={5} xs={12}>
                    <Paper elevation={2} sx={{ px: theme.spacing(4), py: theme.spacing(1) }}>
                        <Typography variant="h5">Edit Profile</Typography>
                        <Divider sx={{ my: 1 }} />
                        <Tooltip sx={{ m: 'auto' }}>
                            <Avatar variant='circular' style={{ height: '100px', width: '100px', border: '2px solid #dd5' }}
                                alt={userInfoData?.data?.profileImage} src={image_path} />
                        </Tooltip>
                        <IconButton size='small' sx={{ backgroundColor: '#fff', '&:hover': { backgroundColor: '#fff' }, border: '2px solid #dd5', position: 'relative', left: { md: '55%', xs: '55%' }, top: '-37px' }}>
                            <PhotoCameraIcon sx={{ color: '#000', fontSize: '20px' }} />
                        </IconButton>
                        <Box component="form" onSubmit={handleUpdate}>

                            <Stack direction={'row'} spacing={1}>
                                <TextField
                                    value={userInfoData?.data?.details?.name?.first_name || ''}
                                    onChange={handleChange}
                                    name="first_name"
                                    margin="normal"
                                    required
                                    fullWidth
                                    size='small'
                                    placeholder="First Name"
                                    autoFocus
                                />
                                <TextField
                                    value={userInfoData?.data?.details?.name?.last_name || ''}
                                    onChange={handleChange}
                                    name="last_name"
                                    margin="normal"
                                    required
                                    fullWidth
                                    size='small'
                                    placeholder="Last Name"
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={1} sx={{ mt: 1 }}>
                                <TextField
                                    value={userInfoData?.data?.details?.email || ''}
                                    onChange={handleChange}
                                    name="email"
                                    margin="normal"
                                    placeholder="Email Address"
                                    required
                                    fullWidth
                                    size='small'
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={1} sx={{ mt: 1 }}>
                                <TextField
                                    value={userInfoData?.data?.details?.phone || ''}
                                    onChange={handleChange}
                                    name="phone"
                                    margin="normal"
                                    required
                                    fullWidth
                                    size='small'
                                    placeholder="Phone Number"
                                    type="number"
                                />
                                <TextField
                                    value={userInfoData?.data?.details?.address?.pin_code || ''}
                                    onChange={handleChange}
                                    name="pin_code"
                                    margin="normal"
                                    required
                                    fullWidth
                                    size='small'
                                    placeholder="Pin code"
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={1} sx={{ mt: 1 }}>
                                <TextField
                                    value={userInfoData?.data?.details?.address?.state || ''}
                                    onChange={handleChange}
                                    name="state"
                                    fullWidth
                                    size='small'
                                    required
                                    placeholder="State"
                                    margin="normal"
                                />
                                <TextField
                                    value={userInfoData?.data?.details?.address?.district || ''}
                                    onChange={handleChange}
                                    name="district"
                                    required
                                    fullWidth
                                    size='small'
                                    margin="normal"
                                    placeholder="District"
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={1} sx={{ mt: 1 }}>
                                <TextField
                                    value={userInfoData?.data?.details?.address?.pin_code || ''}
                                    onChange={handleChange}
                                    name="pin_code"
                                    required
                                    fullWidth
                                    size='small'
                                    margin="normal"
                                    placeholder="Pin Code"
                                    type="number"
                                />
                                <TextField
                                    value={userInfoData?.data?.details?.address?.local || ''}
                                    onChange={handleChange}
                                    name="local"
                                    fullWidth
                                    size='small'
                                    required
                                    margin="normal"
                                    placeholder="Local"
                                />
                            </Stack>
                            <Button type="submit" fullWidth size='small' variant="contained" sx={{ my: 3 }}>Edited</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid >

            <ToastContainer />
        </>
    );
}

export default EditProfile;
