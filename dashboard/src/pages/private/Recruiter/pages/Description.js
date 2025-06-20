import React from 'react';
import { Box, Divider, List, Stack, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import MoonLoader from 'react-spinners/MoonLoader';


const Description = () => {
    const { spacing } = useTheme();
    const { loading, getSingleJD } = useSelector((state) => state.RECRUITER);


    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <MoonLoader size={20} color="#000" />
                </Box>
            ) : (
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Stack direction={'column'}>
                        <Stack>
                            <Typography variant='body2'><Typography sx={{ fontWeight: 'bold' }} variant='body1' component={'span'}>Job ID : </Typography>{getSingleJD?.data?._id}</Typography>
                            <Typography variant='body2'><Typography sx={{ fontWeight: 'bold' }} variant='body1' component={'span'}>Location : </Typography>{getSingleJD?.data?.location}</Typography>
                            <Typography variant='body2'><Typography sx={{ fontWeight: 'bold' }} variant='body1' component={'span'}>Salary : </Typography>{getSingleJD?.data?.salary?.s_min} - {getSingleJD?.data?.salary?.s_max} LPA</Typography>
                        </Stack>
                        <List>
                            <Typography variant='h6' fontWeight="bold">Hiring for an Insurance Major</Typography>
                            <Divider sx={{ my: spacing(1) }} />
                            <Typography variant='body2'><Typography sx={{ fontWeight: 'bold' }} variant='body1' component={'span'}>Job Title : </Typography>{getSingleJD?.data?.job_title}</Typography>
                            <Typography variant='body2'><Typography sx={{ fontWeight: 'bold' }} variant='body1' component={'span'}>Experience : </Typography>{getSingleJD?.data?.experience?.e_min} - {getSingleJD?.data?.experience?.e_max} years</Typography>
                            <Typography variant='body2'><Typography sx={{ fontWeight: 'bold' }} variant='body1' component={'span'}>Education : </Typography>{getSingleJD?.data?.qualification}</Typography>
                        </List>
                        <Box sx={{ width: '100%' }}>
                            <Typography variant='h6' fontWeight="bold">Job Description</Typography>
                            <Divider sx={{ my: spacing(1) }} />
                            <Typography variant='body2'>
                                {getSingleJD?.data?.job_description}
                            </Typography>
                            <Typography variant='body2'>
                                {getSingleJD?.data?.job_description}
                            </Typography>
                            <Typography variant='body2'>
                                {getSingleJD?.data?.job_description}
                            </Typography>
                        </Box>
                    </Stack>
                    <ShareIcon />
                </Stack>
            )}
        </>
    )
}

export default Description