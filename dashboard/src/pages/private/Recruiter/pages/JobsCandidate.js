import React from 'react';
import JobsSearch from './JobsSearch';
import JobDescribe from './JobDescribe';
import { Box, Grid } from '@mui/material';

const Jobs = () => {
	return (
		<>
			<Box sx={{ height: '89vh', mt: 1, overflowY: 'scroll', }}>
				<Grid container>
					<Grid items xs={12} md={4}><JobsSearch /></Grid>
					<Grid items xs={12} md={8} ><JobDescribe /></Grid>
				</Grid>
			</Box>
		</>
	)
};

export default Jobs;
