import * as React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Typography, IconButton,
    TableFooter, TablePagination, useTheme,
    Box,
    OutlinedInput,
    Stack
} from '@mui/material';
import {
    FirstPage as FirstPageIcon, KeyboardArrowLeft,
    KeyboardArrowRight, LastPage as LastPageIcon
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { jobData } from '../../../apiData/sliderData';

const TablePaginationActions = (props) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5) }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
};

const JobSearch = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedJobData = jobData.sort((a, b) => a.calories < b.calories ? -1 : 1);
    const paginatedJobData = rowsPerPage > 0
        ? sortedJobData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : sortedJobData;

    return (
        <>
            <Paper elevation={1} sx={{ m: 2 }}>
                <Stack direction={'row'} justifyContent={'space-between'} sx={{ p: 2 }}>
                    <Box>
                        <Typography variant='h5'>
                            Requisition Assigned
                        </Typography>
                        <Typography variant='body2'>
                            List of  Requisition Assigned
                        </Typography>
                    </Box>
                    <Box sx={{ backgroundColor: '#FDFDFD', display: 'flex', px: 1, alignItems: 'center', border: '1px solid #eee' }}>
                        <SearchIcon sx={{ fontSize: '20px', color: '#9e9e9e' }} />
                        <OutlinedInput size='small' type="search" placeholder="Search here..." />
                    </Box>
                </Stack>
                <TableContainer component={Paper}>
                    <Table aria-label="job table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#fff' }}>For Requisition</TableCell>
                                <TableCell sx={{ color: '#fff' }}>SPOC Details</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Designation</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Action</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Open On</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Location</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Experience</TableCell>
                                <TableCell sx={{ color: '#fff' }}>Submitted</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedJobData.map((job) => (
                                <TableRow key={job.job_id}>
                                    <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                                        {job.job_name} - {job.designation} <br />
                                        <Typography variant='body2'>Req ID: {job.job_id}</Typography>
                                    </TableCell>
                                    <TableCell>{job.spo_name} <br />+91-{job.spo_no}</TableCell>
                                    <TableCell>{job.job_name} - {job.designation}</TableCell>
                                    <TableCell>
                                        <IconButton variant='none' size='small' sx={{ height: '25px', background: '#03a9f4', mr: 1 }}><ViewInArOutlinedIcon sx={{ color: '#333', fontSize: '13px' }} /></IconButton>
                                        <IconButton variant='none' size='small' sx={{ height: '25px', background: '#4caf50' }}><FactCheckOutlinedIcon sx={{ color: '#333', fontSize: '13px' }} /></IconButton>
                                    </TableCell>
                                    <TableCell>{job.open_date}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.experience}</TableCell>
                                    <TableCell>0</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={8}
                                    count={jobData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        </>

    );
}

export default JobSearch;
