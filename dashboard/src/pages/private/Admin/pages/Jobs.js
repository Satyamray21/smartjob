import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Img1 from '../../../assets/images/jobs1.jpg';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
	const { spacing } = useTheme();
	const navigate = useNavigate();

	const handleClick = (event) => {
		event.preventDefault();
		navigate('/');
	};

	return (
		<>
			<Box
				sx={{
					backgroundImage: `url(${Img1})`,
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					height: '50vh',
					position: 'relative',
					mt: spacing(1),
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						width: { md: '100%', xs: '100%' },
						height: { md: '100%', xs: '100%' },
						background: 'rgba(0,0,0,0.4)', display: 'flex',

						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Breadcrumbs
						aria-label="breadcrumb"
						sx={{ fontSize: '22px', color: '#FFF' }}
					>
						<Button
							variant="text"
							sx={{
								'&:hover': { background: 'none' },
								color: '#FFF',
								fontWeight: 'normal',
								fontSize: '22px',
							}}
							onClick={handleClick}
						>
							Home
						</Button>
						<Typography
							variant="h4"
							aria-current="page"
							sx={{ color: '#FFF' }}
						>
							Jobs
						</Typography>
					</Breadcrumbs>
				</Box>
			</Box>
		</>
	);
};

export default Jobs;
